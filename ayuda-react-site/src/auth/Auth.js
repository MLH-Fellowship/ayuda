
// Irl this can be used to manage authenticated ie to load stuff from local storage

class Auth {
    constructor() {
        this.authenticated = false
    }

    login(cb) {
        this.authenticated = true;
        cb();
    }

    logout(cb) {
        this.authenticated = false;
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();