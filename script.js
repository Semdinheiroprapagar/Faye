// ============================================
// VARIAÇÕES PADRÃO
// ============================================

const DEFAULT_SIZES = ['P', 'M', 'G', 'GG'];
const DEFAULT_COLORS = [
    { id: 'rosa', label: 'Rosa', hex: '#ec4899' },
    { id: 'preto', label: 'Preto', hex: '#0f172a' },
    { id: 'branco', label: 'Branco', hex: '#f8fafc' },
    { id: 'azul', label: 'Azul', hex: '#1d4ed8' }
];

function createSizeVariations(basePrice) {
    return DEFAULT_SIZES.map(size => ({
        id: size.toLowerCase(),
        label: `Tamanho ${size}`,
        price: basePrice,
        stock: 20
    }));
}

function createColorVariations() {
    return DEFAULT_COLORS.map(color => ({ ...color }));
}

function createSingleVariation(basePrice, label = 'Tamanho Único') {
    return [{
        id: 'unico',
        label,
        price: basePrice,
        stock: 50
    }];
}

const PRODUCT_COLORS = ['rosa', 'preto', 'branco', 'azul'];

const COLOR_MAP = {
    rosa: { label: 'Rosa', hex: '#ec4899' },
    preto: { label: 'Preto', hex: '#0f172a' },
    branco: { label: 'Branco', hex: '#f8fafc' },
    azul: { label: 'Azul', hex: '#1d4ed8' }
};

function buildGallery(slug, total = 3) {
    return Array.from({ length: total }, (_, index) => `assets/images/products/${slug}/${slug}-detail-${index + 1}.png`);
}

function buildColorVariations(slug, colors = PRODUCT_COLORS) {
    return colors.map(colorId => {
        const meta = COLOR_MAP[colorId] || { label: colorId, hex: '#000000' };
        return {
            id: colorId,
            label: meta.label,
            hex: meta.hex,
            image: `assets/images/products/${slug}/${slug}-${colorId}.png`
        };
    });
}

function createProduct({ id, slug, category, name, price, badge = null, description = '', benefits = [], galleryTotal = 3, colors = PRODUCT_COLORS }) {
    const colorVariations = buildColorVariations(slug, colors);
    const gallery = buildGallery(slug, galleryTotal);
    const primaryVariation = colorVariations[0] || { image: `assets/images/products/${slug}/${slug}-rosa.png`, label: 'Rosa' };

    return {
        id,
        slug,
        category,
        name,
        price,
        badge,
        description,
        benefits,
        gallery,
        colorVariations,
        image: primaryVariation.image,
        color: primaryVariation.label
    };
}

const products = {
    conjuntos: [
        createProduct({
            id: 1,
            slug: 'conjunto-premium',
            category: 'Conjuntos',
            name: 'Conjunto-1',
            price: 25.00,
            
            description: 'Performance de alto impacto com tecido macio que abraça e esculpe a silhueta.',
            benefits: ['Top com sustentação extrema', 'Dry fit com resfriamento rápido']
        }),
        createProduct({
            id: 2,
            slug: 'conjunto-training',
            category: 'Conjuntos',
            name: 'Conjunto-2',
            price: 25.00,
            
            description: 'Tecnologia antiodor e respirabilidade máxima para treinos sem interrupção.',
            benefits: ['Costuras flat que não irritam', 'Tecido antibactérias permanente', 'Elasticidade 360° sem transparência']
        }),
        createProduct({
            id: 3,
            slug: 'conjunto-deluxe',
            category: 'Conjuntos',
            name: 'Conjunto-3',
            price: 25.00,
            
            description: 'Visual premium que transita do estúdio à rua mantendo conforto absoluto.',
            benefits: ['Proteção UV50+ contra raios solares', 'Modelagem que afina a cintura', 'Acabamento acetinado antidesgaste']
        })
    ],
    tops: [
        createProduct({
            id: 4,
            slug: 'top-alta-performance',
            category: 'Tops',
            name: 'Top-1',
            price: 14.00,
            
            description: 'Suporte inteligente com recortes anatômicos que valorizam o busto.',
            benefits: ['Bojo removível com memória', 'Alças reguláveis acolchoadas', 'Forro respirável cool touch']
        }),
        createProduct({
            id: 5,
            slug: 'top-cross-training',
            category: 'Tops',
            name: 'Top-2',
            price: 14.00,
            
            description: 'Estrutura reforçada para treinos explosivos com total liberdade de movimento.',
            benefits: ['Alta sustentação antichoque', 'Costas nadador ventilada', 'Compressão estratégica no busto']
        }),
        createProduct({
            id: 6,
            slug: 'top-modelador',
            category: 'Tops',
            name: 'Top-3',
            price: 14.00,
            description: 'Top modelador de toque acetinado que abraça sem apertar e respira com você.',
            benefits: ['Modelagem 3D que define curvas', 'Forro antibacteriano hipoalergênico', 'Barra firme que não enrola']
        })
    ],
    shorts: [
        createProduct({
            id: 7,
            slug: 'short-performance',
            category: 'Shorts',
            name: 'Short-01',
            price: 16.00,
            
            description: 'Compressão confortável com cintura alta que entrega segurança o dia todo.',
            benefits: ['Bolso lateral para essentials', 'Costuras reforçadas antiatrito', 'Não enrola mesmo em treinos intensos']
        }),
        createProduct({
            id: 8,
            slug: 'short-saia',
            category: 'Shorts',
            name: 'Short-02',
            price: 16.00,
            description: 'Short externo fluido com interno firme, garantindo estilo e cobertura total.',
            benefits: ['UV50+ de longa duração', 'Saia com recorte envelope', 'Short interno aderente e seguro']
        }),
        createProduct({
            id: 9,
            slug: 'short-ciclista',
            category: 'Shorts',
            name: 'Short-03',
            price: 16.00,
            
            description: 'Ciclista com compressão estratégica e textura que ativa a circulação.',
            benefits: ['Painéis ventilados nas laterais', 'Estampa digital com alta durabilidade', 'Barra dupla que não sobe']
        })
    ]
};

function assignDefaultVariations() {
    Object.values(products).forEach(categoryList => {
        categoryList.forEach(product => {
            if (!product.sizeVariations || product.sizeVariations.length === 0) {
                if (product.category === 'Acessórios') {
                    product.sizeVariations = createSingleVariation(product.price, 'Tamanho Único');
                } else {
                    product.sizeVariations = createSizeVariations(product.price);
                }
            }

            if (!product.colorVariations || product.colorVariations.length === 0) {
                product.colorVariations = createColorVariations();
            }

            if ((!product.image || !product.color) && product.colorVariations.length) {
                if (!product.image) {
                    product.image = product.colorVariations[0].image || product.image;
                }
                if (!product.color) {
                    product.color = product.colorVariations[0].label;
                }
            }
        });
    });
}

assignDefaultVariations();

// ============================================
// ESTADO DA APLICAÇÃO
// ============================================

const state = {
    cart: [],
    isMenuOpen: false,
    isCartOpen: false,
    isSearchOpen: false
};

// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================

function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

function updateCartCount() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems || '0';
}

// ============================================
// RENDERIZAÇÃO DE PRODUTOS
// ============================================

function createProductCard(product) {
    const hasPromoPrice = product.price > 20;
    const benefits = Array.isArray(product.benefits) ? product.benefits.slice(0, 2) : [];
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                ${product.description ? `<p class="product-description">${product.description}</p>` : ''}
                <div class="product-meta">
                    <span class="product-color">Cor disponível: ${product.color}</span>
                    <span class="product-price">${formatPrice(product.price)}</span>
                </div>
                ${hasPromoPrice ? `<p class="product-promo-price">Descontos especiais acima de 20 peças</p>` : ''}
                ${benefits.length ? `
                    <div class="product-benefits">
                        ${benefits.map(benefit => `<span>${benefit}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function renderProducts(productsArray, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = productsArray.map(product => createProductCard(product)).join('');
    
    // Adicionar event listeners aos botões (quando existirem)
    container.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.dataset.productId);
            addToCart(productId);
        });
    });

    container.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const productId = parseInt(card.dataset.productId);
            window.location.href = `product.html?id=${productId}`;
        });
    });
}

// ============================================
// GERENCIAMENTO DO CARRINHO
// ============================================

function addToCart(productId, options = {}) {
    const { sizeId = null, colorId = null } = options;
    // Encontrar o produto em todas as categorias
    let product = null;
    for (const category in products) {
        product = products[category].find(p => p.id === productId);
        if (product) break;
    }
    
    if (!product) return;

    const sizes = product.sizeVariations || [];
    const colors = product.colorVariations || [];

    const selectedSizeId = sizeId || (sizes[0] ? sizes[0].id : null);
    const selectedColorId = colorId || (colors[0] ? colors[0].id : null);

    const sizeVariation = selectedSizeId ? sizes.find(v => v.id === selectedSizeId) : null;
    const colorVariation = selectedColorId ? colors.find(v => v.id === selectedColorId) : null;

    const itemPrice = sizeVariation ? sizeVariation.price : product.price;
    const sizeKey = sizeVariation ? sizeVariation.id : 'default-size';
    const colorKey = colorVariation ? colorVariation.id : 'default-color';
    const itemKey = `${product.id}-${sizeKey}-${colorKey}`;
    const existingItem = state.cart.find(item => item.key === itemKey);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        state.cart.push({
            key: itemKey,
            id: product.id,
            name: product.name,
            image: colorVariation ? colorVariation.image : product.image,
            price: itemPrice,
            sizeId: sizeVariation ? sizeVariation.id : null,
            sizeLabel: sizeVariation ? sizeVariation.label : null,
            colorId: colorVariation ? colorVariation.id : null,
            colorLabel: colorVariation ? colorVariation.label : null,
            quantity: 1
        });
    }
    
    updateCartUI();
    animateCartCounter();
    showNotification('Produto adicionado ao carrinho!');
}

function animateCartCounter() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.classList.add('bump');
    setTimeout(() => cartCount.classList.remove('bump'), 600);
    updateCartCount();
}

function removeFromCart(itemKey) {
    state.cart = state.cart.filter(item => item.key !== itemKey);
    updateCartUI();
    updateCartCount();
    showNotification('Produto removido do carrinho');
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSubtotalEl = document.querySelector('.cart-subtotal');
    const cartTotalEl = document.querySelector('.cart-total');
    const emptyCartEl = document.querySelector('.empty-cart');
    
    if (state.cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCartEl.style.display = 'block';
        cartSubtotalEl.textContent = formatPrice(0);
        cartTotalEl.textContent = formatPrice(0);
        return;
    }
    
    emptyCartEl.style.display = 'none';
    
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartItemsContainer.innerHTML = state.cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <p class="cart-item-name">${item.name}</p>
                ${item.sizeLabel ? `<p class="cart-item-variation">${item.sizeLabel}</p>` : ''}
                ${item.colorLabel ? `<p class="cart-item-variation">Cor: ${item.colorLabel}</p>` : ''}
                <p class="cart-item-price">${formatPrice(item.price)} × ${item.quantity}</p>
                <button class="cart-item-remove" onclick="removeFromCart('${item.key}')">Remover</button>
            </div>
        </div>
    `).join('');
    
    cartSubtotalEl.textContent = formatPrice(subtotal);
    cartTotalEl.textContent = formatPrice(subtotal);
}

// ============================================
// FUNCIONALIDADE DE BUSCA
// ============================================

function getAllProducts() {
    const allProducts = [];
    for (const category in products) {
        allProducts.push(...products[category]);
    }
    return allProducts;
}

function searchProducts(query) {
    if (!query || query.trim().length === 0) {
        return [];
    }
    
    const searchTerm = query.toLowerCase().trim();
    const allProducts = getAllProducts();
    
    return allProducts.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(searchTerm);
        const colorMatch = product.color.toLowerCase().includes(searchTerm);
        const categoryMatch = product.category.toLowerCase().includes(searchTerm);
        
        return nameMatch || colorMatch || categoryMatch;
    });
}

function findProductById(productId) {
    if (!productId) return null;
    const allProducts = getAllProducts();
    return allProducts.find(product => product.id === productId) || null;
}

function getRelatedProducts(product, limit = 4) {
    if (!product) return [];
    const allProducts = getAllProducts().filter(p => p.id !== product.id);
    const sameCategory = allProducts.filter(p => p.category === product.category);
    const related = sameCategory.slice(0, limit);

    if (related.length < limit) {
        const remaining = allProducts
            .filter(p => p.category !== product.category)
            .slice(0, limit - related.length);
        return [...related, ...remaining];
    }

    return related;
}

function renderSearchResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p class="search-placeholder">Nenhum produto encontrado.</p>';
        return;
    }
    
    resultsContainer.innerHTML = `
        <div class="search-results-grid">
            ${results.map(product => createProductCard(product)).join('')}
        </div>
    `;
    
    // Adicionar event listeners aos botões de adicionar ao carrinho
    resultsContainer.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.dataset.productId);
            addToCart(productId);
        });
    });

    resultsContainer.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const productId = parseInt(card.dataset.productId);
            window.location.href = `product.html?id=${productId}`;
        });
    });
}

function renderProductDetail(product) {
    const detailContainer = document.getElementById('productDetail');
    if (!detailContainer) return;

    const sizeVariations = product.sizeVariations || [];
    const colorVariations = product.colorVariations || [];
    const defaultColorVariation = colorVariations[0] || null;
    const baseGallery = Array.isArray(product.gallery) ? product.gallery.filter(Boolean) : [];
    const gallerySet = new Set();
    if (defaultColorVariation && defaultColorVariation.image) {
        gallerySet.add(defaultColorVariation.image);
    } else if (product.image) {
        gallerySet.add(product.image);
    }
    baseGallery.forEach(image => gallerySet.add(image));
    colorVariations.forEach(variation => {
        if (variation.image) {
            gallerySet.add(variation.image);
        }
    });
    const galleryImages = Array.from(gallerySet);
    const initialImage = galleryImages[0] || product.image;
    const initialColorLabel = defaultColorVariation ? defaultColorVariation.label : product.color;

    const sizeOptions = sizeVariations.map((variation, index) => `
        <label class="variation-option">
            <input type="radio" name="product-variation" value="${variation.id}" ${index === 0 ? 'checked' : ''}>
            <span>${variation.label}</span>
        </label>
    `).join('');

    const colorOptions = colorVariations.map((variation, index) => `
        <label class="color-option">
            <input type="radio" name="product-color" value="${variation.id}" data-image="${variation.image}" data-label="${variation.label}" ${index === 0 ? 'checked' : ''}>
            <span class="color-swatch" style="background:${variation.hex};"></span>
            <img src="${variation.image}" alt="${variation.label}">
            <span class="color-label">${variation.label}</span>
        </label>
    `).join('');

    const galleryThumbs = galleryImages.length ? galleryImages.map((imageSrc, index) => `
        <button type="button" class="product-thumb ${index === 0 ? 'active' : ''}" data-image="${imageSrc}">
            <img src="${imageSrc}" alt="${product.name} detalhe ${index + 1}">
        </button>
    `).join('') : '';

    detailContainer.innerHTML = `
        <div class="product-detail-gallery">
            <img src="${initialImage}" alt="${product.name}" class="product-detail-main-image" id="productMainImage">
            ${galleryThumbs ? `<div class="product-detail-thumbs">${galleryThumbs}</div>` : ''}
        </div>
        <div class="product-detail-info">
            <span class="product-detail-category">${product.category}</span>
            <h1 class="product-detail-name">${product.name}</h1>
            ${product.description ? `<p class="product-detail-description">${product.description}</p>` : ''}
            <div class="product-detail-price">
                <span>${formatPrice(product.price)}</span>
                <small>Acima de 20 peças consulte descontos</small>
            </div>
            ${colorVariations.length ? `<span class="product-detail-selected-color">Cor selecionada: ${initialColorLabel}</span>` : ''}
            ${product.benefits && product.benefits.length ? `
                <div class="product-detail-benefits">
                    ${product.benefits.map(benefit => `<span>${benefit}</span>`).join('')}
                </div>
            ` : ''}
            ${sizeVariations.length ? `
            <div class="product-detail-variations">
                <h3>Selecione o tamanho</h3>
                <div class="variation-options">
                    ${sizeOptions}
                </div>
            </div>` : ''}
            ${colorVariations.length ? `
            <div class="product-detail-colors">
                <h3>Selecione a cor</h3>
                <div class="color-options">
                    ${colorOptions}
                </div>
            </div>` : ''}
            <div class="product-detail-actions">
                <button class="btn-primary" id="addToCartDetail">Adicionar ao carrinho</button>
            </div>
        </div>
    `;

    const addToCartDetailBtn = document.getElementById('addToCartDetail');
    if (addToCartDetailBtn) {
        addToCartDetailBtn.addEventListener('click', () => {
            const selectedVariation = detailContainer.querySelector('input[name="product-variation"]:checked');
            const selectedColor = detailContainer.querySelector('input[name="product-color"]:checked');
            const variationId = selectedVariation ? selectedVariation.value : null;
            const colorId = selectedColor ? selectedColor.value : null;
            addToCart(product.id, { sizeId: variationId, colorId });
        });
    }

    const mainImageEl = detailContainer.querySelector('#productMainImage');
    const selectedColorEl = detailContainer.querySelector('.product-detail-selected-color');
    const thumbButtons = detailContainer.querySelectorAll('.product-thumb');

    const setActiveThumb = (imageSrc) => {
        thumbButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.image === imageSrc);
        });
    };

    thumbButtons.forEach(button => {
        button.addEventListener('click', () => {
            const imageSrc = button.dataset.image;
            if (imageSrc) {
                mainImageEl.src = imageSrc;
                setActiveThumb(imageSrc);
            }
        });
    });

    detailContainer.querySelectorAll('input[name="product-color"]').forEach(input => {
        input.addEventListener('change', () => {
            const image = input.dataset.image;
            const label = input.dataset.label;
            if (image) {
                mainImageEl.src = image;
                setActiveThumb(image);
            }
            if (selectedColorEl && label) {
                selectedColorEl.textContent = `Cor selecionada: ${label}`;
            }
        });
    });

    if (thumbButtons.length) {
        setActiveThumb(initialImage);
    }
}

function toggleSearch() {
    const willOpen = !state.isSearchOpen;
    state.isSearchOpen = willOpen;

    if (willOpen) {
        closeCart();
        closeMobileMenu();
    }

    const searchModal = document.getElementById('searchModal');
    const overlay = document.getElementById('overlay');
    const searchInput = document.getElementById('searchInput');
    
    searchModal.classList.toggle('active', state.isSearchOpen);
    overlay.classList.toggle('active', state.isSearchOpen);
    document.body.style.overflow = state.isSearchOpen ? 'hidden' : '';
    
    if (state.isSearchOpen) {
        setTimeout(() => searchInput.focus(), 100);
    } else {
        searchInput.value = '';
        document.getElementById('searchResults').innerHTML = '<p class="search-placeholder">Digite para buscar produtos...</p>';
    }
}

function closeSearch() {
    state.isSearchOpen = false;
    document.getElementById('searchModal').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '<p class="search-placeholder">Digite para buscar produtos...</p>';
}

// ============================================
// GERENCIAMENTO DE MENU MOBILE
// ============================================

function toggleMobileMenu() {
    state.isMenuOpen = !state.isMenuOpen;
    document.getElementById('mobileMenu').classList.toggle('active', state.isMenuOpen);
    document.getElementById('overlay').classList.toggle('active', state.isMenuOpen);
    document.getElementById('mobileMenuToggle').classList.toggle('active', state.isMenuOpen);
    document.body.style.overflow = state.isMenuOpen ? 'hidden' : '';
}

function toggleCart() {
    state.isCartOpen = !state.isCartOpen;
    document.getElementById('cartSidebar').classList.toggle('active', state.isCartOpen);
    document.getElementById('overlay').classList.toggle('active', state.isCartOpen);
    document.body.style.overflow = state.isCartOpen ? 'hidden' : '';
}

function closeMobileMenu() {
    state.isMenuOpen = false;
    document.getElementById('mobileMenu').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    document.getElementById('mobileMenuToggle').classList.remove('active');
    document.body.style.overflow = '';
}

function closeCart() {
    state.isCartOpen = false;
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    document.body.style.overflow = '';
}

function setupMobileMenuDropdowns() {
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const menuItem = toggle.closest('.mobile-menu-item');
            menuItem.classList.toggle('active');
        });
    });
}

// ============================================
// NOTIFICAÇÕES
// ============================================

function showNotification(message) {
    // Remover notificação existente
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Adicionar estilos de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// INICIALIZAÇÃO
// ============================================

function init() {
    // Renderizar produtos
    renderProducts(products.conjuntos, 'conjuntosGrid');
    renderProducts(products.tops, 'topsGrid');
    renderProducts(products.shorts, 'shortsGrid');

    const catalogGrid = document.getElementById('catalogGrid');
    if (catalogGrid) {
        const allProducts = getAllProducts();
        renderProducts(allProducts, 'catalogGrid');
    }

    const productDetailWrapper = document.getElementById('productDetail');
    if (productDetailWrapper) {
        const params = new URLSearchParams(window.location.search);
        const productIdParam = parseInt(params.get('id'), 10);
        const product = findProductById(productIdParam);

        if (product) {
            renderProductDetail(product);
            const relatedGrid = document.getElementById('relatedProductsGrid');
            if (relatedGrid) {
                const relatedProducts = getRelatedProducts(product);
                renderProducts(relatedProducts, 'relatedProductsGrid');
            }
        } else {
            productDetailWrapper.innerHTML = '<p class="product-not-found">Produto não encontrado.</p>';
        }
    }
    
    // Event listeners
    document.getElementById('mobileMenuToggle').addEventListener('click', toggleMobileMenu);
    document.getElementById('closeMenu').addEventListener('click', closeMobileMenu);
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
    document.getElementById('closeCart').addEventListener('click', closeCart);
    document.querySelector('.search-btn').addEventListener('click', toggleSearch);
    document.getElementById('closeSearch').addEventListener('click', closeSearch);
    document.getElementById('overlay').addEventListener('click', () => {
        closeMobileMenu();
        closeCart();
        closeSearch();
    });
    
    // Busca em tempo real
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value;
        
        if (query.trim().length === 0) {
            document.getElementById('searchResults').innerHTML = '<p class="search-placeholder">Digite para buscar produtos...</p>';
            return;
        }
        
        searchTimeout = setTimeout(() => {
            const results = searchProducts(query);
            renderSearchResults(results);
        }, 300);
    });
    
    // Fechar busca com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && state.isSearchOpen) {
            closeSearch();
        }
    });
    
    // Carrinho actions
    document.querySelector('.btn-continue').addEventListener('click', closeCart);
    document.querySelector('.btn-checkout').addEventListener('click', () => {
        alert('Obrigado por sua compra! Em um sistema real, você seria redirecionado para o checkout.');
    });
    
    // Menu mobile dropdowns
    setupMobileMenuDropdowns();
    
    // Newsletter form
    document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        alert(`Email ${email} cadastrado com sucesso!`);
        e.target.reset();
    });
    
    // Inicializar contador do carrinho
    updateCartCount();
    
    // Scroll suave para seções
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#home') {
                e.preventDefault();
                return;
            }
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                closeMobileMenu();
            }
        });
    });
    
    // Animações de scroll
    setupScrollAnimations();
    
    // Carousel
    initCarousel();
}

// ============================================
// CAROUSEL
// ============================================

let currentSlide = 0;
let carouselInterval = null;
let carouselSlides = [];
let carouselIndicators = [];
let carouselElement = null;

function initCarousel() {
    carouselSlides = Array.from(document.querySelectorAll('.carousel-slide'));
    carouselIndicators = Array.from(document.querySelectorAll('.indicator'));
    carouselElement = document.querySelector('.hero-carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!carouselElement || carouselSlides.length === 0) {
        return;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    }

    carouselIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    carouselElement.addEventListener('mouseenter', stopCarousel);
    carouselElement.addEventListener('mouseleave', startCarousel);

    let touchStartX = 0;
    let touchEndX = 0;

    carouselElement.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    carouselElement.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const delta = touchEndX - touchStartX;
        if (delta > 60) {
            goToSlide(currentSlide - 1);
        }
        if (delta < -60) {
            goToSlide(currentSlide + 1);
        }
    }, { passive: true });

    goToSlide(0, false);
    startCarousel();
}

function goToSlide(index, restart = true) {
    if (!carouselSlides.length) return;

    const totalSlides = carouselSlides.length;
    currentSlide = (index + totalSlides) % totalSlides;

    carouselSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle('active', slideIndex === currentSlide);
    });

    carouselIndicators.forEach((indicator, indicatorIndex) => {
        indicator.classList.toggle('active', indicatorIndex === currentSlide);
    });

    if (restart) {
        stopCarousel();
        startCarousel();
    }
}

function startCarousel() {
    if (carouselInterval || carouselSlides.length === 0) return;
    carouselInterval = setInterval(() => {
        goToSlide(currentSlide + 1, false);
    }, 5000);
}

function stopCarousel() {
    if (!carouselInterval) return;
    clearInterval(carouselInterval);
    carouselInterval = null;
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar seções de produtos
    document.querySelectorAll('.products-section').forEach(section => {
        observer.observe(section);
    });
}

// Expor função para uso inline
window.removeFromCart = removeFromCart;

// Aguardar DOM carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

