// Irl this can be used to manage authenticated ie to load stuff from local storage
import axios from "axios";
import { url } from "../constants";
import { extendSession } from "../util/ExtendSession";

class Auth {
  constructor() {
    this.authenticated = false;
  }

  async getCurrentUser() {
    let currentUser;

    try {
      const res = await axios.get(url + "api/user/me", {
        headers: { Authorization: `Bearer ${this.getAccessToken()}` },
      });

      console.log("current user: " + res.data._id);
      currentUser = res.data;
      return res.data
    } catch (e) {
      if (e.response.data.message == "jwt expired") {
        extendSession(() => {
          console.log("empty callback");
        });
        this.getCurrentUser();
      }
    }

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
