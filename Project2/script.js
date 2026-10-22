const productContainer = document.querySelector(".product-list");
const isProductDetailPage = document.querySelector(".product-detail");

if (productContainer) {
    displayProducts();
} else if (isProductDetailPage) {
    displayProductDetail();
}

function displayProducts() {
    productContainer.innerHTML = ""; 

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.classList.add(`product-card-${product.id}`);

        // Access image safely based on array structure
        const imageSrc = product.size?.[0]?.mainImage || product.image || "";

        productCard.innerHTML = `
            <div class="img-box">
                <img src="${imageSrc}" alt="${product.title}">
            </div>
            <div class="card-details">
                <h2 class="title">${product.title}</h2>
                ${product.available ? `<p class="available">${product.available}</p>` : ''}
                <span class="price">₱${product.price}</span>
            </div>
        `;

        productContainer.appendChild(productCard);

        productCard.addEventListener("click", () => {
            // Fixed key name capitalization
            sessionStorage.setItem("selectedProduct", JSON.stringify(product));
            window.location.href = "product-detail.html";
        });
    });
}

function displayProductDetail() {
    // Corrected session key matching displayProducts
    const productData = JSON.parse(sessionStorage.getItem("selectedProduct"));

    if (!productData) {
        console.error("No product selected.");
        return;
    }

    const titleEl = document.querySelector(".title");
    const priceEl = document.querySelector(".price");
    const mainImageContainer = document.querySelector(".main-img");
    const sizeContainer = document.querySelector(".size-options"); // Fixed class selector with 's'
    const addToCartBtn = document.querySelector("#add-cart-btn");
    const purchaseBtn = document.querySelector("#purchase-btn");

    // Populate basic info
    titleEl.textContent = productData.title;
    priceEl.textContent = `₱${productData.price}`;

    // Load main image
    const initialImg = productData.size?.[0]?.mainImage || "";
    mainImageContainer.innerHTML = `<img src="${initialImg}" alt="${productData.title}">`;

    // Render sizes if available
    let selectedSize = "";
    const sizesList = productData.size?.[0]?.sizes || ["S", "M", "L", "XL"];

    sizeContainer.innerHTML = ""; 
    sizesList.forEach((size, index) => {
        const btn = document.createElement("button");
        btn.textContent = size;
        
        // Select first size by default
        if (index === 0) {
            btn.classList.add("selected");
            selectedSize = size;
        }

        sizeContainer.appendChild(btn);

        btn.addEventListener("click", () => {
            document.querySelectorAll(".size-options button").forEach(el => el.classList.remove("selected"));
            btn.classList.add("selected");
            selectedSize = size;
        });
    });
    function displayProductDetail() {
    const productData = JSON.parse(sessionStorage.getItem("selectedProduct"));

    if (!productData) {
        console.error("No product selected.");
        return;
    }

    const titleEl = document.querySelector(".title");
    const priceEl = document.querySelector(".price");
    const mainImageContainer = document.querySelector(".main-img");
    const sizeSelectionSection = document.querySelector(".size-selection"); // Wrapper for the size section
    const sizeContainer = document.querySelector(".size-options");
    const addToCartBtn = document.querySelector("#add-cart-btn");
    const purchaseBtn = document.querySelector("#purchase-btn");

    // 1. Populate basic info
    titleEl.textContent = productData.title;
    priceEl.textContent = `₱${productData.price}`;

    // 2. Load main image
    const initialImg = productData.size?.[0]?.mainImage || "";
    mainImageContainer.innerHTML = `<img src="${initialImg}" alt="${productData.title}">`;

    // 3. Get available sizes array
    const sizesList = productData.size?.[0]?.sizes || [];
    let selectedSize = "";

    // 4. Hide sizing section if it's a book or has no sizes
    if (productData.title.toLowerCase().includes("book") || sizesList.length === 0) {
        sizeSelectionSection.style.display = "none";
    } else {
        sizeSelectionSection.style.display = "block"; // Ensure it shows for uniforms
        
        sizeContainer.innerHTML = ""; 
        sizesList.forEach((size, index) => {
            const btn = document.createElement("button");
            btn.textContent = size;
            
            if (index === 0) {
                btn.classList.add("selected");
                selectedSize = size;
            }

            sizeContainer.appendChild(btn);

            btn.addEventListener("click", () => {
                document.querySelectorAll(".size-options button").forEach(el => el.classList.remove("selected"));
                btn.classList.add("selected");
                selectedSize = size;
            });
        });
    }

    // Add to Cart handler
    addToCartBtn?.addEventListener("click", () => {
        const itemInfo = selectedSize ? `${productData.title} (${selectedSize})` : productData.title;
        alert(`Added ${itemInfo} to cart!`);
    });
}

    // Add to Cart handler
    addToCartBtn?.addEventListener("click", () => {
        alert(`Added ${productData.title} (${selectedSize}) to cart!`);
    });

    // Purchase handler
    purchaseBtn?.addEventListener("click", () => {
        alert(`Proceeding to checkout for ${productData.title} (${selectedSize})`);
    });
}

function addToCart(product, color, size) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    const exixtingItem = cart.find(item => item.id === product.id && item.color === color.name && item.size === size);

    if(existingItem) {
        exixtingItem.quantity +- 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: color.mainImage,
            color: color.name,
            size: size, 
            quantity: 1
        });
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
}