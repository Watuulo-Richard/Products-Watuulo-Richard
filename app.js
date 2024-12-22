const itemContainer = document.querySelector('.left')
const productDetailsContainer = document.querySelector('.right')
const cardItem = document.querySelector('.card-item')
const API = 'https://inventory-app-ten-gilt.vercel.app/api/v1/products'

let fetchedProducts = [];
console.log(fetchedProducts)
async function fetchProducts() {
    try {
        const response = await fetch(API)
        fetchedProducts = await response.json()
        console.log('Fetched Products:', fetchedProducts);
        displayFetchedProducts(fetchedProducts.data)
        const linkAttached = window.location.search
        const getID = new URLSearchParams(linkAttached)
        const productId = getID.get('id')

        const product = fetchedProducts.data.find((item)=>item.id === productId)
        // console.log(product, productId)

        displaySingleProduct(product)
        return { data: [] }; 
    } catch(error) {
        console.log('Something Went Wrong...!!!', error)
    }
}

fetchProducts()

function displayFetchedProducts() {
    itemContainer.innerHTML = ''
    fetchedProducts.data.forEach((product)=>{
        const div = document.createElement('div')
        div.innerHTML = `
            <a href="index.html?id=${product.id}" class="card-item">
                <div class="card-image-container">
                    <img src="${product.productThumbnail}" alt="${product.name}">
                </div>
                <div class="card-text">
                    <h3>${product.productPrice}</h3>
                    <p>${product.name}</p>
                    <p>${product.stockQty}</p>
                </div>
            </a>
        `
        itemContainer.appendChild(div)
    })
}

function displaySingleProduct(product){
    // console.log(product)
    productDetailsContainer.innerHTML = ''
    const productDetailTemplate = `
        <div class="product-detail-container">
            <img src="${product.productThumbnail}" alt="">
        </div>
        <div class="main-text">
            <div class="time">
                <i class="fa-regular fa-clock"></i>
                <p>75 MINUTES</p>
            </div>
            <div class="servings">
                <i class="fa-solid fa-users-line"></i>
                <p>5 SERVINGS</p>
                <div class="btn-conts">
                    <div class="btn-ico-circle">
                        <i class="fa-solid fa-minus"></i>
                    </div>
                    <div class="btn-ico-circle">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                </div>
            </div>
            <div class="bookmark-container">
                <i class="fa-regular fa-bookmark"></i>
            </div>
        </div>
        <div class="recipe-ingredients">
            <div class="recipe-heading">
                <p class="overview">Product Overview</p>
                <p class="product-name">${product.name}</p>
            </div>
            <div class="recipe-grid-container">
                <div class="image-container">
                        <img src="${product.productImages[0] || "./Images/Image-Placeholder.png"}"  alt="">
                </div>
                <div class="image-container">
                    <img src="${product.productImages[1] || "./Images/Image-Placeholder.png"}" alt="">
                </div>
                <div class="image-container">
                    <img src="${product.productImages[2] || "./Images/Image-Placeholder.png"}" alt="">
                </div>
            </div>
            <div class="recipe-description">
                <h3>Description</h3>
                <p>${product.productDetails}</p>
            </div>
        </div>
    `
    productDetailsContainer.insertAdjacentHTML('beforeend', productDetailTemplate)
}

// Search Functionality
const searchElement = document.getElementById('search-input')

searchElement.addEventListener('input', (event)=>{
    const searchTerm = event.target.value.toLowerCase()
    const filteredProducts = fetchedProducts.data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm) || // Search by name
        item.productDetails.toLowerCase().includes(searchTerm) // Search by details
    );
    // itemContainer.innerHTML = '';
    displayFetchedProducts(filteredProducts)
    console.log(fetchedProducts)
})


const formContainer = document.querySelector('.form-section')
const addButtonElement = document.querySelector('.add-container')

addButtonElement.addEventListener('click', function(e){
    e.preventDefault()
    const toogle = formContainer.classList.toggle('show-form')
    console.log(toogle)
})

const formElement = document.getElementById('upload-form')
formElement.addEventListener('submit', async (e)=>{
    e.preventDefault()
    // console.log('working')
    const nameInput = document.getElementById('nameInput').value
    const priceInput = document.getElementById('priceInput').value
    const stockInput = document.getElementById('stockInput').value
    const imageInput = document.getElementById('imageInput').value
    
    const id = new Date().getTime()
    const newProduct = {
        id, 
        name:nameInput, 
        productPrice:priceInput, 
        stockQty:stockInput, 
        productThumbnail:imageInput
    }

    console.log(newProduct , "this is the products")
    fetchedProducts.data.unshift(newProduct)
    displayFetchedProducts(fetchedProducts)
})
