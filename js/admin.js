/**
 * Admin Module
 * Handles User Management (Create, Delete, List).
 */

const STORAGE_USERS = 'link_hub_users';

function getAllUsers() {
    const raw = localStorage.getItem(STORAGE_USERS);
    return raw ? JSON.parse(raw) : [];
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}

function createUser(username, password, fullName, title) {
    const users = getAllUsers();

    // Check if exists
    if (users.find(u => u.username === username)) {
        return { success: false, message: 'Bu login allaqachon mavjud!' };
    }

    const newUser = {
        username,
        password,
        fullName,
        title,
        role: 'user', // Default role
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);
    return { success: true, user: newUser };
}

function deleteUser(username) {
    let users = getAllUsers();
    // Prevent deleting self (current admin) - check in UI or strict here?
    // Assume username passed is correct.
    // Prevent deleting the main admin
    if (username === 'user1') {
        return { success: false, message: 'Bosh adminni o\'chirish mumkin emas!' };
    }

    users = users.filter(u => u.username !== username);
    saveUsers(users);
    return { success: true };
}

window.Admin = {
    getAllUsers,
    createUser,
    deleteUser
};
