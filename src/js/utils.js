
export default {
    getToken() {
        return window.localStorage.getItem('astoken');
    },
    saveToken(token) {
        window.localStorage.setItem('astoken', token);
    },
    clearToken() {
        window.localStorage.removeItem('astoken');
    },
    exportExcel(data, filename, sheetName) {
        const XLSX = require('xlsx');
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
        XLSX.writeFile(wb, filename);
    },
    currentDate(){
        const Manba= require('manba');
        return Manba().format('YYYY/MM/DD h:mm:ss');
    }
}