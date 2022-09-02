class Storage {

    static getAllSearchedFromStorage() {//localStorage dan veriyi çekme yoksa oluşturma

        let users;

        if (localStorage.getItem("searched") === null) {
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem("searched"));
        }

        return users;

    }

    static addSearchedUserToStorage(username) { //Storage aranan kişiyi kontrol ederek ekleme
        let users = this.getAllSearchedFromStorage();

        if (users.indexOf(username) === -1) {
            users.unshift(username);
        }
        localStorage.setItem("searched", JSON.stringify(users));
    }

    static clearAllSearchedFromStorage() {//Tüm aranan geçmişini storagedan silme
        localStorage.removeItem("searched");
    }

    static removeSelectedSearchesFromStorage(username) {//Seçilen kişiyi, aranan geçmişinden silme
        let users = this.getAllSearchedFromStorage();

        users.splice(users.indexOf(username), 1);

        localStorage.setItem("searched", JSON.stringify(users));
    }

}