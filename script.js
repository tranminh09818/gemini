// script.js

// ======[ STATE & GLOBAL VARIABLES ]======
let allBooks = [
    // Sample data - REPLACE/EXPAND with your actual book data
    { id: 1, title: "Lược Sử Thời Gian", author: "Stephen Hawking", price: 150000, image: "https://via.placeholder.com/150x220.png?text=Book+1", genre: "Khoa học", rating: 4.7, description: "Một cuốn sách kinh điển về vũ trụ học, khám phá các khái niệm từ Big Bang đến lỗ đen.", dateAdded: "2024-01-15", originalPrice: 180000, salesCount: 250 },
    { id: 2, title: "Nhà Giả Kim", author: "Paulo Coelho", price: 85000, image: "https://via.placeholder.com/150x220.png?text=Book+2", genre: "Tiểu thuyết", rating: 4.9, description: "Câu chuyện phiêu lưu đầy cảm hứng về việc theo đuổi ước mơ và lắng nghe trái tim.", dateAdded: "2023-11-20", originalPrice: 85000, salesCount: 500 },
    { id: 3, title: "Tôi thấy hoa vàng trên cỏ xanh", author: "Nguyễn Nhật Ánh", price: 110000, image: "https://via.placeholder.com/150x220.png?text=Book+3", genre: "Văn học", rating: 4.6, description: "Một câu chuyện tuổi thơ trong sáng, đầy kỷ niệm tại một làng quê Việt Nam.", dateAdded: "2024-03-10", originalPrice: 110000, salesCount: 310 },
    { id: 4, title: "Lập trình Web với Node.js & Express", author: "Tác giả D", price: 280000, image: "https://via.placeholder.com/150x220.png?text=Book+4", genre: "Lập trình", rating: 4.5, description: "Hướng dẫn xây dựng ứng dụng web hiện đại bằng Node.js.", dateAdded: "2024-05-01", originalPrice: 280000, salesCount: 80 },
    { id: 5, title: "Sherlock Holmes Toàn Tập", author: "Arthur Conan Doyle", price: 450000, image: "https://via.placeholder.com/150x220.png?text=Book+5", genre: "Trinh thám", rating: 4.8, description: "Tuyển tập những vụ án kinh điển của vị thám tử lừng danh Sherlock Holmes.", dateAdded: "2023-09-05", originalPrice: 500000, salesCount: 180 },
    { id: 6, title: "Đắc Nhân Tâm", author: "Dale Carnegie", price: 95000, image: "https://via.placeholder.com/150x220.png?text=Book+6", genre: "Kỹ năng", rating: 4.7, description: "Nghệ thuật giao tiếp và ứng xử để thành công trong cuộc sống.", dateAdded: "2023-12-01", originalPrice: 95000, salesCount: 600 },
    { id: 7, title: "Cuộc Phiêu Lưu Của Mèo Zorba", author: "Luis Sepúlveda", price: 70000, image: "https://via.placeholder.com/150x220.png?text=Book+7", genre: "Văn học", rating: 4.5, description: "Câu chuyện cảm động về tình bạn và lòng dũng cảm.", dateAdded: "2024-02-22", originalPrice: 70000, salesCount: 120 },
    { id: 8, title: "Nghìn Lẻ Một Đêm", author: "Nhiều tác giả", price: 320000, image: "https://via.placeholder.com/150x220.png?text=Book+8", genre: "Tiểu thuyết", rating: 4.6, description: "Tuyển tập những câu chuyện cổ tích hấp dẫn từ xứ Ba Tư.", dateAdded: "2024-04-18", originalPrice: 320000, salesCount: 95 },
    { id: 9, title: "Sách Lập Trình Python Nâng Cao", author: "Tác giả G", price: 350000, image: "https://via.placeholder.com/150x220.png?text=Book+9", genre: "Lập trình", rating: 4.8, description: "Đi sâu vào các khái niệm Python nâng cao...", dateAdded: "2025-03-20", originalPrice: 400000, salesCount: 150 },
    { id: 10, title: "Tiểu Thuyết Lãng Mạn Mới", author: "Tác giả H", price: 180000, image: "https://via.placeholder.com/150x220.png?text=Book+10", genre: "Lãng mạn", rating: 4.5, description: "Một câu chuyện tình yêu đầy cảm xúc...", dateAdded: "2025-04-01", originalPrice: 180000, salesCount: 210 },
    { id: 11, title: "Sapiens: Lược Sử Loài Người", author: "Yuval Noah Harari", price: 250000, image: "https://via.placeholder.com/150x220.png?text=Book+11", genre: "Lịch sử", rating: 4.9, description: "Khám phá hành trình phát triển của loài người từ thời tiền sử đến hiện đại.", dateAdded: "2024-06-10", originalPrice: 250000, salesCount: 450 },
    { id: 12, title: "Atomic Habits", author: "James Clear", price: 190000, image: "https://via.placeholder.com/150x220.png?text=Book+12", genre: "Kỹ năng", rating: 4.8, description: "Phương pháp xây dựng thói quen tốt và loại bỏ thói quen xấu hiệu quả.", dateAdded: "2024-07-05", originalPrice: 190000, salesCount: 550 },
    // Add more books here...
];
let cart = [];
let wishlist = [];
let currentUser = null; // Stores the username of the logged-in user
const itemsPerPage = 12; // Number of books per page
let currentPage = 1;
let currentFilteredBooks = [...allBooks]; // Holds the currently filtered/sorted list

// ======[ DOM ELEMENTS ]======
const bookListContainer = document.getElementById('book-list');
const paginationContainer = document.getElementById('pagination');
const cartCountElement = document.getElementById('cart-count');
const wishlistCountElement = document.getElementById('wishlist-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalElement = document.getElementById('cart-total');
const wishlistItemsContainer = document.getElementById('wishlist-items-container');
const genreFilterElement = document.getElementById('genreFilter');
const sortOptionsElement = document.getElementById('sortOptions');
const searchInputElement = document.getElementById('searchInput');
const searchForm = document.getElementById('search-form');
const loadingIndicator = document.getElementById('loading-indicator');
const bookCountDisplay = document.getElementById('book-count-display');
const clearCartBtn = document.getElementById('clear-cart-btn');
const checkoutBtn = document.getElementById('checkout-button'); // Use the correct ID from HTML
const toastContainer = document.querySelector('.toast-container');

// Auth elements
const userGreeting = document.getElementById('user-greeting');
const authButtons = document.getElementById('auth-buttons');
const logoutButton = document.getElementById('logout-button');
const loginModalElement = document.getElementById('loginModal');
const registerModalElement = document.getElementById('registerModal');
const loginModal = loginModalElement ? new bootstrap.Modal(loginModalElement) : null;
const registerModal = registerModalElement ? new bootstrap.Modal(registerModalElement) : null;
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const profileModalElement = document.getElementById('profileModal');
const profileModal = profileModalElement ? new bootstrap.Modal(profileModalElement) : null;


// Homepage section elements
const newestBooksContainer = document.getElementById('newest-books-container');
const bestSellersContainer = document.getElementById('best-sellers-container');
const dealsContainer = document.getElementById('deals-container');

// Book Detail Modal elements
const bookDetailModalElement = document.getElementById('bookDetailModal');
const bookDetailModal = bookDetailModalElement ? new bootstrap.Modal(bookDetailModalElement) : null;
const bookDetailTitle = document.getElementById('bookDetailTitle');
const bookDetailImage = document.getElementById('bookDetailImage');
const bookDetailAuthor = document.getElementById('bookDetailAuthor');
const bookDetailGenre = document.getElementById('bookDetailGenre');
const bookDetailDescription = document.getElementById('bookDetailDescription');
const bookDetailPrice = document.getElementById('bookDetailPrice');
const detailAddToCartBtn = document.getElementById('detail-add-to-cart-btn');
const detailWishlistBtn = document.getElementById('detail-wishlist-btn');
const detailMarkReadBtn = document.getElementById('detail-mark-read-btn');


// Review elements
const reviewForm = document.getElementById('review-form');
const reviewsList = document.getElementById('reviews-list');
const avgRatingElement = document.getElementById('average-rating');
const avgRatingStarsElement = document.getElementById('average-rating-stars');
const reviewFormContainer = document.getElementById('review-form-container');
const reviewLoginPrompt = document.getElementById('review-login-prompt');
const submitReviewBtn = document.getElementById('submit-review-btn');

// Order History elements
const orderHistoryContainer = document.getElementById('order-history-container');

// Reading Challenge elements
const readingChallengeContainer = document.getElementById('reading-challenge-container');

// Chatbot elements
const chatboxMessages = document.getElementById('chatbox-messages');
const chatboxInput = document.getElementById('chatbox-input');
const chatboxSendBtn = document.getElementById('chatbox-send-btn');
const typingIndicator = document.getElementById('typing-indicator');
const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn'); // Button to open/close chat


// ======[ LOCAL STORAGE KEYS ]======
const CART_KEY = 'bookStoreCart_v2'; // Use distinct keys
const WISHLIST_KEY = 'bookStoreWishlist_v2';
const USERS_KEY = 'bookStoreUsers_v2'; // Store simulated user data
const REVIEWS_KEY = 'bookStoreReviews_v2'; // Store product reviews
const ORDERS_KEY = 'bookStoreOrders_v2'; // Store order history
const CHALLENGE_KEY = 'bookStoreChallenge_v2'; // Store reading challenge data
const CURRENT_USER_KEY = 'bookStoreCurrentUser_v2'; // Store logged-in user


// ======[ INITIALIZATION ]======
document.addEventListener('DOMContentLoaded', () => {
    console.log("BookStore Advanced Initializing...");
    loadCart();
    loadWishlist();
    checkLoginStatus(); // Check login status first
    populateGenreFilter();
    setupEventListeners(); // Setup all listeners
    handleFilterAndSort(); // Initial display based on default filters/sort
    displayHomepageSections(); // Display dynamic homepage sections
    // Initial chat message (optional)
    setTimeout(() => addChatMessage(getRandomResponse(GREETINGS_RESPONSES), 'bot'), 1500);
    console.log("BookStore Ready!");
});

// ======[ HELPER FUNCTIONS ]======

// Safely get data from Local Storage
function getLocalStorageData(key, defaultValue = []) {
    try {
        const data = localStorage.getItem(key);
        // Check for null or 'undefined' string which might occur
        if (data === null || data === 'undefined') {
            return defaultValue;
        }
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading Local Storage (${key}):`, error);
        // Optionally clear corrupted data: localStorage.removeItem(key);
        return defaultValue;
    }
}

// Save data to Local Storage
function setLocalStorageData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving to Local Storage (${key}):`, error);
        showToast('Lỗi khi lưu dữ liệu cục bộ.', 'error');
    }
}

// Format currency (Vietnamese Dong)
function formatCurrency(amount) {
    if (typeof amount !== 'number') {
        amount = 0;
    }
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

// Render star ratings
function renderStars(rating) {
    const numRating = parseFloat(rating) || 0; // Ensure rating is a number
    const fullStars = Math.floor(numRating);
    const halfStar = numRating % 1 >= 0.4; // Threshold for half star
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    let starsHTML = '';
    starsHTML += '<i class="fas fa-star"></i>'.repeat(fullStars);
    if (halfStar) starsHTML += '<i class="fas fa-star-half-alt"></i>';
    starsHTML += '<i class="far fa-star"></i>'.repeat(emptyStars);
    // Ensure exactly 5 stars are always represented, even for 0 rating
     while (starsHTML.match(/<i class="fa[rs] fa-star.*?"/g)?.length < 5) {
         starsHTML += '<i class="far fa-star"></i>';
     }
    return starsHTML;
}

// Show Toast Notifications using Bootstrap 5 Toasts
function showToast(message, type = 'info') {
    if (!toastContainer) return;

    const toastId = 'toast-' + Date.now();
    const toastIcon = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    }[type];
    const toastHeaderClass = {
        success: 'bg-success text-white',
        error: 'bg-danger text-white',
        warning: 'bg-warning text-dark',
        info: 'bg-info text-dark' // Or text-white depending on contrast
    }[type];


    const toastHTML = `
        <div id="${toastId}" class="toast align-items-center ${type !== 'info' ? 'text-white' : ''} ${type === 'info' ? 'bg-light' : ''} border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
          <div class="toast-header ${toastHeaderClass}">
             <i class="fas <span class="math-inline">\{toastIcon\} me\-2"\></i\>
<strong class\="me\-auto"\></span>{type.charAt(0).toUpperCase() + type.slice(1)}</strong>
             <small>Bây giờ</small>
             <button type="button" class="btn-close ${type !== 'info' && type !== 'warning' ? 'btn-close-white' : ''}" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body ${type === 'info' ? 'text-dark' : ''}">
            ${message}
          </div>
        </div>
      `;

    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement);

    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove(); // Clean up DOM after toast hides
    });

    toast.show();
}

// ======[ AUTHENTICATION FUNCTIONS ]======

function handleRegistration(event) {
    event.preventDefault();
    const usernameInput = document.getElementById('register-username');
    const emailInput = document.getElementById('register-email');
    const passwordInput = document.getElementById('register-password');

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value; // NO HASHING - SIMULATION ONLY!

    if (!username || !password || !email) {
        showToast('Vui lòng điền đầy đủ thông tin đăng ký.', 'warning');
        return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        showToast('Vui lòng nhập địa chỉ email hợp lệ.', 'warning');
        return;
    }

    // Using an object for users for easier lookup by username
    let users = getLocalStorageData(USERS_KEY, {});

    if (users[username]) {
        showToast(`Tên đăng nhập "${username}" đã tồn tại. Vui lòng chọn tên khác.`, 'error');
        return;
    }
    // Check if email exists (optional but good practice)
     if (Object.values(users).some(user => user.email === email)) {
         showToast(`Địa chỉ email "${email}" đã được sử dụng.`, 'error');
         return;
     }


    // WARNING: Storing plain text passwords is a major security risk.
    // This is ONLY for client-side simulation purposes.
    users[username] = { password: password, email: email };
    setLocalStorageData(USERS_KEY, users);

    showToast('Đăng ký thành công! Giờ bạn có thể đăng nhập.', 'success');
    registerModal.hide();
    loginModal.show(); // Optionally open login modal after registration
    registerForm.reset(); // Clear the form
}

function handleLogin(event) {
    event.preventDefault();
    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
        showToast('Vui lòng nhập tên đăng nhập và mật khẩu.', 'warning');
        return;
    }

    const users = getLocalStorageData(USERS_KEY, {});
    const user = users[username];

    // WARNING: Plain text password comparison - ONLY for simulation.
    if (user && user.password === password) {
        currentUser = username; // Set the current user state
        localStorage.setItem(CURRENT_USER_KEY, currentUser); // Persist login state
        updateAuthUI(); // Update header/UI elements
        showToast(`Chào mừng trở lại, ${currentUser}!`, 'success');
        loginModal.hide();
        loginForm.reset();
        loadUserData(); // Load user-specific data (orders, challenge) after login
        // Close profile modal if it was open prompting login
         if (profileModalElement && profileModalElement.classList.contains('show')) {
             profileModal.hide();
         }
    } else {
        showToast('Tên đăng nhập hoặc mật khẩu không chính xác.', 'error');
    }
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem(CURRENT_USER_KEY);
    updateAuthUI();
    // Clear user-specific sections in modals if they are open or accessed later
    if (orderHistoryContainer) orderHistoryContainer.innerHTML = '<p class="text-muted">Vui lòng đăng nhập để xem lịch sử.</p>';
    if (readingChallengeContainer) readingChallengeContainer.innerHTML = '<p class="text-muted">Vui lòng đăng nhập để tham gia thử thách.</p>';
    // Clear profile info display
    const profileUsername = document.getElementById('profile-username');
    const profileEmail = document.getElementById('profile-email');
    if (profileUsername) profileUsername.textContent = 'N/A';
    if (profileEmail) profileEmail.textContent = 'N/A';

    showToast('Bạn đã đăng xuất thành công.', 'info');
}

function checkLoginStatus() {
    const loggedInUser = localStorage.getItem(CURRENT_USER_KEY);
    if (loggedInUser) {
        // Verify if the user still exists in our simulated user database
        const users = getLocalStorageData(USERS_KEY, {});
        if (users[loggedInUser]) {
            currentUser = loggedInUser;
        } else {
            // If user in localStorage doesn't exist in users list, log them out
            console.warn(`User "${loggedInUser}" found in localStorage but not in user database. Logging out.`);
            localStorage.removeItem(CURRENT_USER_KEY); // Clean up invalid state
            currentUser = null;
        }
    } else {
        currentUser = null;
    }
    updateAuthUI(); // Update UI based on final currentUser state
    if(currentUser) {
        loadUserData(); // Load data if user is confirmed logged in on page load
    }
}

function updateAuthUI() {
    const userDisplay = document.getElementById('username-display');
    const profileUsername = document.getElementById('profile-username');
    const profileEmail = document.getElementById('profile-email');
    const users = getLocalStorageData(USERS_KEY, {}); // Get user data for email display

    if (currentUser && users[currentUser]) { // User is logged in and exists
        authButtons.classList.add('d-none'); // Hide Login/Register buttons
        userGreeting.classList.remove('d-none'); // Show greeting and logout
        if (userDisplay) userDisplay.textContent = currentUser;

        // Update profile modal info (if elements exist)
        if (profileUsername) profileUsername.textContent = currentUser;
        if (profileEmail) profileEmail.textContent = users[currentUser].email || 'Không có';

    } else { // User is not logged in or invalid
        authButtons.classList.remove('d-none'); // Show Login/Register buttons
        userGreeting.classList.add('d-none'); // Hide greeting and logout
        // Clear profile modal info
        if (profileUsername) profileUsername.textContent = 'N/A';
        if (profileEmail) profileEmail.textContent = 'N/A';
    }
    // Update counts regardless of login status
    updateCartCount();
    updateWishlistCount();
}

// Load user-specific data (call after login or on page load if logged in)
function loadUserData() {
    if (!currentUser) return;
    displayOrderHistory();
    displayReadingChallenge();
}


// ======[ BOOK DISPLAY & FILTER/SORT FUNCTIONS ]======

// Populate the genre filter dropdown
function populateGenreFilter() {
    if (!genreFilterElement) return;
    const genres = [...new Set(allBooks.map(book => book.genre))].sort(); // Get unique genres
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilterElement.appendChild(option);
    });
}

// Main function to handle filtering and sorting, then display books
function handleFilterAndSort() {
    const searchTerm = searchInputElement ? searchInputElement.value.toLowerCase() : '';
    const selectedGenre = genreFilterElement ? genreFilterElement.value : '';
    const selectedSort = sortOptionsElement ? sortOptionsElement.value : 'default';

    // Start with all books
    let filtered = [...allBooks];

    // 1. Filter by Search Term (Title or Author)
    if (searchTerm) {
        filtered = filtered.filter(book =>
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm)
        );
    }

    // 2. Filter by Genre
    if (selectedGenre) {
        filtered = filtered.filter(book => book.genre === selectedGenre);
    }

     // Store the filtered result before sorting for potential reuse
     currentFilteredBooks = [...filtered];


    // 3. Sort the filtered results
    switch (selectedSort) {
        case 'priceAsc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'priceDesc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'ratingDesc':
            // Sort by rating, secondary sort by salesCount (optional)
            filtered.sort((a, b) => {
                 const ratingDiff = (b.rating || 0) - (a.rating || 0);
                 if (ratingDiff !== 0) return ratingDiff;
                 return (b.salesCount || 0) - (a.salesCount || 0); // Higher sales first if rating is same
             });
            break;
        case 'nameAsc':
            filtered.sort((a, b) => a.title.localeCompare(b.title, 'vi'));
            break;
        case 'nameDesc':
             filtered.sort((a, b) => b.title.localeCompare(a.title, 'vi'));
            break;
         case 'newest':
             // Ensure dateAdded exists and is valid, treat missing/invalid as oldest
             filtered.sort((a, b) => {
                const dateA = a.dateAdded ? new Date(a.dateAdded) : new Date(0);
                const dateB = b.dateAdded ? new Date(b.dateAdded) : new Date(0);
                // Handle invalid dates safely
                const timeA = isNaN(dateA.getTime()) ? 0 : dateA.getTime();
                const timeB = isNaN(dateB.getTime()) ? 0 : dateB.getTime();
                return timeB - timeA; // Newest first
             });
            break;
        // Default case (no specific sort or 'default' selected) - could maintain original order or sort by ID/relevance
         case 'default':
             // Optional: sort by ID or leave as is after filtering
             // filtered.sort((a, b) => a.id - b.id);
            break;
    }

     // Reset to page 1 when filters/sort change
    currentPage = 1;
    displayBooks(filtered); // Display the final filtered and sorted list
    setupPagination(filtered.length); // Setup pagination for the result set
}


// Create HTML for a single book card
function createBookCard(book) {
    if (!book) return null; // Handle cases where book data might be missing

    const col = document.createElement('div');
    // Responsive column classes & add wrapper class for potential targeting
    col.className = 'col-xl-3 col-lg-4 col-md-6 mb-4 book-card-wrapper reveal-on-scroll';
     col.dataset.bookId = book.id; // Add data attribute for easier selection


    const card = document.createElement('div');
    // Use h-100 for equal height cards in a row
    card.className = 'card h-100 book-card shadow-sm border-0 overflow-hidden'; // Added overflow-hidden

    // Image Link
    const imgLink = document.createElement('a');
    imgLink.href = "#"; // Prevent default link behavior
    imgLink.className = "text-decoration-none";
    imgLink.onclick = (e) => {
        e.preventDefault();
        displayBookDetails(book.id); // Open modal on image/title click
    };

    const img = document.createElement('img');
    // Use a placeholder if image URL is missing/invalid
    img.src = book.image && book.image.trim() !== '' ? book.image : 'https://via.placeholder.com/150x220.png?text=No+Image';
    img.className = 'card-img-top book-image';
    img.alt = `Bìa sách ${book.title}`;
    img.onerror = () => { img.src = 'https://via.placeholder.com/150x220.png?text=Image+Error'; }; // Handle image loading errors
    imgLink.appendChild(img);

    // Card Body
    const cardBody = document.createElement('div');
    // Use flex column to push footer elements down if content varies
    cardBody.className = 'card-body d-flex flex-column p-3';

    // Title
    const title = document.createElement('h5');
    title.className = 'card-title book-title mb-1'; // Reduced bottom margin
    // Wrap title text in the link as well
    const titleLink = document.createElement('a');
    titleLink.href = "#";
    titleLink.textContent = book.title || 'Không có tiêu đề';
    titleLink.className = 'text-decoration-none text-dark stretched-link'; // Stretched link makes the whole card clickable
     titleLink.onclick = (e) => {
        e.preventDefault();
        displayBookDetails(book.id);
    };
    title.appendChild(titleLink);


    // Author
    const author = document.createElement('p');
    author.className = 'card-text text-muted book-author small mb-2'; // Smaller text
    author.textContent = `Tác giả: ${book.author || 'N/A'}`;

    // Rating
    const ratingContainer = document.createElement('div');
    ratingContainer.className = 'book-rating mb-2';
    // Display stars and numerical rating
    ratingContainer.innerHTML = renderStars(book.rating) + ` <small class="text-muted ms-1">(${(book.rating || 0).toFixed(1)})</small>`;

    // Price - Use mt-auto to push to bottom of flex column
    const price = document.createElement('p');
    price.className = 'card-text book-price fw-bold mt-auto mb-0'; // Pushed to bottom, no bottom margin
    if (book.originalPrice && book.price < book.originalPrice) {
        price.innerHTML = `<span class="text-danger me-2"><span class="math-inline">\{formatCurrency\(book\.price\)\}</span\> <del class\="text\-muted small fw\-normal"\></span>{formatCurrency(book.originalPrice)}</del>`;
    } else {
        price.textContent = formatCurrency(book.price);
    }

    // Assemble Card Body
    cardBody.appendChild(title);
    cardBody.appendChild(author);
    cardBody.appendChild(ratingContainer);
    cardBody.appendChild(price); // Price is last, pushed down by mt-auto

    // Card Footer - Actions
    const cardFooter = document.createElement('div');
    // Use padding instead of relying on Bootstrap's card-footer default padding if needed
    cardFooter.className = 'card-footer bg-transparent border-top-0 pt-2 pb-3 px-3 d-flex justify-content-between align-items-center';

    // Add to Cart Button
    const addToCartBtn = document.createElement('button');
    addToCartBtn.className = 'btn btn-sm btn-primary add-to-cart-btn';
    addToCartBtn.innerHTML = '<i class="fas fa-cart-plus me-1"></i> Thêm';
    addToCartBtn.title = "Thêm vào giỏ hàng";
    // Prevent click event from bubbling up to the stretched link
    addToCartBtn.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault(); // Double ensure link isn't followed
        addToCart(book.id);
    };

    // Wishlist Button
    const wishlistBtn = document.createElement('button');
    const isWished = wishlist.some(item => item.id === book.id);
    wishlistBtn.className = `btn btn-sm btn-outline-danger wishlist-btn ${isWished ? 'active' : ''}`;
    wishlistBtn.innerHTML = `<i class="${isWished ? 'fas' : 'far'} fa-heart"></i>`; // Icon changes based on state
    wishlistBtn.title = isWished ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích";
    wishlistBtn.setAttribute('aria-pressed', isWished);
    wishlistBtn.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleWishlist(book.id, wishlistBtn); // Pass the button element to update its state directly
    };

    // Assemble Footer
    cardFooter.appendChild(addToCartBtn);
    cardFooter.appendChild(wishlistBtn);

    // Assemble Card
    card.appendChild(imgLink); // Image link first
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    col.appendChild(card);

    return col;
}


// Display books on the page with pagination
function displayBooks(booksToDisplay) {
    if (!bookListContainer) return;

    bookListContainer.innerHTML = ''; // Clear previous books
    loadingIndicator.classList.add('d-none'); // Hide loading indicator

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBooks = booksToDisplay.slice(startIndex, endIndex);

    if (paginatedBooks.length === 0) {
        bookListContainer.innerHTML = '<p class="text-center text-muted mt-5">Không tìm thấy sách nào phù hợp.</p>';
        if (bookCountDisplay) bookCountDisplay.textContent = 'Hiển thị 0 sách';
    } else {
        paginatedBooks.forEach(book => {
            const bookCard = createBookCard(book);
            if (bookCard) { // Ensure card was created successfully
                bookListContainer.appendChild(bookCard);
            }
        });
        // Update book count display
         if (bookCountDisplay) bookCountDisplay.textContent = `Hiển thị ${paginatedBooks.length} của ${booksToDisplay.length} sách`;
        // Apply scroll animations after rendering
        observeScrollElements();
    }
}

// Setup pagination links
function setupPagination(totalItems) {
    if (!paginationContainer) return;
    paginationContainer.innerHTML = ''; // Clear existing pagination

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return; // No pagination needed for 1 or 0 pages

    // Previous Button
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `<a class="page-link" href="#" aria-label="Previous" data-page="${currentPage - 1}"><span aria-hidden="true">&laquo;</span></a>`;
    paginationContainer.appendChild(prevLi);

    // Page Number Buttons (simplified for brevity, consider adding ellipsis for many pages)
     const maxPagesToShow = 5; // Max number of page links shown
     let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
     let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      // Adjust startPage if endPage reaches the limit first
      startPage = Math.max(1, endPage - maxPagesToShow + 1);

     if (startPage > 1) {
         const firstLi = document.createElement('li');
         firstLi.className = 'page-item';
         firstLi.innerHTML = `<a class="page-link" href="#" data-page="1">1</a>`;
         paginationContainer.appendChild(firstLi);
         if (startPage > 2) {
            const ellipsisLi = document.createElement('li');
            ellipsisLi.className = 'page-item disabled';
            ellipsisLi.innerHTML = `<span class="page-link">...</span>`;
             paginationContainer.appendChild(ellipsisLi);
         }
     }


    for (let i = startPage; i <= endPage; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" data-page="<span class="math-inline">\{i\}"\></span>{i}</a>`;
        paginationContainer.appendChild(li);
    }

     if (endPage < totalPages) {
          if (endPage < totalPages - 1) {
            const ellipsisLi = document.createElement('li');
            ellipsisLi.className = 'page-item disabled';
            ellipsisLi.innerHTML = `<span class="page-link">...</span>`;
             paginationContainer.appendChild(ellipsisLi);
         }
         const lastLi = document.createElement('li');
         lastLi.className = 'page-item';
         lastLi.innerHTML = `<a class="page-link" href="#" data-page="<span class="math-inline">\{totalPages\}"\></span>{totalPages}</a>`;
         paginationContainer.appendChild(lastLi);
     }


    // Next Button
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="page-link" href="#" aria-label="Next" data-page="${currentPage + 1}"><span aria-hidden="true">&raquo;</span></a>`;
    paginationContainer.appendChild(nextLi);

    // Add event listeners to new pagination links
    paginationContainer.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = parseInt(e.target.closest('.page-link').dataset.page);
             if (page && page !== currentPage && !e.target.closest('.page-item').classList.contains('disabled')) {
                 currentPage = page;
                 displayBooks(currentFilteredBooks); // Display books for the new page using the currently filtered list
                 setupPagination(currentFilteredBooks.length); // Update pagination UI
                 // Scroll to top of book list smoothly
                 document.getElementById('book-list-section')?.scrollIntoView({ behavior: 'smooth' });
             }
        });
    });
}


// ======[ HOMEPAGE SECTIONS FUNCTIONS ]======

function displayHomepageSections() {
    // Use setTimeout to avoid potential race conditions with DOM readiness
    // and to simulate loading delay slightly if desired
    setTimeout(() => {
        displayNewestBooks();
        displayBestSellers();
        displayDeals();
    }, 100); // Short delay
}

function renderSectionBooks(container, books, skeletonCount = 4) {
     if (!container) return;

     container.innerHTML = ''; // Clear existing content or skeletons

     if (!books || books.length === 0) {
         // Find the section title to provide context
         const titleElement = container.closest('section')?.querySelector('h2');
         const sectionTitle = titleElement ? `"${titleElement.textContent}"` : "này";
         container.innerHTML = `<p class="text-center text-muted col-12">Hiện chưa có sách nào cho mục ${sectionTitle}.</p>`;
         return;
     }

     books.forEach(book => {
         const bookCard = createBookCard(book);
         if (bookCard) {
              container.appendChild(bookCard);
         }
     });
     observeScrollElements(); // Apply scroll animations
}


function displayNewestBooks(count = 4) {
    // Sort by dateAdded descending. Handle invalid/missing dates.
    const sortedBooks = [...allBooks].sort((a, b) => {
         const dateA = a.dateAdded ? new Date(a.dateAdded) : new Date(0);
         const dateB = b.dateAdded ? new Date(b.dateAdded) : new Date(0);
         const timeA = isNaN(dateA.getTime()) ? 0 : dateA.getTime();
         const timeB = isNaN(dateB.getTime()) ? 0 : dateB.getTime();
         return timeB - timeA;
    });
    const newest = sortedBooks.slice(0, count);
    renderSectionBooks(newestBooksContainer, newest, count);
}

function displayBestSellers(count = 4) {
    // Sort by rating descending, then salesCount descending
    const sortedBooks = [...allBooks].sort((a, b) => {
         const ratingDiff = (b.rating || 0) - (a.rating || 0);
         if (ratingDiff !== 0) return ratingDiff;
         return (b.salesCount || 0) - (a.salesCount || 0);
    });
    const bestSellers = sortedBooks.slice(0, count);
    renderSectionBooks(bestSellersContainer, bestSellers, count);
}

function displayDeals(count = 4) {
    // Filter for books on sale (price < originalPrice)
    const dealBooks = allBooks.filter(book => book.originalPrice && book.price < book.originalPrice)
                           // Optional: Sort by discount amount or percentage
                           .sort((a, b) => (b.originalPrice - b.price) - (a.originalPrice - a.price)) // Sort by absolute discount amount
                           .slice(0, count);
     renderSectionBooks(dealsContainer, dealBooks, count);
}


// ======[ CART FUNCTIONS ]======

function loadCart() {
    cart = getLocalStorageData(CART_KEY, []);
    updateCartCount();
    displayCart(); // Update cart modal view
}

function saveCart() {
    setLocalStorageData(CART_KEY, cart);
    updateCartCount();
    displayCart();
}

function addToCart(bookId, quantity = 1) {
    const book = allBooks.find(b => b.id === bookId);
    if (!book) {
        showToast("Lỗi: Không tìm thấy sách để thêm vào giỏ.", "error");
        return;
    }

    const existingItemIndex = cart.findIndex(item => item.id === bookId);

    if (existingItemIndex > -1) {
        // Increase quantity if item already exists
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({
            id: book.id,
            title: book.title,
            price: book.price,
            image: book.image,
            quantity: quantity
        });
    }

    saveCart();
    showToast(`Đã thêm "${book.title}" vào giỏ hàng!`, 'success');
     // Optional: Animate cart icon briefly
     const cartIcon = cartBtnHeader.querySelector('i');
     if (cartIcon) {
         cartIcon.classList.add('fa-bounce');
         setTimeout(() => cartIcon.classList.remove('fa-bounce'), 1000);
     }
}

function updateCartQuantity(bookId, newQuantity) {
    const itemIndex = cart.findIndex(item => item.id === bookId);
    if (itemIndex > -1) {
        if (newQuantity > 0) {
            cart[itemIndex].quantity = newQuantity;
        } else {
            // Remove item if quantity is 0 or less
            cart.splice(itemIndex, 1);
        }
        saveCart();
    }
}

function removeFromCart(bookId) {
    const itemIndex = cart.findIndex(item => item.id === bookId);
    if (itemIndex > -1) {
        const removedItem = cart.splice(itemIndex, 1)[0];
        saveCart();
        showToast(`Đã xóa "${removedItem.title}" khỏi giỏ hàng.`, 'info');
    }
}

function clearCart() {
     if (cart.length === 0) {
         showToast("Giỏ hàng đã trống.", "info");
         return;
     }
     // Confirmation dialog
     if (confirm("Bạn có chắc muốn xóa tất cả sản phẩm khỏi giỏ hàng?")) {
        cart = [];
        saveCart();
        showToast("Đã xóa hết sản phẩm trong giỏ hàng.", "success");
     }
}


function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartCount() {
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
         // Show/hide badge based on count
         cartCountElement.classList.toggle('d-none', totalItems === 0);

    }
}

function displayCart() {
    if (!cartItemsContainer || !cartTotalElement) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center text-muted">Giỏ hàng của bạn đang trống.</p>';
        cartTotalElement.textContent = formatCurrency(0);
        if (clearCartBtn) clearCartBtn.disabled = true;
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }

    cartItemsContainer.innerHTML = ''; // Clear previous items
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="<span class="math-inline">\{item\.image \|\| 'https\://via\.placeholder\.com/60x80\.png?text\=N/A'\}" alt\="</span>{item.title}" class="cart-item-img">
            <div class="cart-item-details">
                <div class="cart-item-title"><span class="math-inline">\{item\.title\}</div\>
<div class\="cart\-item\-price"\></span>{formatCurrency(item.price)}</div>
            </div>
            <div class="cart-item-quantity d-flex align-items-center">
                <button class="btn btn-sm btn-outline-secondary quantity-decrease" data-id="<span class="math-inline">\{item\.id\}"\>\-</button\>
<input type\="number" class\="form\-control form\-control\-sm mx\-2 quantity\-input" value\="</span>{item.quantity}" min="1" data-id="<span class="math-inline">\{item\.id\}"\>
<button class\="btn btn\-sm btn\-outline\-secondary quantity\-increase" data\-id\="</span>{item.id}">+</button>
            </div>
            <button class="btn btn-sm btn-outline-danger ms-3 remove-from-cart-btn" data-id="${item.id}" title="Xóa sản phẩm">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    cartTotalElement.textContent = formatCurrency(calculateCartTotal());
     if (clearCartBtn) clearCartBtn.disabled = false;
     if (checkoutBtn) checkoutBtn.disabled = false;


    // Add event listeners for quantity changes and removal
    cartItemsContainer.querySelectorAll('.quantity-decrease').forEach(btn => {
        btn.onclick = () => {
            const id = parseInt(btn.dataset.id);
            const currentItem = cart.find(i => i.id === id);
            if (currentItem && currentItem.quantity > 1) {
                updateCartQuantity(id, currentItem.quantity - 1);
            } else {
                 // Optional: Ask for confirmation before removing last item?
                 removeFromCart(id);
            }
        };
    });

    cartItemsContainer.querySelectorAll('.quantity-increase').forEach(btn => {
        btn.onclick = () => {
            const id = parseInt(btn.dataset.id);
            const currentItem = cart.find(i => i.id === id);
            if(currentItem) {
                 updateCartQuantity(id, currentItem.quantity + 1);
            }
        };
    });

    cartItemsContainer.querySelectorAll('.quantity-input').forEach(input => {
        input.onchange = () => {
            const id = parseInt(input.dataset.id);
            let newQuantity = parseInt(input.value);
             if (isNaN(newQuantity) || newQuantity < 1) {
                 newQuantity = 1; // Default to 1 if input is invalid
                 input.value = 1; // Correct the input visually
             }
            updateCartQuantity(id, newQuantity);
        };
    });

    cartItemsContainer.querySelectorAll('.remove-from-cart-btn').forEach(btn => {
        btn.onclick = () => {
            const id = parseInt(btn.dataset.id);
            removeFromCart(id);
        };
    });
}


// ======[ WISHLIST FUNCTIONS ]======

function loadWishlist() {
    wishlist = getLocalStorageData(WISHLIST_KEY, []);
    updateWishlistCount();
    displayWishlist(); // Update wishlist modal view
}

function saveWishlist() {
    setLocalStorageData(WISHLIST_KEY, wishlist);
    updateWishlistCount();
    displayWishlist();
}

function toggleWishlist(bookId, buttonElement = null) {
    const bookIndex = wishlist.findIndex(item => item.id === bookId);
    const book = allBooks.find(b => b.id === bookId);
    if (!book) return;

    let actionCompleted = false; // Flag to track if action was performed

    if (bookIndex === -1) {
        // Add to wishlist
        wishlist.push({ id: book.id, title: book.title, price: book.price, image: book.image });
        if (buttonElement) {
            buttonElement.classList.add('active');
            buttonElement.innerHTML = '<i class="fas fa-heart"></i>';
            buttonElement.setAttribute('aria-pressed', 'true');
             buttonElement.title = "Xóa khỏi yêu thích";
        }
        showToast(`Đã thêm "${book.title}" vào Yêu thích!`, 'success');
        actionCompleted = true;
    } else {
        // Remove from wishlist
        const removedBook = wishlist.splice(bookIndex, 1)[0];
        if (buttonElement) {
            buttonElement.classList.remove('active');
            buttonElement.innerHTML = '<i class="far fa-heart"></i>';
            buttonElement.setAttribute('aria-pressed', 'false');
            buttonElement.title = "Thêm vào yêu thích";
        }
        showToast(`Đã xóa "${removedBook.title}" khỏi Yêu thích.`, 'info');
        actionCompleted = true;
    }

    if (actionCompleted) {
        saveWishlist(); // Save changes and update display
        // Update the corresponding button in the detail modal if it's open and visible
        if (bookDetailModalElement && bookDetailModalElement.classList.contains('show')) {
             updateDetailModalWishlistButtonState(bookId);
        }
        // Update button on the main card if it exists
         const mainCardButton = document.querySelector(`.book-card-wrapper[data-book-id="${bookId}"] .wishlist-btn`);
         if (mainCardButton && mainCardButton !== buttonElement) { // Check it's not the same button
            const isWishedNow = wishlist.some(item => item.id === bookId);
             mainCardButton.classList.toggle('active', isWishedNow);
             mainCardButton.innerHTML = `<i class="${isWishedNow ? 'fas' : 'far'} fa-heart"></i>`;
             mainCardButton.setAttribute('aria-pressed', isWishedNow);
             mainCardButton.title = isWishedNow ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích";
         }
    }
}


function updateWishlistCount() {
    if (wishlistCountElement) {
        const count = wishlist.length;
        wishlistCountElement.textContent = count;
        wishlistCountElement.classList.toggle('d-none', count === 0);
    }
}

function displayWishlist() {
    if (!wishlistItemsContainer) return;

    if (wishlist.length === 0) {
        wishlistItemsContainer.innerHTML = '<p class="text-center text-muted">Danh sách yêu thích của bạn đang trống.</p>';
        return;
    }

    wishlistItemsContainer.innerHTML = ''; // Clear previous items
    wishlist.forEach(item => {
        const book = allBooks.find(b => b.id === item.id); // Get full book details if needed
        if (!book) return; // Skip if book somehow removed from allBooks

        const itemElement = document.createElement('div');
        itemElement.className = 'wishlist-item d-flex align-items-center border-bottom pb-3 mb-3';
        itemElement.innerHTML = `
            <img src="<span class="math-inline">\{item\.image \|\| 'https\://via\.placeholder\.com/60x80\.png?text\=N/A'\}" alt\="</span>{item.title}" class="wishlist-item-img me-3 rounded">
            <div class="wishlist-item-details flex-grow-1">
                <div class="wishlist-item-title fw-bold"><span class="math-inline">\{item\.title\}</div\>
<div class\="wishlist\-item\-price text\-danger"\></span>{formatCurrency(item.price)}</div>
                 <small class="text-muted">Tác giả: <span class="math-inline">\{book\.author\}</small\>
</div\>
<div class\="wishlist\-item\-actions ms\-3"\>
<button class\="btn btn\-sm btn\-primary wishlist\-add\-cart\-btn" data\-id\="</span>{item.id}" title="Thêm vào giỏ hàng">
                     <i class="fas fa-cart-plus"></i>
                 </button>
                 <button class="btn btn-sm btn-outline-danger wishlist-remove-btn ms-2" data-id="${item.id}" title="Xóa khỏi yêu thích">
                     <i class="fas fa-trash-alt"></i>
                 </button>
            </div>
        `;
        wishlistItemsContainer.appendChild(itemElement);
    });

    // Add event listeners for buttons within the wishlist modal
    wishlistItemsContainer.querySelectorAll('.wishlist-add-cart-btn').forEach(btn => {
        btn.onclick = () => {
            const id = parseInt(btn.dataset.id);
            addToCart(id);
            // Optional: Remove from wishlist after adding to cart? Or just provide feedback.
            // toggleWishlist(id); // Uncomment to remove from wishlist after adding to cart
        };
    });

    wishlistItemsContainer.querySelectorAll('.wishlist-remove-btn').forEach(btn => {
        btn.onclick = () => {
            const id = parseInt(btn.dataset.id);
            toggleWishlist(id); // This will handle removal and UI update
        };
    });
}

// Updates the state (visuals, text, aria-pressed) of the wishlist button in the detail modal
function updateDetailModalWishlistButtonState(bookId) {
    const btn = detailWishlistBtn; // Use the globally scoped element
    if (!btn) return;
    const isWished = wishlist.some(item => item.id === bookId);
    btn.classList.toggle('active', isWished);
    btn.innerHTML = `<i class="${isWished ? 'fas' : 'far'} fa-heart me-1"></i> ${isWished ? 'Đã thích' : 'Yêu thích'}`;
    btn.setAttribute('aria-pressed', isWished);
    btn.title = isWished ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích";
}


// ======[ BOOK DETAIL MODAL FUNCTIONS ]======

function displayBookDetails(bookId) {
    const book = allBooks.find(b => b.id === bookId);
    if (!book || !bookDetailModal) {
        console.error("Cannot find book or detail modal element.");
        showToast("Lỗi khi hiển thị chi tiết sách.", "error");
        return;
    }

    // Populate basic info
    bookDetailTitle.textContent = book.title; // Set modal title directly
    bookDetailImage.src = book.image || 'https://via.placeholder.com/150x220.png?text=No+Image';
    bookDetailImage.alt = `Bìa sách ${book.title}`;
    bookDetailAuthor.textContent = book.author || 'N/A';
    bookDetailGenre.textContent = book.genre || 'N/A';
    bookDetailDescription.textContent = book.description || "Chưa có mô tả cho cuốn sách này.";

    // Populate Price (handling discounts)
    if (book.originalPrice && book.price < book.originalPrice) {
        bookDetailPrice.innerHTML = `<strong class="text-danger me-2 fs-4"><span class="math-inline">\{formatCurrency\(book\.price\)\}</strong\> <del class\="text\-muted"\></span>{formatCurrency(book.originalPrice)}</del> <span class="badge bg-danger ms-2">${Math.round((1 - book.price / book.originalPrice) * 100)}% OFF</span>`;
    } else {
        bookDetailPrice.innerHTML = `<strong class="fs-4">${formatCurrency(book.price)}</strong>`;
    }

    // Update Add to Cart button functionality
    if (detailAddToCartBtn) {
        detailAddToCartBtn.onclick = () => {
            addToCart(book.id);
            // Maybe provide feedback within the modal or close it
            // showToast(`Đã thêm "${book.title}" vào giỏ.`, 'success'); // Or use a more integrated feedback
        };
    }

    // Update Wishlist button state and functionality
    if (detailWishlistBtn) {
        updateDetailModalWishlistButtonState(book.id); // Set initial state
        // Assign the toggle function directly
        detailWishlistBtn.onclick = () => {
            toggleWishlist(book.id, detailWishlistBtn); // Pass the button itself
        };
    }

     // Update "Mark as Read" button functionality
     if (detailMarkReadBtn) {
          detailMarkReadBtn.onclick = () => {
              markBookAsReadForChallenge(book.id);
              // Optional: Visually disable or change text after marking
              detailMarkReadBtn.disabled = true;
              detailMarkReadBtn.textContent = 'Đã đánh dấu';
          };
           // Reset button state when modal opens
           const challengeData = getChallengeData(); // Need challenge data to check if already read
           const isRead = challengeData.completed.includes(bookId);
            detailMarkReadBtn.disabled = isRead;
            detailMarkReadBtn.innerHTML = isRead ? '<i class="fas fa-check-double me-1"></i> Đã đọc' : '<i class="fas fa-check-circle me-1"></i> Đánh dấu Đã đọc';

     }

    // Display Reviews for this book
    displayBookReviews(bookId);

    // Finally, show the modal
    bookDetailModal.show();
}

// ======[ PRODUCT REVIEW FUNCTIONS ]======

// Get all reviews from Local Storage { bookId1: [review1, ...], bookId2: [...] }
function getAllReviews() {
    return getLocalStorageData(REVIEWS_KEY, {});
}

// Save all reviews back to Local Storage
function saveAllReviews(reviewsData) {
    setLocalStorageData(REVIEWS_KEY, reviewsData);
}

// Display reviews and average rating for a specific book
function displayBookReviews(bookId) {
    // Ensure all required elements exist
    if (!reviewsList || !avgRatingElement || !avgRatingStarsElement || !reviewFormContainer || !reviewForm || !reviewLoginPrompt || !submitReviewBtn) {
        console.error("One or more review elements are missing in the DOM.");
        return;
    }

    const allReviewsData = getAllReviews();
    const bookReviews = allReviewsData[bookId] || [];

    // Set the bookId on the form for submission handling
    reviewForm.dataset.bookId = bookId;

    // Handle display based on login status and if user has already reviewed
    if (currentUser) {
        reviewFormContainer.classList.remove('d-none');
        reviewLoginPrompt.classList.add('d-none');
        reviewForm.reset(); // Reset form fields
        // Reset star selection visually
         document.querySelectorAll('#review-form input[name="rating"]').forEach(radio => radio.checked = false);

        const userHasReviewed = bookReviews.some(review => review.user === currentUser);
        submitReviewBtn.disabled = userHasReviewed;
        submitReviewBtn.textContent = userHasReviewed ? 'Bạn đã đánh giá' : 'Gửi đánh giá';
    } else {
        reviewFormContainer.classList.add('d-none'); // Hide form
        reviewLoginPrompt.classList.remove('d-none'); // Show login prompt
    }

    // Display existing reviews
    if (bookReviews.length === 0) {
        reviewsList.innerHTML = '<p class="text-center text-muted fst-italic">Chưa có đánh giá nào cho sản phẩm này.</p>';
        avgRatingElement.textContent = 'Chưa có đánh giá';
        avgRatingStarsElement.innerHTML = renderStars(0); // Show empty stars
        updateBookAverageRating(bookId, 0, 0); // Update global book rating
    } else {
        let totalRating = 0;
        reviewsList.innerHTML = ''; // Clear list

        // Sort reviews newest first (optional)
         bookReviews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));


        bookReviews.forEach(review => {
            totalRating += review.rating;
            const reviewElement = document.createElement('div');
            reviewElement.className = 'border-bottom pb-2 mb-2';
            const reviewDate = new Date(review.timestamp);
            const formattedDate = reviewDate.toLocaleDateString('vi-VN') + ' ' + reviewDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

            reviewElement.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <strong class="text-primary"><span class="math-inline">\{review\.user \|\| 'Ẩn danh'\}</strong\>
<small class\="text\-muted"\></span>{formattedDate}</small>
                </div>
                <div class="mb-1"><span class="math-inline">\{renderStars\(review\.rating\)\}</div\>
<p class\="mb\-0 small"\></span>{review.comment || ''}</p> {/* Ensure comment exists */}
            `;
            reviewsList.appendChild(reviewElement);
        });

        const averageRating = totalRating / bookReviews.length;
        avgRatingElement.textContent = `<span class="math-inline">\{averageRating\.toFixed\(1\)\}/5 \(</span>{bookReviews.length} đánh giá)`;
        avgRatingStarsElement.innerHTML = renderStars(averageRating);
        updateBookAverageRating(bookId, averageRating, bookReviews.length); // Update global book rating
    }
}

// Update the average rating directly on the book object in allBooks array
function updateBookAverageRating(bookId, avgRating, reviewCount) {
    const bookIndex = allBooks.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        const newRating = parseFloat(avgRating.toFixed(1));
        if (allBooks[bookIndex].rating !== newRating) { // Only update if changed
             allBooks[bookIndex].rating = newRating;
             allBooks[bookIndex].reviewCount = reviewCount; // Optional: store review count
             // console.log(`Updated rating for book ${bookId} to ${newRating}`);

             // Dynamically update the rating on the main book card if it's visible
             const bookCardWrapper = document.querySelector(`.book-card-wrapper[data-book-id="${bookId}"]`);
             if (bookCardWrapper) {
                 const ratingElement = bookCardWrapper.querySelector('.book-rating');
                 if (ratingElement) {
                      ratingElement.innerHTML = renderStars(newRating) + ` <small class="text-muted ms-1">(${newRating.toFixed(1)})</small>`;
                 }
                 // Re-sort homepage sections if the rating change affects them
                  displayBestSellers(); // Re-render best sellers in case rating change alters the list
             }
        }
    }
}


// Handle the submission of the review form
function handleReviewSubmission(event) {
    event.preventDefault();
    if (!currentUser) {
        showToast('Vui lòng đăng nhập để gửi đánh giá.', 'warning');
        // Optionally, trigger the login modal
        // if (bookDetailModal) bookDetailModal.hide(); // Hide current modal first
        // if (loginModal) loginModal.show();
        return;
    }

    const bookId = parseInt(event.target.dataset.bookId);
    const ratingInput = event.target.querySelector('input[name="rating"]:checked');
    const commentInput = document.getElementById('review-comment');
    const comment = commentInput.value.trim();

    if (!ratingInput) {
        showToast('Vui lòng chọn số sao đánh giá.', 'warning');
        return;
    }
    if (!comment) {
        showToast('Vui lòng nhập nội dung bình luận.', 'warning');
        commentInput.focus(); // Focus the comment field
        return;
    }

    const rating = parseInt(ratingInput.value);

    const newReview = {
        user: currentUser,
        rating: rating,
        comment: comment,
        timestamp: new Date().toISOString() // Store timestamp
    };

    const allReviewsData = getAllReviews();
    if (!allReviewsData[bookId]) {
        allReviewsData[bookId] = [];
    }

    // Double-check user hasn't already reviewed (prevent rapid multi-submits)
    if (allReviewsData[bookId].some(review => review.user === currentUser)) {
        showToast('Bạn đã gửi đánh giá cho sách này rồi.', 'info');
        submitReviewBtn.disabled = true; // Ensure button is disabled
        submitReviewBtn.textContent = 'Bạn đã đánh giá';
        return;
    }

    allReviewsData[bookId].push(newReview);
    saveAllReviews(allReviewsData);

    showToast('Cảm ơn bạn đã gửi đánh giá!', 'success');
    displayBookReviews(bookId); // Refresh the review list and average rating
    // Form is reset and button disabled within displayBookReviews if user logged in
}

// ======[ ORDER HISTORY FUNCTIONS ]======

// Get all orders, structured by username: { user1: [order1,...], user2: [...] }
function getAllOrders() {
    return getLocalStorageData(ORDERS_KEY, {});
}

// Save all orders back to storage
function saveAllOrders(ordersData) {
    setLocalStorageData(ORDERS_KEY, ordersData);
}

// Simulate the checkout process
function simulateCheckout() {
    if (!currentUser) {
        showToast('Vui lòng đăng nhập để hoàn tất thanh toán.', 'warning');
        // Optionally show login modal, potentially passing a redirect/callback
        if (cartModal) { // Assuming cartModal is the Bootstrap modal instance
             cartModal.hide(); // Hide cart modal first
        }
        if (loginModal) loginModal.show();
        return;
    }
    if (cart.length === 0) {
        showToast('Giỏ hàng của bạn đang trống. Không thể thanh toán.', 'info');
        return;
    }

    const allOrdersData = getAllOrders();
    if (!allOrdersData[currentUser]) {
        allOrdersData[currentUser] = [];
    }

    // Create a new order object
    const newOrder = {
        id: `DH-<span class="math-inline">\{Date\.now\(\)\}\-</span>{Math.random().toString(16).substring(2, 8)}`, // Simulate unique order ID
        timestamp: new Date().toISOString(),
        items: JSON.parse(JSON.stringify(cart)), // Deep copy cart items to prevent modification
        totalAmount: calculateCartTotal()
    };

    // Add the new order to the user's history
    allOrdersData[currentUser].push(newOrder);
    saveAllOrders(allOrdersData);

    showToast(`Đặt hàng thành công! Mã đơn hàng: ${newOrder.id}. Cảm ơn bạn!`, 'success');

    // Clear the cart after successful checkout
    cart = [];
    saveCart(); // This also updates display and count

     // Close cart modal if open
     if (cartModal) cartModal.hide();


    // Update order history display if profile modal is currently open
     if (profileModalElement && profileModalElement.classList.contains('show')) {
        displayOrderHistory();
     }
}

// Display the user's order history in the profile modal
function displayOrderHistory() {
    if (!currentUser || !orderHistoryContainer) {
        if (orderHistoryContainer) orderHistoryContainer.innerHTML = '<p class="text-muted">Vui lòng đăng nhập để xem lịch sử.</p>';
        return;
    }

    const allOrdersData = getAllOrders();
    const userOrders = allOrdersData[currentUser] || [];

    if (userOrders.length === 0) {
        orderHistoryContainer.innerHTML = '<p class="text-center text-muted fst-italic">Bạn chưa có đơn hàng nào.</p>';
        return;
    }

    orderHistoryContainer.innerHTML = ''; // Clear previous content
    // Sort orders by date, newest first
    userOrders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    userOrders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'card mb-3 shadow-sm'; // Add subtle shadow

        // Create list of items in the order
        let itemsHTML = order.items.map(item => `
            <li class="list-group-item d-flex justify-content-between align-items-center py-2 px-3">
                <div class="d-flex align-items-center">
                    <img src="<span class="math-inline">\{item\.image \|\| 'https\://via\.placeholder\.com/30x40\.png?text\=N/A'\}" alt\="</span>{item.title}" width="30" height="40" class="me-2 rounded object-fit-cover">
                    <span class="small">${item.title}</span>
                </div>
                <span class="small text-muted">SL: ${item.quantity} x ${formatCurrency(item.price)}</span>
            </li>`).join('');

        // Format order date/time
        const orderDate = new Date(order.timestamp);
        const formattedOrderDate = orderDate.toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' });

        orderElement.innerHTML = `
            <div class="card-header d-flex justify-content-between align-items-center bg-light py-2 px-3">
                <span class="small">Mã đơn: <strong class="user-select-all">${order.id}</strong></span> {/* user-select-all makes it easy to copy */}
                <span class="small text-muted">Ngày đặt: ${formattedOrderDate}</span>
            </div>
            <div class="card-body p-0"> {/* Remove body padding, use list group flush */}
                 <ul class="list-group list-group-flush">
                    ${itemsHTML || '<li class="list-group-item text-muted small">Không có chi tiết sản phẩm cho đơn hàng này.</li>'}
                </ul>
             </div>
             <div class="card-footer d-flex justify-content-end align-items-center py-2 px-3">
                 <span class="fw-bold small">Tổng cộng: ${formatCurrency(order.totalAmount)}</span>
                 {/* Optional: Add re-order or view details buttons here */}
             </div>
        `;
        orderHistoryContainer.appendChild(orderElement);
    });
}


// ======[ READING CHALLENGE FUNCTIONS ]======

// Get challenge data for the current user: { goal: number, completed: [id1, id2,...] }
function getChallengeData() {
    if (!currentUser) return { goal: 0, completed: [] }; // Return default if not logged in
    const allChallenges = getLocalStorageData(CHALLENGE_KEY, {});
    return allChallenges[currentUser] || { goal: 0, completed: [] }; // Return user's data or default
}

// Save challenge data for the current user
function saveChallengeData(userData) {
    if (!currentUser) return; // Cannot save if not logged in
    const allChallenges = getLocalStorageData(CHALLENGE_KEY, {});
    allChallenges[currentUser] = userData;
    setLocalStorageData(CHALLENGE_KEY, allChallenges);
}

// Display the reading challenge interface in the profile modal
function displayReadingChallenge() {
    if (!readingChallengeContainer) return; // Element doesn't exist

    if (!currentUser) {
        readingChallengeContainer.innerHTML = '<p class="text-muted">Vui lòng đăng nhập để tham gia thử thách đọc sách.</p>';
        return;
    }

    const challengeData = getChallengeData();
    const goal = challengeData.goal || 0; // Default goal is 0
    const completedBooksIds = challengeData.completed || [];
    const progress = goal > 0 ? Math.min((completedBooksIds.length / goal) * 100, 100) : 0;

    // Get full details for completed books
    const completedBookDetails = completedBooksIds
        .map(bookId => allBooks.find(b => b.id === bookId))
        .filter(book => book) // Filter out any books not found (maybe removed from allBooks)
        .sort((a, b) => a.title.localeCompare(b.title)); // Sort completed list alphabetically

    let completedBooksHTML = '';
    if (completedBookDetails.length > 0) {
        completedBooksHTML = completedBookDetails.map(book => `
            <li class="list-group-item d-flex justify-content-between align-items-center py-2 px-3">
                 <div class="d-flex align-items-center">
                     <img src="<span class="math-inline">\{book\.image \|\| 'https\://via\.placeholder\.com/30x40\.png?text\=N/A'\}" alt\="</span>{book.title}" width="30" height="40" class="me-2 rounded object-fit-cover">
                     <div>
                         <span class="small d-block"><span class="math-inline">\{book\.title\}</span\>
<em class\="text\-muted small d\-block"\></span>{book.author}</em>
                     </div>
                 </div>
                 <button class="btn btn-sm btn-outline-danger remove-from-challenge-btn" data-book-id="${book.id}" title="Xóa khỏi danh sách đã đọc">
                    <i class="fas fa-times"></i>
                </button>
             </li>`).join('');
    } else {
         completedBooksHTML = '<li class="list-group-item text-muted text-center fst-italic">Bạn chưa hoàn thành cuốn sách nào trong thử thách năm nay.</li>';
    }

    readingChallengeContainer.innerHTML = `
        <div class="row mb-4 align-items-end">
            <div class="col-md-6 mb-3 mb-md-0">
                <label for="reading-goal" class="form-label fw-bold">Mục tiêu đọc sách năm nay:</label>
                <div class="input-group">
                    <input type="number" class="form-control" id="reading-goal" value="${goal}" min="0" placeholder="Số sách">
                    <button class="btn btn-success" type="button" id="set-goal-btn">Lưu mục tiêu</button>
                </div>
            </div>
             <div class="col-md-6">
                 <h5 class="mb-1 text-md-end">Tiến độ: ${completedBooksIds.length} / ${goal > 0 ? goal : '∞'} sách</h5>
                 <div class="progress" style="height: 20px;"> {/* Taller progress bar */}
                     <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: <span class="math-inline">\{progress\}%" aria\-valuenow\="</span>{completedBooksIds.length}" aria-valuemin="0" aria-valuemax="<span class="math-inline">\{goal \> 0 ? goal \: 100\}"\></span>{Math.round(progress)}%</div>
                 </div>
             </div>
        </div>

        <div class="mb-3">
             <h5 class="mb-2">Sách đã hoàn thành (${completedBooksIds.length}):</h5>
             <ul class="list-group" id="completed-books-list" style="max-height: 300px; overflow-y: auto;"> {/* Scrollable list */}
                ${completedBooksHTML}
            </ul>
         </div>
    `;

    // Add event listeners for the buttons within the challenge section
    const setGoalBtn = document.getElementById('set-goal-btn');
    if (setGoalBtn) {
         setGoalBtn.addEventListener('click', handleSetReadingGoal);
    }
    document.querySelectorAll('.remove-from-challenge-btn').forEach(button => {
         button.addEventListener('click', handleRemoveFromChallenge);
    });
}

// Handle setting a new reading goal
function handleSetReadingGoal() {
    const goalInput = document.getElementById('reading-goal');
    if (!goalInput) return;

    const newGoal = parseInt(goalInput.value);

    if (isNaN(newGoal) || newGoal < 0) {
        showToast('Vui lòng nhập mục tiêu là một số hợp lệ (lớn hơn hoặc bằng 0).', 'warning');
        // Optional: Reset input to previous value or 0
        const currentData = getChallengeData();
        goalInput.value = currentData.goal || 0;
        return;
    }

    const challengeData = getChallengeData();
    challengeData.goal = newGoal;
    saveChallengeData(challengeData);

    showToast(`Đã cập nhật mục tiêu đọc sách thành ${newGoal} cuốn.`, 'success');
    displayReadingChallenge(); // Refresh the display
}

// Mark a book as read for the challenge (called from detail modal button)
function markBookAsReadForChallenge(bookId) {
    if (!currentUser) {
        showToast('Vui lòng đăng nhập để đánh dấu sách đã đọc.', 'warning');
        // Optionally show login modal
        if (bookDetailModal) bookDetailModal.hide();
        if (loginModal) loginModal.show();
        return;
    }
    if (isNaN(bookId)) return;

    const challengeData = getChallengeData();
    // Ensure completed is an array
     if (!Array.isArray(challengeData.completed)) {
         challengeData.completed = [];
     }

    if (!challengeData.completed.includes(bookId)) {
        challengeData.completed.push(bookId);
        saveChallengeData(challengeData);
        showToast('Tuyệt vời! Đã thêm sách vào danh sách hoàn thành.', 'success');
        // Update challenge display if profile modal is open
         if (profileModalElement && profileModalElement.classList.contains('show')) {
             displayReadingChallenge();
         }
         // Disable the button in the detail modal after marking
          if (detailMarkReadBtn) {
              detailMarkReadBtn.disabled = true;
              detailMarkReadBtn.innerHTML = '<i class="fas fa-check-double me-1"></i> Đã đọc';
          }
    } else {
        showToast('Sách này đã được đánh dấu là đã đọc trước đó.', 'info');
         // Ensure button is disabled if already read
          if (detailMarkReadBtn) {
              detailMarkReadBtn.disabled = true;
              detailMarkReadBtn.innerHTML = '<i class="fas fa-check-double me-1"></i> Đã đọc';
          }
    }
}

// Handle removing a book from the completed list in the challenge
function handleRemoveFromChallenge(event) {
    const button = event.currentTarget;
    const bookId = parseInt(button.dataset.bookId);
    if (isNaN(bookId)) return;

    const challengeData = getChallengeData();
     if (!Array.isArray(challengeData.completed)) {
         challengeData.completed = []; // Ensure it's an array
     }
    const bookIndex = challengeData.completed.indexOf(bookId);

    if (bookIndex > -1) {
        const book = allBooks.find(b => b.id === bookId);
        challengeData.completed.splice(bookIndex, 1);
        saveChallengeData(challengeData);
        showToast(`Đã xóa "${book ? book.title : 'sách'}" khỏi danh sách hoàn thành.`, 'info');
        displayReadingChallenge(); // Refresh the display

         // Re-enable the "Mark as Read" button in the detail modal if it's currently showing this book
          if (bookDetailModalElement && bookDetailModalElement.classList.contains('show')) {
              const detailForm = document.getElementById('review-form'); // Get form to check bookId
              if (detailForm && parseInt(detailForm.dataset.bookId) === bookId && detailMarkReadBtn) {
                   detailMarkReadBtn.disabled = false;
                   detailMarkReadBtn.innerHTML = '<i class="fas fa-check-circle me-1"></i> Đánh dấu Đã đọc';
              }
          }

    }
}


// ======[ CHATBOT FUNCTIONS ]======

// Chatbot responses arrays
const GREETINGS_RESPONSES = [
    "Chào bạn! Mình là bot tư vấn sách. Bạn cần tìm sách gì hay muốn hỏi thông tin gì khác ạ?",
    "Xin chào! BookBot sẵn sàng hỗ trợ. Bạn muốn tìm sách, xem giá, hay thử một phép tính?",
    "Hi! Mình có thể giúp gì cho bạn về sách, thời gian, hoặc các câu hỏi đơn giản?",
    "Rất vui được trò chuyện! Bạn đang quan tâm đến cuốn sách nào?",
];
const UNKNOWN_RESPONSES = [
    "Xin lỗi, mình chưa hiểu rõ câu hỏi này. Bạn thử hỏi về tên sách, tác giả, giá, thể loại, thời gian, hoặc phép tính cơ bản xem sao?",
    "Hmm, câu hỏi này hơi ngoài phạm vi hiểu biết của mình rồi. Mình giỏi nhất là tư vấn về sách đó!",
    "Mình vẫn đang học hỏi thêm. Hiện tại, bạn có thể hỏi mình về sách, giờ giấc, hoặc yêu cầu tính toán đơn giản nhé.",
    "Mình không chắc lắm về điều đó. Bạn có muốn mình tìm sách theo tên, tác giả, thể loại, hoặc gợi ý sách mới/bán chạy không?",
];
const BOOK_NOT_FOUND_RESPONSES = [
    "Rất tiếc, mình tìm chưa thấy sách nào khớp với yêu cầu của bạn trong kho dữ liệu.",
    "Hmm, có vẻ như sách bạn tìm không có ở đây. Bạn kiểm tra lại tên sách hoặc thử từ khóa khác nhé?",
    "Mình đã tìm kỹ nhưng không thấy sách này. Bạn cần tìm sách tương tự hay thể loại khác không?",
];
const SUGGESTION_RESPONSES = [
    "Dựa trên yêu cầu của bạn, có thể bạn sẽ thích những cuốn sách này:",
    "Đây là một vài gợi ý sách hay dành cho bạn:",
    "Mình tìm được một số sách có vẻ phù hợp:",
];
const CALC_ERROR_RESPONSES = [
    "Ồ, có lỗi khi tính toán rồi. Bạn kiểm tra lại phép tính nhé.",
    "Mình không thể thực hiện phép tính này. Đảm bảo đúng định dạng 'số [+/-/*//] số' nha.",
];

// Get random response from an array
function getRandomResponse(responsesArray) {
    if (!Array.isArray(responsesArray) || responsesArray.length === 0) {
        return "Mình không biết phải nói gì."; // Fallback
    }
    return responsesArray[Math.floor(Math.random() * responsesArray.length)];
}

// Add a message to the chatbox UI
function addChatMessage(message, sender = 'user') {
    if (!chatboxMessages) return;
    const messageElement = document.createElement('div');
    // Basic sanitization (replace < > to prevent simple HTML injection)
    // For robust security, use a proper sanitization library if user input is complex
    // const sanitizedMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    messageElement.classList.add('chat-message', `message-${sender}`);
    messageElement.innerHTML = message; // Use innerHTML to allow buttons/links from bot

    chatboxMessages.appendChild(messageElement);
    // Scroll to the bottom
    chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
}

// Handle sending a chat message
function handleChatSend() {
    const userInput = chatboxInput.value.trim();
    if (userInput === '') return;

    addChatMessage(userInput, 'user');
    chatboxInput.value = ''; // Clear input field

    // Show typing indicator and process bot response
    showTypingIndicator();
    setTimeout(() => {
        const botReply = getBotResponse(userInput); // Get the response logic
        hideTypingIndicator();
        addChatMessage(botReply, 'bot');
    }, 600 + Math.random() * 600); // Simulate thinking time
}

// Show/Hide typing indicator
function showTypingIndicator() {
    if (typingIndicator) typingIndicator.style.display = 'block';
     chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
}
function hideTypingIndicator() {
    if (typingIndicator) typingIndicator.style.display = 'none';
}

// Core Chatbot Response Logic
function getBotResponse(userInput) {
    const inputLower = userInput.toLowerCase().trim();

    // 1. Greetings
    if (/^(chào|xin chào|hello|hi|hey|alo)/.test(inputLower)) {
        return getRandomResponse(GREETINGS_RESPONSES);
    }

    // 2. Time/Date Queries
    if (/(mấy giờ|thời gian|hôm nay|ngày mấy|bây giờ)/.test(inputLower)) {
        const now = new Date();
        return `Hiện tại là ${now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} ngày ${now.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`;
    }

    // 3. Simple Calculations (Improved Regex and Error Handling)
    // Matches patterns like "tính 5+3", "5 * 3", "10 / 2 bằng", "100-50 là bao nhiêu"
    const calcMatch = inputLower.match(/(?:tính|calculate|calc)?\s*([\d.,]+)\s*([+\-*\/x%])\s*([\d.,]+)(?:\s*(?:=|bằng|là))?/);
    if (calcMatch) {
        try {
             // Replace comma with dot for float parsing
            const num1Str = calcMatch[1].replace(',', '.');
            let operator = calcMatch[2];
            const num2Str = calcMatch[3].replace(',', '.');

            const num1 = parseFloat(num1Str);
            const num2 = parseFloat(num2Str);

            if (isNaN(num1) || isNaN(num2)) {
                 return getRandomResponse(CALC_ERROR_RESPONSES) + " Số không hợp lệ.";
            }

             // Allow 'x' for multiplication
             if (operator === 'x') operator = '*';

            let result;
            switch (operator) {
                case '+': result = num1 + num2; break;
                case '-': result = num1 - num2; break;
                case '*': result = num1 * num2; break;
                case '/':
                    if (num2 === 0) return "Lỗi chia cho 0!";
                    result = num1 / num2;
                    break;
                 case '%':
                     if (num2 === 0) return "Lỗi chia lấy dư cho 0!";
                     result = num1 % num2;
                     break;

                default: return getRandomResponse(CALC_ERROR_RESPONSES); // Should not happen with regex match
            }
            // Format result nicely
            const formattedResult = Number.isInteger(result) ? result : parseFloat(result.toFixed(4)); // Limit decimal places
            return `Kết quả của ${num1} ${operator} ${num2} là: ${formattedResult}`;
        } catch (e) {
             console.error("Calculation Error:", e);
             return getRandomResponse(CALC_ERROR_RESPONSES);
        }
    }

    // 4. Book-Related Queries (using more specific regex)

    // 4.1. Ask for Price
    // "Giá [sách ABC] bao nhiêu?", "[Sách XYZ] giá nhiêu?", "price of [Book Title]"
    const priceMatch = inputLower.match(/(?:giá|price of|cost of)\s*(?:cuốn|sách)?\s*(.+?)\s*(?:là bao nhiêu|giá nhiêu|nhiêu tiền|giá sao|\?|$)/);
    if (priceMatch) {
        const titleQuery = priceMatch[1].replace(/["']/g, '').trim(); // Remove quotes
        const book = findBookByTitleFuzzy(titleQuery);
        if (book) {
            let priceInfo = `Cuốn "${book.title}" có giá ${formatCurrency(book.price)}.`;
            if (book.originalPrice && book.price < book.originalPrice) {
                priceInfo += ` Đang giảm từ <del>${formatCurrency(book.originalPrice)}</del>.`;
            }
            return priceInfo + ` <br><button class='btn btn-sm btn-success chat-action' data-action='add-cart' data-book-id='<span class="math-inline">\{book\.id\}'\>Thêm vào giỏ</button\> <button class\='btn btn\-sm btn\-info chat\-action' data\-action\='view\-detail' data\-book\-id\='</span>{book.id}'>Xem chi tiết</button>`;
        } else {
            return `Xin lỗi, mình không tìm thấy sách nào có tên giống "${titleQuery}".`;
        }
    }

    // 4.2. Ask for General Info (Author, Description)
    // "Thông tin [sách ABC]", "Chi tiết về [sách XYZ]", "Tell me about [Book Title]"
    const infoMatch = inputLower.match(/(?:thông tin|chi tiết|nội dung|mô tả|về|tell me about)\s*(?:cuốn|sách)?\s*(.+?)(?:\?|$)/);
     if (infoMatch && !priceMatch) { // Ensure it's not a price query mistaken for info
        const titleQuery = infoMatch[2].replace(/["']/g, '').trim();
        const book = findBookByTitleFuzzy(titleQuery);
        if (book) {
            let info = `<strong>"${book.title}"</strong><br>
                       - Tác giả: ${book.author}<br>
                       - Thể loại: ${book.genre}<br>
                       - Đánh giá: <span class="math-inline">\{renderStars\(book\.rating\)\} \(</span>{(book.rating || 0).toFixed(1)})<br>
                       - Giá: ${formatCurrency(book.price)} ${book.originalPrice && book.price < book.originalPrice ? `<del class="text-muted small">${formatCurrency(book.originalPrice)}</del>` : ''}<br>
                       - Mô tả: ${book.description ? (book.description.substring(0, 150) + '...') : 'Chưa có.'}`; // Shorten description
            return info + `<br><button class='btn btn-sm btn-success chat-action' data-action='add-cart' data-book-id='<span class="math-inline">\{book\.id\}'\>Thêm vào giỏ</button\> <button class\='btn btn\-sm btn\-info chat\-action' data\-action\='view\-detail' data\-book\-id\='</span>{book.id}'>Xem chi tiết</button>`;
        } else {
             return `Mình không có thông tin về sách "${titleQuery}".`;
        }
    }

     // 4.3. Search by Keyword (Generic Search Intent)
     // "Tìm sách [keyword]", "Kiếm [keyword]", "Có sách nào về [keyword] không?", "search for [keyword]"
     // Make this less greedy than info/price queries
     const searchMatch = inputLower.match(/(?:tìm|kiếm|search for|có sách(?: nào)?)\s*(?:về|liên quan đến)?\s*(.+?)(?:\?|$)/);
      if (searchMatch && !infoMatch && !priceMatch) { // Only trigger if not info/price
          const keyword = searchMatch[1].replace(/["']/g, '').trim();
          const results = searchBooksByKeyword(keyword); // Search title and author
          if (results.length > 0) {
              let response = `${getRandomResponse(SUGGESTION_RESPONSES)}<br>`;
              response += results.slice(0, 3).map(book =>
                  `&bull; "${book.title}" - <span class="math-inline">\{book\.author\} <button class\='btn btn\-xs btn\-outline\-info chat\-action' data\-action\='view\-detail' data\-book\-id\='</span>{book.id}'>Xem</button>`
              ).join('<br>');
              if (results.length > 3) {
                  response += `<br>... và ${results.length - 3} kết quả khác.`;
              }
              // Add button to filter on main page
               response += `<br><button class='btn btn-sm btn-outline-primary mt-2 chat-action' data-action='filter-page-keyword' data-keyword='${keyword}'>Xem tất cả trên trang</button>`;
              return response;
          } else {
              return getRandomResponse(BOOK_NOT_FOUND_RESPONSES);
          }
      }

      // 4.4. Suggest Books by Genre
      // "Gợi ý sách [Thể loại]", "Sách [Thể loại] hay", "Recommend [Genre] books"
       // List common genres explicitly for better matching
      const genreKeywords = "lập trình|khoa học|lịch sử|tiểu thuyết|trinh thám|lãng mạn|kinh dị|văn học|kinh tế|kỹ năng|phiêu lưu|tâm lý|hài hước|giả tưởng";
      const genreMatch = inputLower.match(new RegExp(`(?:sách|thuộc|thể loại|loại|genre)\s*(${genreKeywords})(?:.*?)`, 'i'));
       if (genreMatch) {
           const genre = genreMatch[1];
           const recommendations = recommendBooksByGenre(genre);
           if (recommendations.length > 0) {
               let response = `Đây là một số sách thuộc thể loại "${genre}" được đánh giá cao:<br>`;
               response += recommendations.slice(0, 3).map(book =>
                   `&bull; "<span class="math-inline">\{book\.title\}" \(</span>{renderStars(book.rating)}) <button class='btn btn-xs btn-outline-info chat-action' data-action='view-detail' data-book-id='${book.id}'>Xem</button>`
               ).join('<br>');
               if (recommendations.length > 3) {
                   response += `<br>... và ${recommendations