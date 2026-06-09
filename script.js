// بيانات المطعم والمنيو
const whatsappNumber = '966542056933'; // ضع رقمك هنا
const categories = ['الكل', 'الساندوتشات', 'الوجبات', 'الجانبية', 'المشروبات'];
let activeCategory = 'الكل';
let cart = [];

const menu = [
    { id: 1, name: 'برجر لحم دبل', price: 8, desc: 'شريحة لحم مشوية طازجة مع الجبن الذائب والخضار.', category: 'الساندوتشات', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop' },
    { id: 2, name: 'ساندويتش مسحب', price: 4, desc: 'قطع دجاج مسحب ذهبية متبلة ببهاراتنا السرية تقدم مقرمشة.', category: 'الساندوتشات', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=600&auto=format&fit=crop' },
    { id: 3, name: 'برجر زنجر', price: 7, desc: 'صدر دجاج زنجر المقرمش الحار مع خس وصلصة المايونيز.', category: 'الساندوتشات', image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAG_Q2on26YoEYpYotOGqZ5aq5iQZB4HRQOlgUDYRoexg6R29N7QVXzc68zPjUUglbxSqOFh_RHR_OLri5Wbcu6-xLEzzOJxfnwugEtUodSkZyVn8be9aMMT94fbMlDNF2VPeX5l=w258-h336-p-k-no' },
    { id: 4, name: 'مليس بالفطير', price: 4, desc: 'مليس بالفطيرة مع جبن سائل و صوصات لذيذة.', category: 'الوجبات', image: 'https://images.unsplash.com/photo-1657114773859-dc80f9765845?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 5, name: 'صحن بطاطس كبير', price: 6, desc: 'أصابع بطاطس ذهبية مضاف إليها بهارات الاستراحة.', category: 'الجانبية', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=600&auto=format&fit=crop' },
    { id: 6, name: 'عصير طازج', price: 10, desc: 'عصير طبيعي بارد ومعد طازجاً، يفتح الشهية.', category: 'المشروبات', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=600&auto=format&fit=crop' }
];

// دالة التهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderMenu();
    updateCartUI();


    document.getElementById('floating-whatsapp').href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('مرحباً بوفية الوجبة الرائقة، عندي استفسار:')}`;
});

// رسم أزرار التصنيفات
function renderCategories() {
    const container = document.getElementById('category-filters');
    container.innerHTML = '';
    
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.innerText = cat;
        btn.className = activeCategory === cat ? 'btn btn-orange-brand fw-bold px-4 shadow-sm rounded-pill transition' : 'btn btn-outline-orange fw-bold px-4 bg-white rounded-pill transition';
        btn.onclick = () => {
            activeCategory = cat;
            renderCategories(); // تحديث ألوان الأزرار
            renderMenu(); // تحديث المنيو
        };
        container.appendChild(btn);
    });
}

// رسم قائمة الطعام
function renderMenu() {
    const container = document.getElementById('menu-container');
    const filteredMenu = activeCategory === 'الكل' ? menu : menu.filter(item => item.category === activeCategory);
    
    if (filteredMenu.length === 0) {
        container.innerHTML = `<div class="col-12 text-center py-5"><p class="text-muted fs-5">لا توجد أصناف في هذا القسم حالياً.</p></div>`;
        return;
    }

    container.innerHTML = filteredMenu.map(item => `
        <div class="col-md-6 col-lg-4">
            <div class="card h-100 border border-orange-light shadow-sm">
                <div class="position-relative">
                    <img src="${item.image}" class="card-img-top" alt="${item.name}" style="height: 220px; object-fit: cover;">
                    <span class="position-absolute top-0 end-0 bg-white text-orange-brand fw-bold m-3 px-3 py-1 rounded-pill shadow-sm">${item.price} ر.س</span>
                    <span class="position-absolute bottom-0 start-0 bg-dark text-white bg-opacity-75 small m-2 px-2 py-1 rounded">${item.category}</span>
                </div>
                <div class="card-body d-flex flex-column justify-content-between p-4">
                    <div>
                        <h4 class="card-title fw-bold mb-2 text-dark">${item.name}</h4>
                        <p class="card-text text-muted small mb-4">${item.desc}</p>
                    </div>
                    <div>
                        ${item.category == 'المشروبات' ? '' :
                            `<div class="bg-light p-3 rounded-3 mb-3 border border-light-subtle text-end">
                                <span class="d-block text-secondary small fw-bold mb-2">🥫 تخصيص الإضافات:</span>
                                <div class="form-check mb-2">
                                    <input class="form-check-input float-end me-2" type="checkbox" id="ketchup-${item.id}">
                                    <label class="form-check-label text-dark small me-5" for="ketchup-${item.id}" style="padding-right: 25px;">إضافة كاتشاب</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input float-end me-2" type="checkbox" id="shatta-${item.id}">
                                    <label class="form-check-label text-dark small me-5" for="shatta-${item.id}" style="padding-right: 25px;">إضافة شطة حارة 🌶️</label>
                                </div>
                            </div>
                        `}
                        <button onclick="addToCart(${item.id})" class="btn btn-outline-orange w-100 fw-bold py-2.5 rounded-3 d-flex align-items-center justify-content-center gap-2">
                            <span>إضافة للطلب</span>
                            <span>📌</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// إضافة للسلة
function addToCart(itemId) {
    const item = menu.find(i => i.id === itemId);
    let hasKetchup = document.getElementById(`ketchup-${itemId}`);
    if(hasKetchup != null) {
        hasKetchup = hasKetchup.checked
    }
    let hasShatta = document.getElementById(`shatta-${itemId}`);
    if(hasShatta != null) {
        hasShatta = hasShatta.checked
    }
    
    // إنشاء معرف فريد مبني على الخيارات لعدم دمج وجبتين مختلفتي الإضافات
    const cartItemId = `${item.id}-${hasKetchup ? 'k' : 'nk'}-${hasShatta ? 's' : 'ns'}`;
    
    const existing = cart.find(i => i.cartItemId === cartItemId);
    
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...item, cartItemId, qty: 1, ketchup: hasKetchup, shatta: hasShatta });
    }

    // تصفير الخانات بعد الإضافة للطلب
    if(hasKetchup) hasKetchup.checked = false;
    if(hasShatta) hasShatta.checked = false;

    updateCartUI();
    toggleCart(true); // افتح السلة تلقائياً
}

// تعديل الكميات من السلة
function updateQty(cartItemId, amount) {
    const item = cart.find(i => i.cartItemId === cartItemId);
    if (item) {
        item.qty += amount;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.cartItemId !== cartItemId);
        }
    }
    updateCartUI();
}

// تحديث واجهة السلة
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const whatsappBtn = document.getElementById('whatsapp-btn');

    // تحديث العدد
    cartCount.innerText = cart.reduce((sum, item) => sum + item.qty, 0);

    // حساب المجموع
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    cartTotal.innerText = `${total} ر.س`;

    // تفعيل/تعطيل زر الواتساب
    whatsappBtn.disabled = cart.length === 0;

    // رسم محتوى السلة
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-5 text-muted">
                <p class="display-3 mb-2">🛒</p>
                <p class="fw-bold">السلة فارغة حالياً</p>
            </div>
        `;
        return;
    }

    cartItemsContainer.innerHTML = cart.map(cartItem => `
        <div class="d-flex align-items-center justify-content-between gap-3 p-3 mb-3 bg-light rounded-3 border border-orange-light">
            <img src="${cartItem.image}" class="rounded-3" style="width: 65px; height: 65px; object-fit: cover;">
            <div class="flex-grow-1 text-end">
                <h6 class="fw-bold mb-1 text-dark">${cartItem.name}</h6>
                <div class="mb-1">
                    ${cartItem.ketchup ? '<span class="badge bg-secondary text-white me-1 small">بكاتشاب</span>' : ''}
                    ${cartItem.shatta ? '<span class="badge bg-danger text-white me-1 small">بشطة 🌶️</span>' : ''}
                </div>
                <span class="text-orange-brand fw-bold small">${cartItem.price * cartItem.qty} ر.س</span>
            </div>
            <div class="d-flex align-items-center border rounded bg-white px-2 py-1">
                <button onclick="updateQty('${cartItem.cartItemId}', -1)" class="btn btn-sm p-0 px-1 fw-bold text-orange-brand">-</button>
                <span class="mx-2 fw-bold text-dark small">${cartItem.qty}</span>
                <button onclick="updateQty('${cartItem.cartItemId}', 1)" class="btn btn-sm p-0 px-1 fw-bold text-orange-brand">+</button>
            </div>
        </div>
    `).join('');
}

// فتح وإغلاق السلة
function toggleCart(forceOpen = null) {
    const modal = document.getElementById('cart-modal');
    if (forceOpen === true) {
        modal.style.display = 'block';
    } else {
        modal.style.display = modal.style.display === 'none' || modal.style.display === '' ? 'block' : 'none';
    }
}

// إغلاق السلة عند الضغط في المساحة السوداء
document.getElementById('cart-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        toggleCart(false);
    }
});

// إرسال للواتساب
function sendToWhatsApp() {
    if (cart.length === 0) return;
    
    let message = "السلام عليكم، \ابغا اسجل طلب جديد من الموقع:\n\n";
    
    cart.forEach(item => {
        let options = [];
        if (item.ketchup) options.push("مع كاتشاب");
        if (item.shatta) options.push("مع شطة");
        let optionsStr = options.length > 0 ? ` [${options.join(' + ')}]` : " [بدون إضافات]";
        
        message += `• *${item.name}*${optionsStr}\n   العدد: ${item.qty} -> ${item.price * item.qty} ر.س\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    message += `\n *الإجمالي النهائي:* ${total} ر.س\n\nيرجى البدء في تحضيره! `;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
}