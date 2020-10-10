import { url } from "../constants";
import axios from "axios";
import auth from "../auth/Auth";

export const extendSession = (cb) => {
  axios
    .post(url + "api/user/extend-session", {
      refreshToken: auth.getRefreshToken(),
    })
    .then((res) => {
        console.log(res.data)
      auth.login(cb, res.data.accessToken, res.data.refreshToken)
    });
};
