'use strict';
let allProducts = [];
let price;
let total ;
let tableHeading = ['Item Name', 'Category', 'Quantity', 'Price', 'Delete'];
function Product(itemName, category, quantity){
    this.itemName = itemName;
    this.category = category;
    this.quantity = quantity;
    this.price = generateRandomPrice(quantity);
    allProducts.push(this);
}
let form = document.getElementById('formContainer');
form.addEventListener('submit', submitHandler);

function submitHandler(event){
    event.preventDefault();
    let name = event.target.itemName.value;
    let category = event.target.category.value;
    let quantity = event.target.quantity.value;

    let product = new Product(name, category, quantity);
    product.render();
    localStorage.setItem('PC Products', JSON.stringify(allProducts));




}
let tableContainer = document.getElementById('tableContainer');
let table = document.getElementById('table');
tableContainer.appendChild(table);

function header(){
    let trHeader = document.createElement('tr');
    table.appendChild(trHeader);
    for(let i = 0; i<tableHeading.length; i++){
        let th = document.createElement('th');
        trHeader.appendChild(th);
        th.textContent = tableHeading[i];
    }
}
header();
let trBody;
Product.prototype.render = function(){
    trBody = document.createElement('tr');
    table.appendChild(trBody);

    let tdItem = document.createElement('td');
    trBody.appendChild(tdItem);
    tdItem.textContent = this.itemName;

    let tdCategory = document.createElement('td');
    trBody.appendChild(tdCategory);
    tdCategory.textContent = this.category;

    let tdQuantity = document.createElement('td');
    trBody.appendChild(tdQuantity);
    tdQuantity.textContent = this.quantity;

    let tdPrice= document.createElement('td');
    trBody.appendChild(tdPrice);
    tdPrice.textContent = this.price;

    let tdDelete = document.createElement('button');
    trBody.appendChild(tdDelete);
    tdDelete.textContent = 'Delete';

    tdDelete.addEventListener('click', deletingRow);


    let pTotal = document.createElement('p');
    tableContainer.appendChild(pTotal);
    pTotal.textContent = `Total is ${totalPrice()}`;

}

function deletingRow(){
    // console.log(allProducts);
    for(let i = 0; i<allProducts.length; i++){
        table.deleteRow( allProducts.splice(i, 0));
        // console.log(allProducts.splice(i, 0));

    }
}
function gettingData(){
    if(localStorage.getItem('PC Products')){
        allProducts = JSON.parse(localStorage.getItem('PC Products'));
        renderAgain();

    }
}
gettingData();

function renderAgain(){
    for(let i = 0; i<allProducts.length; i++){
         trBody = document.createElement('tr');
        table.appendChild(trBody);
    
        let tdItem = document.createElement('td');
        trBody.appendChild(tdItem);
        tdItem.textContent = allProducts[i].itemName;
    
        let tdCategory = document.createElement('td');
        trBody.appendChild(tdCategory);
        tdCategory.textContent = allProducts[i].category;
    
        let tdQuantity = document.createElement('td');
        trBody.appendChild(tdQuantity);
        tdQuantity.textContent = allProducts[i].quantity;

        let tdPrice = document.createElement('td');
        trBody.appendChild(tdPrice);
        tdPrice.textContent = allProducts[i].price;
    }
    let pTotal = document.createElement('p');
    tableContainer.appendChild(pTotal);
    pTotal.textContent = `Total is ${totalPrice()}`;

}

function totalPrice(){
    total = 0;
    for(let i = 0; i<allProducts.length; i++){
        total = total+allProducts[i].price;
    }
    return total;
}
totalPrice();
function generateRandomPrice(quantity){
    return (Math.floor(Math.random() * 500) + 20)*quantity;
}