document.addEventListener('DOMContentLoaded', () => {
    
    const cartItemsTableBody = document.querySelector('#cart-items tbody');
    const cartTotalDiv = document.getElementById('cart-total');
    const completeButton = document.getElementById('complete-button');
    const cancelButton = document.getElementById('cancel-button');

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    let cartTotal = 0;

    cartItemsTableBody.innerHTML = '';

    function renderCartItem(item, index) {
        const itemPrice = item.price;
        const itemTotal = itemPrice * item.quantity;
        cartTotal += itemTotal;

        const itemRow = document.createElement('tr');
        itemRow.innerHTML = `
            <td>${item.title}</td>
            <td>${item.quantity}</td>
            <td>$${itemPrice.toFixed(2)}</td>
            <td><button class="delete-button" data-index="${index}"><img src="/assets/Eliminar.png" alt="eliminar" style="width: 35px; height: 35px;"></button></td>
        `;

        itemRow.querySelector('.delete-button').addEventListener('click', deleteClick);

        cartItemsTableBody.appendChild(itemRow);
    }

    function deleteClick(event) {
        const indexToRemove = event.target.getAttribute('data-index');


        cartItems.splice(indexToRemove, 1);

        updateCart();

        cartTotal = calculateCartTotal(cartItems);
        cartTotalDiv.textContent = `Total: $${cartTotal.toFixed(2)}`;
    }


    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        cartItemsTableBody.innerHTML = '';
        cartItems.forEach(renderCartItem);
    }


    cartItems.forEach(renderCartItem);


    cartTotalDiv.textContent = `Total: $${cartTotal.toFixed(2)}`;


    completeButton.addEventListener('click', completeClick);


    function completeClick() {
        const name = document.getElementById('name').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('phone').value;
        const provincia = document.getElementById('province').value;
        const city = document.getElementById('city').value;
        const address = document.getElementById('address').value;
        const zip = document.getElementById('zip').value;


        if (name === '' || address === '' || city === '' || zip === ''
        || provincia === '' || lastName === '' || email === '' || telefono === '') {
            alert('Complete la información antes de completar la compra.');
        } else {

            cartItems.length = 0;
            updateCart();
            

            resetInputFields();

            cartTotal = 0;
            cartTotalDiv.textContent = `Total: $${cartTotal.toFixed(2)}`;
        }
    }


    cancelButton.addEventListener('click', cancelClick);


    function cancelClick() {
        cartItems.length = 0;
        updateCart();

        resetInputFields();

        cartTotal = 0;
        cartTotalDiv.textContent = `Total: $${cartTotal.toFixed(2)}`;
    }

  
    function calculateCartTotal(items) {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    }

   
    function resetInputFields() {
        alert('Su compra fue generada con éxito! Recibirá un mail a la brevedad')
        document.getElementById('name').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('province').value  = '';
        document.getElementById('city').value = '';
        document.getElementById('address').value = '';
        document.getElementById('zip').value = '';
    }
});