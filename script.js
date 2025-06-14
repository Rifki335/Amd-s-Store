document.addEventListener('DOMContentLoaded', function() {
    // Data produk
    const products = [
        {
            id: 1,
            name: 'Celana Jeans Slim Fit',
            price: 250000,
            image: 'img/Celana Jeans Slim Fit.webp'
        },
        {
            id: 2,
            name: 'Celana Chino',
            price: 200000,
            image: 'img/Celana Chino Warna Navy.jpeg'
        },
        {
            id: 3,
            name: 'Celana Kargo Hitam',
            price: 180000,
            image: 'img/Celana Kargo Hitam.jpeg'
        },
        {
            id: 4,
            name: 'Celana Training',
            price: 150000,
            image: 'img/Celana Training Olahraga.jpeg'
        },
        {
            id: 5,
            name: 'Celana Formal Hitam',
            price: 300000,
            image: 'img/Celana Formal Hitam.jpeg'
        },
        {
            id: 6,
            name: 'Celana Pendek Denim',
            price: 120000,
            image: 'img/Celana Pendek Denim.jpeg'
        }
    ];

    // Variabel keranjang
    let cart = [];
    const cartCountElement = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total');
    const productGrid = document.querySelector('.product-grid');
    const cartItemsElement = document.querySelector('.cart-items');
    const cartSection = document.getElementById('cart');
    const checkoutFormSection = document.getElementById('checkout-form');
    const thankYouSection = document.getElementById('thank-you');
    const productsSection = document.getElementById('products');

    // Render produk
    function renderProducts() {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">Rp ${product.price.toLocaleString()}</p>
                    <button class="add-to-cart" data-id="${product.id}">Tambah ke Keranjang</button>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    }

    // Render keranjang
    function renderCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;
        
        if (cart.length === 0) {
            cartItemsElement.innerHTML = '<p>Keranjang belanja kosong</p>';
            cartTotalElement.textContent = '0';
            return;
        }
        
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            total += product.price * item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                    <div>
                        <h4>${product.name}</h4>
                        <p>Rp ${product.price.toLocaleString()}</p>
                    </div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" data-id="${product.id}" data-action="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" data-id="${product.id}" data-action="increase">+</button>
                </div>
                <button class="remove-item" data-id="${product.id}">Hapus</button>
            `;
            cartItemsElement.appendChild(cartItem);
        });
        
        cartTotalElement.textContent = total.toLocaleString();
        cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Tambah produk ke keranjang
    function addToCart(productId) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }
        
        renderCart();
    }

    // Update kuantitas produk di keranjang
    function updateQuantity(productId, action) {
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            if (action === 'increase') {
                item.quantity += 1;
            } else if (action === 'decrease' && item.quantity > 1) {
                item.quantity -= 1;
            }
        }
        
        renderCart();
    }

    // Hapus produk dari keranjang
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        renderCart();
    }

    // Tampilkan section yang dipilih
    function showSection(sectionId) {
        document.querySelectorAll('main > section').forEach(section => {
            section.classList.add('hidden');
        });
        
        document.getElementById(sectionId).classList.remove('hidden');
    }

    // Event listeners
    document.addEventListener('click', function(e) {
        // Tambah ke keranjang
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
        
        // Update kuantitas
        if (e.target.classList.contains('quantity-btn')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const action = e.target.getAttribute('data-action');
            updateQuantity(productId, action);
        }
        
        // Hapus item
        if (e.target.classList.contains('remove-item')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        }
        
        // Navigasi
        if (e.target.matches('nav a')) {
            e.preventDefault();
            const sectionId = e.target.getAttribute('href').substring(1);
            showSection(sectionId);
        }
    });

    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', function() {
        showSection('checkout-form');
    });

    // Form checkout
    document.getElementById('checkoutForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulasi proses checkout
        setTimeout(() => {
            showSection('thank-you');
            cart = [];
            renderCart();
        }, 1000);
    });

    // Kembali berbelanja
    document.getElementById('back-to-shop').addEventListener('click', function() {
        showSection('products');
    });

    // Inisialisasi
    renderProducts();
    renderCart();
    showSection('products');
});