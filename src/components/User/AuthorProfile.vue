<script>
//Vue Material Kit 2 components
import MaterialAvatar from "@/components/MaterialAvatar.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// image
import profilePic from "@/assets/img/bruce-mars.jpg";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import { mapState, mapActions, mapGetters } from "vuex";

const userStore = "userStore";
export default {
  data() {
    return {
      profilePic,
    };
  },
  components: { MaterialAvatar, MaterialButton },

  methods: {
    setMaterialInput,
    ...mapGetters(userStore, ["checkUserInfo", "checkToken"]),
  },

  computed: {
    ...mapState(userStore, ["isLogin", "userInfo"]),
  },
  mounted() {
    this.setMaterialInput();
    // this.user = this.userInfo();
  },
};
</script>
<template>
  <section class="pt-sm-7 py-3 position-relative">
    <div class="container">
      <div class="row">
        <div class="col-12 mx-auto">
          <div class="mt-n8 mt-md-n12 text-center">
            <div class="blur-shadow-avatar">
              <MaterialAvatar
                size="xxxl"
                class="shadow-xl position-relative z-index-2"
                :image="profilePic"
                alt="Avatar"
              />
            </div>
          </div>
          <div class="row py-4">
            <div class="col-lg-7 col-md-7 z-index-2 position-relative px-md-2 px-sm-5 mx-auto">
              <div class="d-flex justify-content-center align-items-center">
                <h3 class="mb-0">{{ userInfo.name }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
#profileDetail {
  margin-left: 15px;
}
</style>
