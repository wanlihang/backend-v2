
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
    currentDate() {
        const Manba = require('manba');
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
    scrollTopRecord(page) {
        let pos = document.querySelector(".page-main-body-box").scrollTop;
        if (pos > 0) {
            window.localStorage.setItem(`meedu-st-${page}`, pos);
        }
    },
    scrollTopSet(page) {
        let saveKey = `meedu-st-${page}`;
        let pos = window.localStorage.getItem(saveKey);
        if (pos) {
            document.querySelector(".page-main-body-box").scrollTop = pos;
            window.localStorage.removeItem(saveKey);
        }
    }
}