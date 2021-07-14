export default {
    getToken() {
        return window.localStorage.getItem('astoken');
    },
    saveToken(token) {
        window.localStorage.setItem('astoken', token);
    },
    clearToken() {
        window.localStorage.removeItem('astoken');
    }
}