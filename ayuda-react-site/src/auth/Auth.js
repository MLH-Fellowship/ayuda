// Irl this can be used to manage authenticated ie to load stuff from local storage
import axios from "axios";
import { url } from "../constants";

class Auth {
  constructor() {
    this.authenticated = false;
  }

  getCurrentUser() {
    const user = axios
      .post(
        url + "api/user/me",
        {},
        { headers: { Authorization: `Bearer ${this.getAccessToken()}` } }
      )
      .then((res) => {
        return res.data
      });
      console.log(user);
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
    return localStorage.getItem("accessToken");
  }

  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  isAuthenticated() {
    return localStorage.getItem("accessToken") != null;
  }
}

export default new Auth();
