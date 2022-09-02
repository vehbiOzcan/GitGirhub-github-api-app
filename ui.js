class UI {
    constructor() {
        this.nameInput = document.getElementById("githubname");
        this.profileDiv = document.getElementById("profile");
        this.reposDiv = document.getElementById("repos");
        this.lastUsers = document.getElementById("last-users");
        this.cardBody = document.querySelector(".card-body");
    }

    clearInput() {//Kullanıcı adı alanını temizlme
        this.nameInput.value = "";
    }

    showUserInfos(user) { //Kullanıcı bilgilerini arayüzde gösterme
        let company = user.company;
        let mail = user.email;
        let location = user.location;

        if (user.company === null) {
            company = "-";
        }
        if (user.location === null) {
            location = "-";
        }
        if (user.email === null) {
            mail = "-";
        }

        this.profileDiv.innerHTML = `
            <div class="card card-body mb-3">
            <div class="row">
            <div class="col-md-4">
                <a href="${user.html_url}" target = "_blank">
                <img class="img-fluid mb-2" src="${user.avatar_url}"></a>
                <hr>
                <div id="fullName"><strong>${user.name}</strong></div>
                <hr>
                <div id="bio">${user.bio}</div>
                </div>
            <div class="col-md-8">
                    
                    <button class="btn btn-secondary">
                        Takipçi  <span class="badge badge-light">${user.followers}</span>
                    </button>
                    <button class="btn btn-info">
                        Takip Edilen  <span class="badge badge-light">${user.following}</span>
                    </button>
                    <button class="btn btn-danger">
                        Repolar  <span class="badge badge-light">${user.public_repos}</span>
                    </button>
                    <hr>
                    <li class="list-group">
                        <li class="list-group-item borderzero">
                            <img src="images/company.png" width="30px"> <span id="company">${company}</span>
                            
                        </li>
                        <li class="list-group-item borderzero">
                            <img src="images/location.png" width="30px"> <span id = "location">${location}</a>
                            
                        </li>
                        <li class="list-group-item borderzero">
                            <img src="images/mail.png" width="30px"> <span id="mail">${mail}</span>
                            
                        </li>
                        
                    </div>
                    
                    
            </div>
        </div>
        `

    }

    showReposInfos(repos) {//Kullanıcının son repolarını arayüzde gösterme
        this.reposDiv.innerHTML = "";

        repos.forEach(repo => {
            this.reposDiv.innerHTML += `
                <div class="mb-2 card-body">
                    <div class="row">
                        <div class="col-md-2">
                            <span></span>
                            <a href="${repo.html_url}" target="_blank" id="repoName">${repo.name}</a>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-secondary">
                                Starlar  <span class="badge badge-light" id="repoStar">${repo.stargazers_count}</span>
                            </button>

                            <button class="btn btn-info">
                                Forklar  <span class="badge badge-light" id="repoFork">${repo.forks_count}</span>
                            </button>

                            <button class="btn btn-primary">
                            Diller  <span class="badge badge-light" id="repoFork">${repo.language}</span>
                        </button>

                        </div>
                    </div>
                </div>
                `
        });
    }

    addSearchedToUI(username) {// aranan kullancıyı son arananlar kısmına ekleme
        let users = Storage.getAllSearchedFromStorage();

        if (users.indexOf(username) === -1) {
            // <li class="list-group-item d-flex justify-content-between">
            //     <a href="#" class="delete-item"><i class="fa fa-remove"></i></a>
            // </li>

            const li = document.createElement("li");
            li.classList = "list-group-item d-flex justify-content-between";
            const a = document.createElement("a");
            a.href = "#";
            a.classList = "user-url";
            a.textContent = username;
            li.appendChild(a);
            const i = document.createElement("i");
            i.classList = "fa fa-remove";
            li.appendChild(i);
            //this.lastUsers.insertBefore(li,this.lastUsers.firstElementChild);
            this.lastUsers.prepend(li);

        }
    }

    addAllSearchedUserToUI() {//Tüm geçmiş aramaları arayüze ekleme
        const users = Storage.getAllSearchedFromStorage();

        let result = "";

        users.forEach(user => {
            result += `<li class="list-group-item d-flex justify-content-between">
            <a href="#" class="user-url">${user}</a><i class="fa fa-remove"></i>
            </li>`;
        });

        this.lastUsers.innerHTML = result;
    }

    showErrorMessage(message, type) {//hata mesajlarını arayüzde gösterme
        const messageDiv = document.createElement("div");
        messageDiv.classList = "alert alert-" + type;
        messageDiv.textContent = message;
        this.cardBody.appendChild(messageDiv);

        setTimeout(function () {
            messageDiv.remove();
        }, 1500);
    }

    removeSelectedSearchesFromUI(element) { //seçilen kullanıcıyı aranan geçmişinden silme
        this.lastUsers.removeChild(element);
    }

    clearPrevProfile() {//Önceki profili temizleme
        this.profileDiv.innerHTML = "";
    }

    clearAllSearchedUsersFromUI() {//Tüm geçmiş aranan kullanıcıları temizleme
        while (this.lastUsers.firstElementChild != null) {
            this.lastUsers.removeChild(this.lastUsers.firstElementChild);
        }
    }

}