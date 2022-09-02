class Github {

    constructor() {
        this.url = "https://api.github.com/users/";
    }

    async getGithubData(userName) {//githubdan veriyi çekme user ve repo bilgilerini tutan bir promise obje döner

        const user = await fetch(this.url + userName);
        const repo = await fetch(this.url + userName + "/repos");

        const userData = await user.json();
        const userRepo = await repo.json();

        return {
            user: userData,
            repos: userRepo
        };

    }

}
