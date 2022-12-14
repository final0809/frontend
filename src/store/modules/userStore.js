import jwtDecode from "jwt-decode";
import router from "@/router";
import { login, findById, regenerateToken, logout } from "@/api/modules/user";

const state = {
  isLogin: false,
  isLoginError: false,
  userInfo: null,
  isValidToken: false,
};

const getters = {
  checkUserInfo(state) {
    return state.userInfo;
  },
  checkToken(state) {
    return state.isValidToken;
  },
};

const mutations = {
  SET_IS_LOGIN(state, isLogin) {
    // console.log(`setislogin ${isLogin}, ${state.isLogin}`);
    state.isLogin = isLogin;
    // console.log(`setislogin ${state.isLogin}`);
  },
  SET_IS_LOGIN_ERROR(state, isLoginError) {
    state.isLoginError = isLoginError;
  },
  SET_IS_VALID_TOKEN(state, isValidToken) {
    state.isValidToken = isValidToken;
  },
  SET_USER_INFO(state, userInfo) {
    state.isLogin = true;
    state.userInfo = userInfo;
  },
};

const actions = {
  async userConfirm({ commit }, user) {
    await login(
      user,
      ({ data }) => {
        if (data.message === "success") {
          let accessToken = data["access-token"];
          let refreshToken = data["refresh-token"];
          // console.log("login success token created!!!! >> ", accessToken, refreshToken);
          commit("SET_IS_LOGIN", true);
          commit("SET_IS_LOGIN_ERROR", false);
          commit("SET_IS_VALID_TOKEN", true);
          sessionStorage.setItem("access-token", accessToken);
          sessionStorage.setItem("refresh-token", refreshToken);
        } else {
          commit("SET_IS_LOGIN", false);
          commit("SET_IS_LOGIN_ERROR", true);
          commit("SET_IS_VALID_TOKEN", false);
        }
      },
      (error) => {
        // console.log(error);
      }
    );
  },
  async getUserInfo({ commit, dispatch }, token) {
    let decodeToken = jwtDecode(token);
    // console.log("2. getUserInfo() decodeToken :: ", decodeToken);
    await findById(
      decodeToken.userid,
      ({ data }) => {
        // console.log("getUserInfo");
        // console.log(decodeToken);
        if (data.message === "success") {
          commit("SET_USER_INFO", data.userInfo);
          // console.log("3. getUserInfo data >> ", data);
        } else {
          // console.log("?????? ?????? ??????!!!!");
        }
      },
      async (error) => {
        // console.log(
        // "getUserInfo() error code [?????? ???????????? ?????? ?????????.] ::: ",
        //   error.response.status
        // );
        commit("SET_IS_VALID_TOKEN", false);
        await dispatch("regenerateToken");
      }
    );
  },
  async regenerateToken({ commit, state }) {
    // console.log("?????? ????????? >> ?????? ?????? ?????? : {}", sessionStorage.getItem("access-token"));
    await regenerateToken(
      JSON.stringify(state.userInfo),
      ({ data }) => {
        if (data.message === "success") {
          let accessToken = data["access-token"];
          // console.log("????????? ?????? >> ????????? ?????? : {}", accessToken);
          sessionStorage.setItem("access-token", accessToken);
          commit("SET_IS_VALID_TOKEN", true);
        }
      },
      async (error) => {
        // HttpStatus.UNAUTHORIZE(401) : RefreshToken ?????? ?????? >> ?????? ?????????!!!!
        if (error.response.status === 401) {
          // console.log("?????? ??????");
          // ?????? ????????? ??? DB??? ????????? RefreshToken ??????.
          await logout(
            state.userInfo.id,
            ({ data }) => {
              if (data.message === "success") {
                // console.log("???????????? ?????? ?????? ??????");
              } else {
                // console.log("???????????? ?????? ?????? ??????");
              }
              alert("RefreshToken ?????? ??????!!! ?????? ???????????? ?????????.");
              commit("SET_IS_LOGIN", false);
              commit("SET_USER_INFO", null);
              commit("SET_IS_VALID_TOKEN", false);
              router.push({ name: "login" });
            },
            (error) => {
              console.log(error);
              commit("SET_IS_LOGIN", false);
              commit("SET_USER_INFO", null);
            }
          );
        }
      }
    );
  },
  async userLogout({ commit }, userid) {
    await logout(
      userid,
      ({ data }) => {
        // console.log("userLogout");
        // console.log(data);

        if (data.message === "success") {
          // console.log("userlogout success");

          commit("SET_IS_LOGIN", false);
          commit("SET_USER_INFO", null);
          commit("SET_IS_VALID_TOKEN", false);
        } else {
          // console.log("?????? ?????? ??????!!!!");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
