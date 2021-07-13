export default {
    getToken() {
        return window.localStorage.getItem('astoken');
    },
    clearToken() {
        window.localStorage.removeItem('astoken');
    }
}