const cartBtn = document.querySelector('#addBtn')

const addToCart = async (event) => {

    if (event.target.hasAttribute('data-id')) {
        let prod_id = event.target.getAttribute('data-id');
        console.log('In cartBtn')
        console.log(prod_id)
        const response = await fetch(`/api/cart`, {
            method: 'POST',
            body: JSON.stringify({ prod_id }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/cart');
        } else {
            alert('Failed to add to cart');
        }
    }
};
if(cartBtn){
    cartBtn.addEventListener('click', addToCart)
}