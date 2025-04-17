// Global Variables
let price = document.querySelector(".price");
let priceData = Array.from(document.querySelectorAll(".price input"));
let headInput = Array.from(document.querySelectorAll(".form input"));
let priceInput = document.getElementById("price");
let title = document.getElementById("title");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let totalPrice = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let createBtn = document.getElementById("create");
let updateBtn = document.getElementById("update-item");
let dataTable = document.querySelector("table tbody");
let deleteAllBtn = document.getElementById("delete-all");
let SearchInput = document.getElementById("search");

let productSet = [];


// Get Total
function getTotal() {
    if(priceInput.value !== '' && priceInput.value !== null) {
        let result = (+priceInput.value + +taxes.value + +ads.value) - discount.value;
        totalPrice.innerText = result;
        totalPrice.style.backgroundColor = "#388E3C";
    } else {
        totalPrice.innerText = '';
        totalPrice.style.backgroundColor = "#c90606";
    }
}


// Get Data from local Storage
function readData() {
    if(localStorage.getItem("product") !== null) {
        productSet = JSON.parse(localStorage.getItem("product"));
        displayData();
        showDeleteBtn();
    }
}
readData()


// Empty Input Fields
function emptyInput() {
    title.value = '';
    priceInput.value = '';
    taxes.value = '';
    ads.value = ''; 
    discount.value = '';
    count.value = '';
    category.value = '';
}


// Create Product
function createProduct() {
    if(title.value !== '' && price.value !== '' &&taxes.value !== '' && ads.value !== '' && 
    discount.value !== '' && count.value !== '' && category.value !== '') {
        let products = {
            title: title.value.toLowerCase(),
            price: priceInput.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerText,
            category: category.value.toLowerCase()
        }
        for(let i =0; i< count.value ; i++) {
            productSet.push(products);
        }
        localStorage.setItem("product", JSON.stringify(productSet));
    } else {
        e.preventDefault();
    }
    displayData();
    showDeleteBtn();
    emptyInput();
}




// Read Data
function displayData() {
    let table = '';
    for(let i=0; i< productSet.length; i++) {
        table +=  `
            <tr>
                <td>${i+1}</td>
                <td>${productSet[i].title}</td>
                <td>${productSet[i].price}</td>
                <td>${productSet[i].taxes}</td>
                <td>${productSet[i].ads}</td>
                <td>${productSet[i].discount}</td>
                <td>${productSet[i].total}</td>
                <td>${productSet[i].category}</td>
                <td><button onclick="getUpdateIndex(${i})" id="update">update</button></td>
                <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
            </tr>
        `;
    }
    dataTable.innerHTML = table;
}


// Show Delete All Button 
function showDeleteBtn() {
    if(productSet.length > 0) {
        deleteAllBtn.style.display = "block";
        deleteAllBtn.innerHTML = `Delete All (${productSet.length})`;
    } else {
        deleteAllBtn.style.display = "none";
    }
}
deleteAllBtn.onclick = function() {
    localStorage.clear();
    dataTable.innerHTML = '';
}


// Get Product index
function deleteItem(index) {
    productSet.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(productSet));
    displayData(productSet);
    deleteAllBtn.innerHTML = `Delete All (${productSet.length})`;
}


// Update Product
let updatedIndex;
function getUpdateIndex(index) {
    updatedIndex = index;
    
    let prod = productSet[index];
    title.value = prod.title;
    priceInput.value = prod.price;
    taxes.value = prod.taxes;
    ads.value = prod.ads; 
    discount.value = prod.discount;
    category.value = prod.category;

    updateBtn.style.display = "block";
    createBtn.style.display = "none";
}


// Update Product 
function updateProduct() {
    let prod = productSet[updatedIndex];
    prod.title = title.value;
    prod.price = priceInput.value;
    prod.taxes = taxes.value;
    prod.ads = ads.value; 
    prod.discount = discount.value;
    prod.category = category.value;

    localStorage.setItem("product", JSON.stringify(productSet));
    updateBtn.style.display = "none";
    createBtn.style.display = "block";
    displayData();
    emptyInput();
}


// Search 
let type = 'title';
function search(searchType) {
    type = searchType.toLowerCase();
    SearchInput.setAttribute("placeholder", `Search By ${searchType}`);
}


// Search Based On Type
function searchBasedOnType(value) {
    let table = '';
    for(let i=0; i< productSet.length; i++) {
        if(productSet[i][`${type}`].includes(value.toLowerCase())) {
            table +=  `
            <tr>
                <td>${i+1}</td>
                <td>${productSet[i].title}</td>
                <td>${productSet[i].price}</td>
                <td>${productSet[i].taxes}</td>
                <td>${productSet[i].ads}</td>
                <td>${productSet[i].discount}</td>
                <td>${productSet[i].total}</td>
                <td>${productSet[i].category}</td>
                <td><button onclick="getUpdateIndex(${i})" id="update">update</button></td>
                <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
            </tr>
        `;
        }
    }
    dataTable.innerHTML = table;
}
