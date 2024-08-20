//fieldsets
const sbaseFieldset = document.getElementById("sbasesfieldset")
const mbasefieldset = document.getElementById("mbasesfieldset")
const Xfieldset = document.getElementById("extrafieldset")

//buttons
const btnReset = document.getElementById("reset")
const btnOrderf = document.getElementById("orderf")
const btnAddf = document.getElementById("addf")
const btnOrder = document.getElementById("order")

//options
const optSize = document.getElementsByName("size")
const optType = document.getElementsByName("type")
const optSbases = document.getElementsByName("sbases")
const optMbases = document.getElementsByName("mbases")
const optIngredients = document.getElementsByName("ingredients")
const optX = document.getElementsByName("extra")
const smoothieOption = document.getElementById("smoothie")
const milkOption = document.getElementById("milk")

//outputs
const txtTotal = document.getElementById("ordertotal")
const txtOutput = document.getElementById("output")
const txtPrice = document.getElementById("price")

//options event listners
smoothieOption.addEventListener("change", showSmoothieOptions);
milkOption.addEventListener("change", showMilkshakeOptions);
optX.forEach(item => item.addEventListener("change", checkExtra));
optSize.forEach(item => item.addEventListener("change", checkSize));
optType.forEach(input => input.addEventListener('change', checkType));
optSbases.forEach(input => input.addEventListener('change', checkSbases));
optMbases.forEach(input => input.addEventListener('change', checkMbases));
optIngredients.forEach(input => input.addEventListener('click', checkIngre));

//button eventlistners
btnOrder.addEventListener("click", OrderDetails);
btnReset.addEventListener("click", resetOrder);
btnAddf.addEventListener("click", add);
btnOrderf.addEventListener("click", orderfav)
//values
let size = "Medium";
let type = "";
let ingredients = [];
let smbases = "Orange Juice";
let milkbases = "Skimmed Milk";
let extra = [];
let sizeprice = 3.20;
let extraprice = 0.00;
txtPrice.innerText = `£${(sizeprice + extraprice).toFixed(2)}`;
let totalPrice = 0.00;

initialise();

//checking the size
function checkSize() {
    if (this.value == "small") {
        sizeprice = 2.70;
        size = "Small";
    } else if (this.value == "large") {
        sizeprice = 3.70;
        size = "Large";
    } else if (this.value == "xlarge") {
        sizeprice = 4.50;
        size = "Extra Large";
    } else {
        sizeprice = 3.20;
        size = "Medium";
    }
    txtPrice.innerText = `£${(sizeprice + extraprice).toFixed(2)}`;//outputting the price
}


function checkExtra() {
    if (this.checked) {
        extraprice += 0.85;
    } else {
        extraprice -= 0.85;
    }
    txtPrice.innerText = `£${(sizeprice + extraprice).toFixed(2)}`;
}




function checkType() {
    if (this.value == "milk") {
        type = "Milkshake";
        
    } else  {
        type = "Smoothie";
        
    } 

    console.log(ingredients.length);
    console.log(type);
    if ((ingredients.length == 0) || (type == "")) {
        btnOrder.disabled = true;
        btnAddf.disabled = true;
    } else { 
        btnOrder.disabled = false;
        btnAddf.disabled = false;

    }
    
    
}
function checkIngre(){
    console.log("check ingr")
    ingredients = [];
    optIngredients.forEach(item => {
        if (item.checked) {
            ingredients.push(item.value);
        }
    });

    if ((ingredients.length == 0) || (type == "")) {

        btnOrder.disabled = true;
        btnAddf.disabled = true;
        
    } else { 
        //else 
        btnOrder.disabled = false;
        btnAddf.disabled = false;
        
    }
}



function initialise() {
    //defaults 
    Xfieldset.classList.add("hidden");
    mbasefieldset.classList.add("hidden");
    sbaseFieldset.classList.add("hidden");
    btnOrder.disabled = true;
    btnAddf.disabled = true;
    btnOrderf.disabled = true;
}



function showSmoothieOptions() {
    Xfieldset.classList.add("hidden");
    mbasefieldset.classList.add("hidden");
    sbaseFieldset.classList.remove("hidden");
}



function showMilkshakeOptions() {
    Xfieldset.classList.remove("hidden");
    mbasefieldset.classList.remove("hidden");
    sbaseFieldset.classList.add("hidden");
}


function checkSbases() {
    if (this.value == "orange") {

        smbases = "Orange Juice";
    } else {

        smbases = "Apple Juice";
    }
}


function checkMbases() {
    if (this.value == "whole") {

        milkbases = "Whole Milk";
    } else if (this.value == "semi") {

        milkbases = "Semi-skimmed Milk";
    }

    else if (this.value == "skimmed") {
        milkbases = "Skimmed Milk";
    }
    else if (this.value == "coconut") {
        milkbases = "Coconut Milk";
    } else {

        
        milkbases = "Oat Milk";
    }
}


function OrderDetails() {


    extra = [];
    optX.forEach(item => {
        if (item.checked) {
            extra.push(item.value);
        }
    });


    let currentOrderPrice = sizeprice + extraprice;
    totalPrice += currentOrderPrice;
    txtTotal.innerText = `£${totalPrice.toFixed(2)}`;



    //order summary
    let orderSummary = `Type: ${type}\nSize: ${size}\nIngredients: ${ingredients}\n`;
    if (type === "Smoothie") {
        orderSummary += `Base: ${smbases}\n`;
    } else {
        orderSummary += `Base: ${milkbases}\nExtra: ${extra}\n`;
    }
    txtOutput.innerText += orderSummary + `Price: ${txtPrice.innerText}\n\n`;


}
function add(){
    console.log("Add Fav")
}

function orderfav(){
    console.log("Order Fav")
}

function resetOrder() {
    if (txtOutput.innerText ===""){
        alert("Please Add items to your order !!!")
    }else{
        alert(`Your order\n\n` + txtOutput.innerText + `Total Price: ${txtTotal.innerText }`)
        location.reload();  
    }
}
