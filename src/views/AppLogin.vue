<script>
// example components
import NavbarCommon from "@/components/common/navbar/NavbarCommon.vue";
import Header from "@/components/common/Header.vue";

//Vue Material Kit 2 components
import MaterialSwitch from "@/components/MaterialSwitch.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";

import bg from "@/assets/img/profiles/seoul.jpg";

import { mapState, mapActions } from "vuex";
import { RouterLink } from "vue-router";

const userStore = "userStore";

export default {
  data() {
    return {
      user: {
        id: null,
        pw: null,
      },
    };
  },
  components: { Header, NavbarCommon, MaterialSwitch, bg, RouterLink },

  computed: {
    ...mapState(userStore, ["isLogin", "isLoginError", "userInfo"]),
  },

  methods: {
    setMaterialInput,
    ...mapActions(userStore, ["userConfirm", "getUserInfo"]),

    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.$router.push({ name: "landing" });
      } else {
        this.user.id = null;
        this.user.pw = null;
        alert("아이디나 비밀번호가 잘못되었습니다.");
      }
    },
  },

  mounted() {
    this.setMaterialInput();
  },
};
</script>

<template>
  <Header>
    <NavbarCommon light />
    <div
      ref="root"
      class="page-header align-items-start min-vh-100"
      :style="{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1601621915196-2621bfb0cd6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80)',
      }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container my-auto">
        <div class="row">
          <div class="col-lg-4 col-md-8 col-12 mx-auto">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-info shadow-info border-radius-lg py-3 pe-1">
                  <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">로그인</h4>
                </div>
              </div>

              <div class="card-body">
                <form role="form" class="text-start" @submit.prevent>
                  <div class="input-group input-group-outline my-3">
                    <label class="form-label">아이디</label>
                    <input
                      id="id"
                      type="text"
                      class="form-control form-control-md"
                      placeholder
                      isrequired="false"
                      v-model="user.id"
                    />
                  </div>

                  <div class="input-group input-group-outline my-3">
                    <label class="form-label">비밀번호</label>
                    <input
                      id="pw"
                      type="password"
                      class="form-control form-control-md"
                      placeholder
                      isrequired="false"
                      v-model="user.pw"
                    />
                  </div>

                  <MaterialSwitch
                    class="d-flex align-items-center mb-3"
                    id="rememberMe"
                    labelClass="mb-0 ms-3"
                    checked
                    >로그인 상태 유지</MaterialSwitch
                  >

                  <div class="text-center">
                    <button
                      @click="confirm"
                      class="btn bg-gradient-info btn-md w-100 false my-4 mb-2"
                    >
                      로그인
                    </button>
                  </div>

                  <p class="mt-3 text-sm text-center">
                    <RouterLink to="/register" class="text-info text-gradient font-weight-bold"
                      >회원가입</RouterLink
                    >
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Header>
</template>

<style scoped>
::-webkit-scrollbar {
  display: none;
}

body {
  overflow: hidden;
}
</style>
