
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
    },
    getHMS(time) {
        const hour =
          parseInt(time / 3600) < 10
            ? "0" + parseInt(time / 3600)
            : parseInt(time / 3600);
        const min =
          parseInt((time % 3600) / 60) < 10
            ? "0" + parseInt((time % 3600) / 60)
            : parseInt((time % 3600) / 60);
        const sec =
          parseInt((time % 3600) % 60) < 10
            ? "0" + parseInt((time % 3600) % 60)
            : parseInt((time % 3600) % 60);
        return hour + ":" + min + ":" + sec;
      },
}