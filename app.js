//Elemetleri tanımlama
const userName = document.getElementById("githubname");
const form = document.getElementById("github-form");
const clearButton = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

//Nesneleri oluşturma
const github = new Github();
const ui = new UI();

eventListeners();

//eventleri çalıştıran fonksiyon
function eventListeners() {
    form.addEventListener("submit", getData);
    clearButton.addEventListener("click", clearAllSearched);
    lastUsers.addEventListener("click", clickLastUsers);
    document.addEventListener("DOMContentLoaded", getAllSearched);
}

function getData(e) {//githubdan veriyi alır
    ui.clearPrevProfile();
    const name = userName.value.trim();
    if (name === "") {
        ui.showErrorMessage("Lütfen bir kullanıcı adı girin !", "warning")
    } else {
        github.getGithubData(name)
            .then(response => {
                if (response.user.message === "Not Found") {
                    ui.showErrorMessage("Böyle bir kullanıcı yok !", "danger");
                } else {

                    ui.addSearchedToUI(name);
                    Storage.addSearchedUserToStorage(name);
                    ui.showUserInfos(response.user);
                    ui.showReposInfos(response.repos);
                    //console.log(response)
                }
            })
            .catch(err => console.log(err));

    }
    ui.clearInput();
    e.preventDefault();
}

function clearAllSearched() {//Tüm geçmiş aramları siler
    if (confirm("Tüm aramaları temizlemek istediğinize emin misiniz ?")) {
        Storage.clearAllSearchedFromStorage();
        ui.clearAllSearchedUsersFromUI();
    }

}

function getAllSearched() {//Tüm geçmiş aramaları storagedan arayüze yükler
    ui.addAllSearchedUserToUI();
}

function getSearchedUserData(element) {//Geçmişte aranan kullanıcı profilini gösterir

    userName.value = element.textContent;
    getData(element.textContent);

}

function clickLastUsers(e) { //Geçmiş aramalar listesinde ilgili yere tıklandığında çalışır
    //Silme veya profilini yükleme
    const element = e.target;

    if (element.nodeName.toLowerCase() === "a") {
        getSearchedUserData(element);//Profil yükleme
    }
    if (element.nodeName.toLowerCase() === "i") {
        //Kullanıcıyı arayüz ve storagedan silme 
        ui.removeSelectedSearchesFromUI(element.parentElement);
        Storage.removeSelectedSearchesFromStorage(element.previousElementSibling.textContent);

    }

}