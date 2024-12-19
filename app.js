const itemContainer = document.querySelector('.left')
const productDetailsContainer = document.querySelector('.right')
const cardItem = document.querySelector('.card-item')
const API = 'https://inventory-app-ten-gilt.vercel.app/api/v1/products'

async function fetchProducts() {
    try {
        const response = await fetch(API)
        const fetchedProducts = await response.json()
        console.log(fetchedProducts)
        displayFetchedProducts(fetchedProducts)

        const linkAttached = window.location.search
        const getID = new URLSearchParams(linkAttached)
        const productId = getID.get('id')

        const product = fetchedProducts.data.find((item)=>item.id === productId)
        console.log(product, productId)
        displaySingleProduct(product)
        
    } catch(error) {
        console.log('Something Went Wrong...!!!', error)
    }
}

fetchProducts()

function displayFetchedProducts(fetchedData) {
    // console.log(fetchedData.data)
    // itemContainer.innerHTML = ''
    fetchedData.data.forEach((product)=>{
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
    console.log(product)
    productDetailsContainer.innerHTML = ''
    const productDetailTemplate = `
        <div class="product-detail-container">
            <img src="${product.productThumbnail}" alt="">
        </div>
        <div class="main-text">
            <div class="time">
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
                <p>OTHER PRODUCT IMAGES</p>
                <p>${product.productDetails}</p>
            </div>
            <div class="recipe-grid-container">
                <div class="image-container">
                            <img src="${product.productImages[0]}" alt="">
                </div>
                <div class="image-container">
                    <img src="${product.productImages[1]}" alt="">
                </div>
                <div class="image-container">
                    <img src="${product.productImages[2]}" alt="">
                </div>
            </div>
        </div>
    `
    productDetailsContainer.insertAdjacentHTML('beforeend', productDetailTemplate)
}



