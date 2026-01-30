// ============================================
// FILE 6: javascript.js
// ============================================

// var riderProducts = [
//     {
//         id: 1,
//         name: 'Full Face Helmet',
//         description: 'Premium quality full face helmet with DOT certification. Ultimate protection for riders.',
//         price: 3999,
//         icon: '🪖',
//         category: 'helmet',
//         imageClass: 'helmet'
//     },
//     {
//         id: 2,
//         name: 'Riding Jacket',
//         description: 'Weather-resistant riding jacket with protective padding. Comfortable for long rides.',
//         price: 5999,
        
//         image: 'lucid-origin_Design_a_professional_industrial_safety_suit_for_factory_workers_made_from_flame-0.jpg',
//         category: 'jacket',
//         imageClass: 'jacket'
//     },
//     {
//         id: 3,
//         name: 'Riding Gloves',
//         description: 'Leather riding gloves with knuckle protection. Better grip and control.',
//         price: 1499,
//         icon: '🧤',
//         category: 'gloves',
//         imageClass: 'gloves'
//     },
//     {
//         id: 4,
//         name: 'Knee Guards',
//         description: 'Adjustable knee guards with hard shell protection. Comfortable and durable.',
//         price: 1999,
//         icon: '🦵',
//         category: 'guards',
//         imageClass: 'guards'
//     },
//     {
//         id: 5,
//         name: 'Half Face Helmet',
//         description: 'Lightweight half face helmet. Perfect for city riding.',
//         price: 2499,
//         icon: '⛑️',
//         category: 'helmet',
//         imageClass: 'helmet'
//     },
//     {
//         id: 6,
//         name: 'Rain Jacket',
//         description: 'Waterproof rain jacket for riders. Keep dry in any weather.',
//         price: 2999,
//         icon: '🌧️',
//         category: 'jacket',
//         imageClass: 'jacket'
//     },
//     {
//         id: 7,
//         name: 'Winter Gloves',
//         description: 'Thermal riding gloves for winter. Warm and protective.',
//         price: 1799,
//         icon: '🧤',
//         category: 'gloves',
//         imageClass: 'gloves'
//     },
//     {
//         id: 8,
//         name: 'Elbow Guards',
//         description: 'Protective elbow guards with adjustable straps.',
//         price: 1699,
//         icon: '💪',
//         category: 'guards',
//         imageClass: 'guards'
//     }
// ];

const workerProducts = [
    {
        id: 101,
        name: 'Safety Helmet',
        description: 'Industrial safety helmet with chin strap. ANSI certified for maximum protection.',
        price: 899,
        icon: '⛑️',
        category: 'helmet',
        imageClass: 'helmet'
    },
    {
        id: 102,
        name: 'Safety Boots',
        description: 'Steel toe safety boots. Slip-resistant and waterproof.',
        price: 2499,
        icon: '👢',
        category: 'boots',
        imageClass: 'boots'
    },
    {
        id: 103,
        name: 'Reflective Jacket',
        description: 'High visibility reflective jacket. Perfect for night work.',
        price: 1299,
        icon: '🦺',
        category: 'jacket',
        imageClass: 'jacket'
    },
    {
        id: 104,
        name: 'Safety Gloves',
        description: 'Cut-resistant safety gloves. Durable and comfortable.',
        price: 499,
        icon: '🧤',
        category: 'gloves',
        imageClass: 'gloves'
    },
    {
        id: 105,
        name: 'Hard Hat with Light',
        description: 'Safety hard hat with built-in LED light.',
        price: 1499,
        icon: '💡',
        category: 'helmet',
        imageClass: 'helmet'
    },
    {
        id: 106,
        name: 'Winter Safety Boots',
        description: 'Insulated safety boots for cold weather work.',
        price: 2999,
        icon: '🥾',
        category: 'boots',
        imageClass: 'boots'
    },
    {
        id: 107,
        name: 'Weather Jacket',
        description: 'All-weather safety jacket with reflective strips.',
        price: 1799,
        icon: '🧥',
        category: 'jacket',
        imageClass: 'jacket'
    },
    {
        id: 108,
        name: 'Heat Resistant Gloves',
        description: 'Heat resistant gloves for welding and hot work.',
        price: 799,
        icon: '🔥',
        category: 'gloves',
        imageClass: 'gloves'
    }
];

// Shopping Cart
let cart = [];

// Initialize Page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'rider.html') {
        renderProducts(riderProducts, 'riderProductsGrid');
    } else if (currentPage === 'workers.html') {
        renderProducts(workerProducts, 'workerProductsGrid');
    }
    
    updateCartCount();
    
    // Form handlers
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContact);
    }
}

// Render Products
function renderProducts(products, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    grid.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image ${product.imageClass}">
                <span style="position: relative; z-index: 1; font-size: 5em;">${product.icon}</span>
            </div>
            <div class="product-content">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">₹${product.price.toLocaleString()}</div>
                <div class="product-buttons">
                    <button class="btn-3d" onclick="open3DView(${product.id}, '${product.name}', '${product.icon}')">
                        3D View
                    </button>
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(productId) {
    const allProducts = [...riderProducts, ...workerProducts];
    const product = allProducts.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    updateCartDisplay();
    showNotification(`${product.name} added to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
    showNotification('Item removed from cart');
}

// Update Cart Count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
    });
}

// Update Cart Display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 40px;">Your cart is empty</p>';
        cartTotal.textContent = '₹0';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-icon">${item.icon}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price.toLocaleString()} × ${item.quantity}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `₹${total.toLocaleString()}`;
}

// Toggle Cart
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('active');
        updateCartDisplay();
    }
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Checkout Successful!\nTotal Amount: ₹${total.toLocaleString()}\n\nThank you for your order! We will deliver your items in 3-5 days.`);
    
    cart = [];
    updateCartCount();
    updateCartDisplay();
    toggleCart();
}

// 3D View Modal
function open3DView(productId, productName, productIcon) {
    const modal = document.getElementById('modal3D');
    const modalTitle = document.getElementById('modalTitle');
    const product3D = document.getElementById('product3D');
    
    if (modal && modalTitle && product3D) {
        modalTitle.textContent = `${productName} - 3D View`;
        product3D.textContent = productIcon;
        modal.classList.add('active');
    }
}

function close3DModal() {
    const modal = document.getElementById('modal3D');
    if (modal) {
        modal.classList.remove('active');
    }
}

function changeView(view) {
    const product3D = document.getElementById('product3D');
    if (!product3D) return;
    
    product3D.style.animation = 'none';
    
    setTimeout(() => {
        switch(view) {
            case 'front':
                product3D.style.transform = 'rotateY(0deg) rotateX(0deg)';
                break;
            case 'side':
                product3D.style.transform = 'rotateY(90deg) rotateX(0deg)';
                break;
            case 'top':
                product3D.style.transform = 'rotateY(0deg) rotateX(90deg)';
                break;
        }
        
        setTimeout(() => {
            product3D.style.animation = 'rotate3d 5s infinite linear';
        }, 1000);
    }, 10);
}

// Close modal on outside click
document.addEventListener('click', function(e) {
    const modal = document.getElementById('modal3D');
    if (modal && e.target === modal) {
        close3DModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        close3DModal();
    }
});

// Filter Products
function filterProducts(type) {
    const filterId = type === 'rider' ? 'riderCategoryFilter' : 'workerCategoryFilter';
    const gridId = type === 'rider' ? 'riderProductsGrid' : 'workerProductsGrid';
    const products = type === 'rider' ? riderProducts : workerProducts;
    
    const filter = document.getElementById(filterId);
    if (!filter) return;
    
    const category = filter.value;
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    const cards = grid.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Sort Products
function sortProducts(type) {
    const sortId = type === 'rider' ? 'riderSortFilter' : 'workerSortFilter';
    const gridId = type === 'rider' ? 'riderProductsGrid' : 'workerProductsGrid';
    let products = type === 'rider' ? [...riderProducts] : [...workerProducts];
    
    const sortFilter = document.getElementById(sortId);
    if (!sortFilter) return;
    
    const sortType = sortFilter.value;
    
    switch(sortType) {
        case 'price-low':
            products.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            products.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            products.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Keep original order
            break;
    }
    
    renderProducts(products, gridId);
}

// Handle Registration Form
function handleRegistration(e) {
    e.preventDefault();
    showNotification('Registration Successful! Welcome to SafeRide!');
    e.target.reset();
}

// Handle Contact Form
function handleContact(e) {
    e.preventDefault();
    showNotification('Thank you for contacting us! We will get back to you soon.');
    e.target.reset();
}

// Show Notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.4s ease;
        font-weight: 600;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.4s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 3000);
}

// Add a hover effect to ".jacket" elements that transitions blur smoothly to 0
const style = document.createElement('style');
style.textContent = `
    #jacket {
        transition: filter 0.5s ease, transform 0.5s cubic-bezier(.4,2,.6,1);
        filter: blur(10px);
        transform: scale(1);
    }

    #jacket:hover {
        filter: blur(0);
        transform: scale(1.07);
    }
`;
document.head.appendChild(style);

// INSERT_YOUR_CODE

// Make the #about section slide in from the bottom when scrolled up, while #hero remains fixed

// 1. Fix the #hero section at the top when the page is scrolled


// INSERT_YOUR_CODE

// INSERT_YOUR_CODE

