const cartBtn = document.querySelector('#test')

const test = async (event) => {

    if (event.target.hasAttribute('data-id')) {
        let prod_id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/cart`, {
            method: 'POST',
            body: JSON.stringify({ prod_id }),
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
            },
        });
        console.log("Response: "+response)
        if (response.ok) {
            document.location.replace('/cart');
        } else {
            alert('Failed to add to cart');
        }
    }
}

cartBtn.addEventListener('click', test)