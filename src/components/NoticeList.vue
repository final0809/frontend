<script setup>
import NavbarCommon from "@/components/common/navbar/NavbarCommon.vue";
</script>
<template>
  <Header>
    <NavbarCommon transparent />
    <div
      class="page-header align-items-start min-vh-100"
      :style="{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1617541086271-4d43983704bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80)',
      }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container mt-8">
        <div class="row">
          <!-- <div class="col-lg-12 col-md-8 col-12 mx-auto"> -->
          <div class="col-lg-12">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-info shadow-info border-radius-lg py-3 pe-1">
                  <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">공 지 사 항</h4>
                </div>
              </div>
              <div class="card-body min-vh-70">
                <div style="text-align: right" v-if="userInfo && userInfo.id === 'admin'">
                  <button
                    type="button"
                    class="btn btn-outline-info btn-sm"
                    style="margin-right: 5%"
                    @click="addNotice()"
                  >
                    글작성
                  </button>
                </div>
                <div v-if="notices.length" class="d-flex justify-content-center">
                  <table class="table table-hover text-center w-90">
                    <colgroup>
                      <col style="width: 5%" />
                      <col style="width: 65%" />
                      <col style="width: 10%" />
                      <col style="width: 5%" />
                      <col style="width: 15%" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>작성일</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(notice, index) in notices"
                        :key="notice.no"
                        @click="getNoticeDetail(notice.no)"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>
                          <a>
                            {{ notice.subject }}
                          </a>
                        </td>
                        <td>{{ notice.uid }}</td>
                        <td>{{ notice.hit }}</td>
                        <td>{{ notice.regTime }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="text-center" v-else>공지사항이 없습니다.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Header>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
const userStore = "userStore";

export default {
  props: ["notice_no"],
  name: "NoticeList",
  components: { NavbarCommon },

  data() {
    return {
      notices: [],
    };
  },
  mounted() {
    this.getNoticeList();
  },
  computed: {
    ...mapState(userStore, ["isLogin", "userInfo"]),
  },

  methods: {
    getNoticeList() {
      this.$axios
        .get("http://localhost:8080/api/notices", {
          headers: {},
        })
        .then((res) => {
          this.notices = res.data.notices; //서버에서 데이터를 목록으로 보내므로 바로 할당하여 사용할 수 있다.
        })
        .catch((err) => {
          if (err.message.indexOf("Network Error") > -1) {
            alert("네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.");
          }
        });
    },
    getNoticeDetail(getno) {
      this.getno = getno;
      this.$router.push({
        path: `/notice-detail/${getno}`,
        query: this.getno,
      });
    },
    addNotice() {
      this.$router.push({
        path: "/notice-write",
      });
    },
  },
};
</script>
<style></style>
