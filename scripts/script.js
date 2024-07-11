// =======================  Add Product Item  =======================
let productsContainer = document.querySelector('#products');



function showAllProducts() {
    for (let i = 0; i < product.length; i++) {
        productsContainer.innerHTML += `
        <div class="product-item">
            <div class="product-image"><img src="` + product[i].imgSrc + `" alt="earring & necklace"></div>
            <div class="product-title">` + product[i].name + `</div>
            <div class="product-instock">تعداد موجود: <span>` + product[i].inStock + `</span></div>
            <div class="product-data">
                <div class="product-price">` + commafy(product[i].price) + `</div>
                <div class="add-to-cart" onclick="addToCart(` + product[i].id + `)"><i class="fas fa-shopping-cart"></i></div>
            </div>
        </div>`;
    }
};

showAllProducts();

// =======================  Cart Header Animation  =======================

let cartHeader = document.querySelector('.cart-header');
let cartSection = document.querySelector('.cart');

let n = 0;

cartHeader.addEventListener('click', function () {

    if (n == 0) {
        cartSection.style.cssText = "animation-name: cart-PopDown;";
        n++;
    } else {
        cartSection.style.cssText = "animation-name: cart-PopUp;";
        n = 0;
    }
});

// =======================  Add To Cart  =======================

let cart = [];

function addToCart(id) {

    let itemId = cart.some(function (item) {
        return item.id == id;
    });
    if (itemId) {
        changeNumberOfUnits('plus', id);
    } else {


        let item = product.find(function (p) {
            return p.id == id;
        });

        item.numberOfUnits = 1;
        cart.push(item);
    }
    renderCartItem();
    renderTotal();
}

// Crtl + Shift + P = Beauty File


// =======================  Add CartItem To Cart  =======================

let cartItemContainer = document.querySelector(".cart-items");

function renderCartItem() {

    cartItemContainer.innerHTML = '';
    for (let i = 0; i < cart.length; i++) {
        cartItemContainer.innerHTML += `<li class="cart-item">
        <div class="p-name" onclick="deleteFromCart(` + cart[i].id + `)">` + cart[i].name + `</div>
        <div class="p-price">` + commafy(cart[i].price) + `</div>
        <div class="p-unit">
        <span class="plus" onclick="changeNumberOfUnits('plus', ` + cart[i].id + `)">+</span>
        <span class="unit">` + cart[i].numberOfUnits + `</span>
        <span class="minus" onclick="changeNumberOfUnits('minus', ` + cart[i].id + `)">-</span>
        </div>
        </li>`;
    }
};


// =======================  Change Number Of Units  =======================

function changeNumberOfUnits(action, id) {

    cart = cart.map(function (item) {
        let oldNumberOfUnits = item.numberOfUnits;
        
        if (item.id == id) {
            
            if (action == 'plus' && oldNumberOfUnits < item.inStock) {
                oldNumberOfUnits++;
            } else if (action == 'minus' && oldNumberOfUnits > 1) {
                oldNumberOfUnits--;
            }
        }
        
        item.numberOfUnits = oldNumberOfUnits;
        return item;
    });

    renderCartItem();
    renderTotal();
};


// =======================  Total price + Item in Cart render  =======================

let totalPriceEl = document.querySelector('.total-price');
let totalItemsEl = document.querySelector('.total-items');

function renderTotal() {
    let totalPrice = 0;
    let totalItems = 0;

    // Items
    
    for(let i = 0; i < cart.length; i++) {
        // Items
        totalItems += cart[i].numberOfUnits;
        // Price
        totalPrice += cart[i].price * cart[i].numberOfUnits;
    }
    
    // Items
    totalItemsEl.innerHTML = totalItems;
    // Price
    totalPriceEl.innerHTML = commafy(totalPrice);
}

// =======================  Delete From Cart  =======================

function deleteFromCart(id) {
    cart = cart.filter(function(item){
        return item.id != id;
    });
    
    renderCartItem();
    renderTotal();
}

// =======================  JD divide number by 3 function  =======================

function commafy(num) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}