const products = [
    {
        id: 1,
        name: {
            ckb: "ئاسپیرین 100mg",
            ar: "أسبرين 100mg",
            en: "Aspirin 100mg"
        },
        category: "medicines",
        brand: "pfizer",
        price: 12.99,
        oldPrice: 15.99,
        badge: "20% تخفیف",
        icon: "fa-pills"
    },
    {
        id: 2,
        name: {
            ckb: "ئامێری پەمێی خوێن",
            ar: "جهاز قياس الضغط",
            en: "Blood Pressure Monitor"
        },
        category: "medical",
        brand: "abbott",
        price: 89.99,
        oldPrice: 119.99,
        badge: "جێگیر",
        icon: "fa-heart-pulse"
    },
    {
        id: 3,
        name: {
            ckb: "ماسکی پزیشکی",
            ar: "كمامة طبية",
            en: "Medical Mask"
        },
        category: "supplies",
        brand: "merck",
        price: 8.99,
        oldPrice: null,
        badge: null,
        icon: "fa-mask-face"
    },
    {
        id: 4,
        name: {
            ckb: "ڤیتامین سی 1000mg",
            ar: "فيتامين سي 1000mg",
            en: "Vitamin C 1000mg"
        },
        category: "vitamins",
        brand: "novartis",
        price: 18.99,
        oldPrice: 24.99,
        badge: "باشترین فرۆش",
        icon: "fa-capsules"
    },
    {
        id: 5,
        name: {
            ckb: "ئیبۆپروفین 400mg",
            ar: "إيبوبروفين 400mg",
            en: "Ibuprofen 400mg"
        },
        category: "medicines",
        brand: "roche",
        price: 14.99,
        oldPrice: null,
        badge: null,
        icon: "fa-pills"
    },
    {
        id: 6,
        name: {
            ckb: "پەیوەستنی خوێن",
            ar: "ضمادات طبية",
            en: "Medical Bandages"
        },
        category: "supplies",
        brand: "abbott",
        price: 6.99,
        oldPrice: 8.99,
        badge: null,
        icon: "fa-bandage"
    },
    {
        id: 7,
        name: {
            ckb: "ئامێری ئۆکسجین",
            ar: "جهاز أكسجين",
            en: "Oxygen Concentrator"
        },
        category: "medical",
        brand: "pfizer",
        price: 450.00,
        oldPrice: 520.00,
        badge: "داشکاندن",
        icon: "fa-lungs"
    },
    {
        id: 8,
        name: {
            ckb: "ڤیتامین دی 5000IU",
            ar: "فيتامين د 5000IU",
            en: "Vitamin D 5000IU"
        },
        category: "vitamins",
        brand: "merck",
        price: 22.99,
        oldPrice: null,
        badge: "نوێ",
        icon: "fa-capsules"
    },
    {
        id: 9,
        name: {
            ckb: "ئەنتبیۆتیک ئەموکسیسیلین",
            ar: "أموكسيسيلين",
            en: "Amoxicillin Antibiotic"
        },
        category: "medicines",
        brand: "novartis",
        price: 19.99,
        oldPrice: 25.99,
        badge: null,
        icon: "fa-pills"
    },
    {
        id: 10,
        name: {
            ckb: "سیرومی فیزیۆلۆجی",
            ar: "محلول ملحي",
            en: "Normal Saline"
        },
        category: "supplies",
        brand: "roche",
        price: 4.99,
        oldPrice: null,
        badge: null,
        icon: "fa-droplet"
    },
    {
        id: 11,
        name: {
            ckb: "پۆلەس مێتر",
            ar: "مقياس الحرارة",
            en: "Thermometer"
        },
        category: "medical",
        brand: "abbott",
        price: 15.99,
        oldPrice: 19.99,
        badge: null,
        icon: "fa-temperature-high"
    },
    {
        id: 12,
        name: {
            ckb: "ئۆمێگا 3",
            ar: "أوميغا 3",
            en: "Omega 3"
        },
        category: "vitamins",
        brand: "pfizer",
        price: 28.99,
        oldPrice: 35.99,
        badge: "باشترین جۆر",
        icon: "fa-capsules"
    }
];

let currentLang = 'ckb';
let cart = [];
let filteredProducts = [...products];

document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
    initMobileMenu();
    initFilters();
    initCart();
    initModal();
    initForms();
    renderProducts(products);
});

function initLanguageSwitcher() {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar' || lang === 'ckb') ? 'rtl' : 'ltr';
    
    document.querySelectorAll('[data-' + lang + ']').forEach(el => {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = el.dataset[lang];
        } else if (el.tagName === 'OPTION') {
            el.textContent = el.dataset[lang];
        } else {
            el.textContent = el.dataset[lang];
        }
    });

    renderProducts(filteredProducts);
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

function initFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const brandFilter = document.getElementById('brand-filter');
    const priceFilter = document.getElementById('price-filter');
    const searchInput = document.getElementById('search-input');

    categoryFilter.addEventListener('change', applyFilters);
    brandFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', debounce(applyFilters, 300));
}

function applyFilters() {
    const category = document.getElementById('category-filter').value;
    const brand = document.getElementById('brand-filter').value;
    const price = document.getElementById('price-filter').value;
    const search = document.getElementById('search-input').value.toLowerCase();

    filteredProducts = products.filter(product => {
        const matchesCategory = category === 'all' || product.category === category;
        const matchesBrand = brand === 'all' || product.brand === brand;
        
        let matchesPrice = true;
        if (price !== 'all') {
            if (price === '500+') {
                matchesPrice = product.price >= 500;
            } else {
                const [min, max] = price.split('-').map(Number);
                matchesPrice = product.price >= min && product.price <= max;
            }
        }

        const matchesSearch = product.name[currentLang].toLowerCase().includes(search) ||
                             product.brand.toLowerCase().includes(search);

        return matchesCategory && matchesBrand && matchesPrice && matchesSearch;
    });

    renderProducts(filteredProducts);
}

function renderProducts(productsToRender) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    if (productsToRender.length === 0) {
        grid.innerHTML = `
            <div class="cart-empty" style="grid-column: 1/-1;">
                <i class="fa-solid fa-search"></i>
                <p data-en="No products found" data-ar="لم يتم العثور على منتجات" data-ckb="هیچ محصولێک نەدۆزرایەوە">هیچ محصولێک نەدۆزرایەوە</p>
            </div>
        `;
        return;
    }

    productsToRender.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <div class="product-image">
                <i class="fa-solid ${product.icon} product-placeholder"></i>
                <div class="product-actions">
                    <button class="product-action-btn" title="${currentLang === 'ckb' ? 'بینین' : currentLang === 'ar' ? 'عرض' : 'View'}">
                        <i class="fa-regular fa-eye"></i>
                    </button>
                    <button class="product-action-btn" title="${currentLang === 'ckb' ? 'ئەیکەن بە دڵخوازی' : currentLang === 'ar' ? 'مفضلة' : 'Wishlist'}">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${getCategoryName(product.category)}</span>
                <h3 class="product-name">${product.name[currentLang]}</h3>
                <span class="product-brand">${product.brand}</span>
                <div class="product-price-row">
                    <div class="product-price">
                        ${product.oldPrice ? `<span>$${product.oldPrice}</span>` : ''}
                        $${product.price.toFixed(2)}
                    </div>
                    <button class="add-to-cart-btn" data-id="${product.id}">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id);
            addToCart(id);
        });
    });

    document.querySelectorAll('.product-action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const heart = this.querySelector('.fa-heart');
            if (heart.classList.contains('fa-regular')) {
                heart.classList.replace('fa-regular', 'fa-solid');
            } else {
                heart.classList.replace('fa-solid', 'fa-regular');
            }
        });
    });
}

function getCategoryName(category) {
    const categories = {
        medicines: { ckb: "دەرمان", ar: "أدوية", en: "Medicines" },
        medical: { ckb: "ئامێرە پزیشکییەکان", ar: "معدات طبية", en: "Medical Equipment" },
        supplies: { ckb: "کەلوپەلە پزیشکییەکان", ar: "مستلزمات", en: "Medical Supplies" },
        vitamins: { ckb: "ڤیتامین و تەواوکەرەکان", ar: "فيتامنيات ومكملات", en: "Vitamins & Supplements" }
    };
    return categories[category] ? categories[category][currentLang] : category;
}

function initCart() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartClose = document.querySelector('.cart-close');

    cartBtn.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
    });

    const closeCart = () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    };

    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    updateCartCount();
    
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.classList.add('bounce');
    setTimeout(() => cartBtn.classList.remove('bounce'), 300);
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.querySelector('.total-price');

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fa-solid fa-cart-shopping"></i>
                <p data-en="Your cart is empty" data-ar="سلة الشراء فارغة" data-ckb="سەبەتەکەت بەتاڵە">سەبەتەکەت بەتاڵە</p>
            </div>
        `;
        totalPrice.textContent = '$0.00';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-img">
                <i class="fa-solid ${item.icon}" style="font-size: 2rem; color: var(--gray-400); display: flex; align-items: center; justify-content: center; height: 100%;"></i>
            </div>
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name[currentLang]}</h4>
                <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <i class="fa-solid fa-trash cart-item-remove" onclick="removeFromCart(${item.id})"></i>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.textContent = `$${total.toFixed(2)}`;
}

function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
            updateCartCount();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    updateCartCount();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

function initModal() {
    const adminLink = document.querySelector('.admin-link a');
    const modal = document.getElementById('admin-modal');
    const modalClose = document.querySelector('.modal-close');
    const adminForm = document.getElementById('admin-login-form');

    adminLink.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;

        if (username && password) {
            window.location.href = 'admin.html';
        }
    });
}

function initForms() {
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert(currentLang === 'ckb' ? 'پەیامەکەت نێردرا!' : currentLang === 'ar' ? 'تم إرسال رسالتك!' : 'Message sent!');
        contactForm.reset();
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '12px 0';
    } else {
        navbar.style.padding = '16px 0';
    }
});

const style = document.createElement('style');
style.textContent = `
    .btn.bounce {
        animation: bounce 0.3s ease;
    }
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(style);

document.querySelector('.products-grid').addEventListener('click', (e) => {
    const btn = e.target.closest('.product-action-btn');
    if (btn) {
        btn.classList.toggle('active');
        const heart = btn.querySelector('.fa-heart');
        if (heart) {
            if (heart.classList.contains('fa-regular')) {
                heart.classList.replace('fa-regular', 'fa-solid');
            } else {
                heart.classList.replace('fa-solid', 'fa-regular');
            }
        }
    }
});
