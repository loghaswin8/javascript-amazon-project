let productsHtml = '';

products.forEach((product) => { //generating the HTML for list products and its datas.
    productsHtml += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
                <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary 
            js-add-cart-button" data-product-id="${product.id}">
                Add to Cart
            </button>
            </div>
    `;
});

//Using DOM innerHtml to input the generated html in js-product-grid.
document.querySelector('.js-product-grid').innerHTML = productsHtml;

//Here we are making the Add to Cart button interactive,
//Here product ID is used to find out the clicked product,
//If we click the button the specified product should be added to the cart,
//If same product is added  in the cart the Quantity should be increases,
//Created a cart js file to store the added product as a array in object, 
//by loop through the items using forEach loop
document.querySelectorAll('.js-add-cart-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        let matchingItem;
        cart.forEach((item) => {
            //checking the productID is matching with items productID,
            //If both ID are matched store the item to the matchingID.
            if (productId === item.productId) { 
                matchingItem = item;
            }
        });

        if (matchingItem) {
            //increasing the matchingItem quantity
            matchingItem.quantity += 1;
        } else {
            //ow push the products to the cart
            cart.push({
                productId: productId,
                quantity: 1
            });
        }
        
        let cartQuantity = 0;

        cart.forEach((item) => {
            cartQuantity += item.quantity;
        });

        document.querySelector('.js-cart-quantity')
          .innerHTML = cartQuantity;

        console.log(cart);
    });
  });