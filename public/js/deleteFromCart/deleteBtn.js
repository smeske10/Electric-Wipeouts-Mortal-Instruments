const deleteBtn = document.querySelector('#deleteBtn')

const deleteFromCart = async (event) => {
    console.log('hello')
    if (event.target.hasAttribute('data-id')) {
        let prodId = event.target.getAttribute('data-id');
        console.log(prodId)
            const response = await fetch(`/api/cart/delete/${prodId}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                document.location.replace('/cart');
            } else {
                alert('Failed to remove from cart');
            }
    }
}

deleteBtn.addEventListener('click', deleteFromCart)
