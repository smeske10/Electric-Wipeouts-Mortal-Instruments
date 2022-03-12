const cartBtn = document.querySelector('#test')

const test = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        console.log(id)
    }
}

cartBtn.addEventListener('click', test)