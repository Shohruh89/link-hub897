/**
 * Auth Module
 * Handles login, logout, and session management.
 * Uses localStorage for data persistence.
 */

const STORAGE_KEY_USERS = 'link_hub_users';
const STORAGE_KEY_SESSION = 'link_hub_session';

// Initial Seed Data
const DEFAULT_ADMIN = {
    username: 'user1',
    password: 'user1',
    role: 'admin',
    fullName: 'Sh. F. Hojiyev',
    title: 'Data Analyst & Backend Developer'
};

// Initialize Data if empty
function initData() {
    const users = localStorage.getItem(STORAGE_KEY_USERS);
    if (!users) {
        const initialUsers = [DEFAULT_ADMIN];
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(initialUsers));
        console.log('Database initialized with default admin.');
    }
}

// Login Function
function login(username, password) {
    initData(); // Ensure data exists
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS));

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Set Session
        localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(user));
        return { success: true, user: user };
    } else {
        return { success: false, message: 'Login yoki parol noto\'g\'ri!' };
    }
}

// Logout Function
function logout() {
    localStorage.removeItem(STORAGE_KEY_SESSION);
    window.location.href = 'index.html';
}

// Check Session logic (to be used in protected pages)
function checkSession() {
    const session = localStorage.getItem(STORAGE_KEY_SESSION);
    if (!session) {
        window.location.href = 'index.html';
        return null;
    }
    return JSON.parse(session);
}

// Get Current User
function getCurrentUser() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_SESSION));
}

// Export functions globally for simplicity in vanilla JS
window.Auth = {
    login,
    logout,
    checkSession,
    getCurrentUser,
    initData
};

// Auto-init on load
initData();
