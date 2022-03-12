<template>
  <div class="the-container">
    <BaseLoading v-if="isLoading" />
    <transition name="transition-fade">
      <ConfirmDeletePopup v-if="isActiveConfirmDeletePopup" />
    </transition>
    <transition name="transition-fade">
      <WarningPopup v-if="isActiveWarningPopup" />
    </transition>
    <transition name="transition-fade">
      <BaseToastMsg v-if="isActiveToastMsg" />
    </transition>
    <TheNavbar v-if="isActiveNavbar" />
    <router-view />
  </div>
</template>

<script>
import BaseLoading from "../base/BaseLoading.vue";
import ConfirmDeletePopup from "../common/ConfirmDeletePopup.vue";
import WarningPopup from "./ConfirmDeleteExercise.vue";
import BaseToastMsg from "../base/BaseToastMsg.vue";
import { mapState } from "vuex";

export default {
  name: "TheContainer",
  components: {
    BaseLoading,
    ConfirmDeletePopup,
    WarningPopup,
    BaseToastMsg,
  },
  computed: {
    ...mapState({
      /**
       * is loading
       * @author: LEQUAN(24/02/2022)
       */
      isLoading: (state) => state.loading.isLoading,

      /**
       * is active confirm delete popup
       * @author: LEQUAN(24/02/2022)
       */
      isActiveConfirmDeletePopup: (state) => state.confirmDeletePopup.isActive,

      /**
       * is active warning popup
       * @author: LEQUAN(24/02/2022)
       */
      isActiveWarningPopup: (state) => state.warningPopup.isActive,

      /**
       * is active navbar
       * @author: LEQUAN(24/02/2022)
       */
      isActiveNavbar: (state) => state.isActiveNavbar,

      /**
       * is active tost msg
       * @author: LEQUAN(24/02/2022)
       */
      isActiveToastMsg: (state) => state.toastMsg.isActive,
    }),
  },
};
</script>

<style lang="scss" scoped>
.the-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  // max-width: 1366px;
  width: 100%;
  background-color: #fff;
  margin: 0 auto;
}
</style>