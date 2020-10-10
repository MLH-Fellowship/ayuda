
// Irl this can be used to manage authenticated ie to load stuff from local storage

class Auth {
    constructor() {
        this.authenticated = false
    }

    login(cb, accessToken, refreshToken) {
        this.authenticated = true;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        cb();
    }

    logout(cb) {
        this.authenticated = false;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        cb();
    }


    getAccessToken() {
        return localStorage.getItem("accessToken")
    }

    isAuthenticated() {
        return localStorage.getItem("accessToken") != null;
    }
}

export default new Auth();