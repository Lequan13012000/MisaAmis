<template>
  <div class="the-container">
    <BaseLoading v-if="isLoading" />
    <transition name="transition-fade">
      <ConfirmDeletePopup v-if="isActive" />
    </transition>
    <transition name="transition-fade">
      <ConfirmDeleteExercise v-if="isActiveDeleteExercise" />
    </transition>
    <transition name="transition-fade">
      <BaseToastMsg />
    </transition>

    <router-view />
  </div>
</template>

<script>
import BaseLoading from "../base/BaseLoading.vue";
import ConfirmDeletePopup from "../common/ConfirmDeletePopup.vue";
import ConfirmDeleteExercise from "../common/ConfirmDeleteExercise.vue";
import BaseToastMsg from "../base/BaseToastMsg.vue";
import { mapState } from "vuex";

export default {
  name: "TheContainer",
  components: {
    BaseLoading,
    ConfirmDeletePopup,
    ConfirmDeleteExercise,
    BaseToastMsg,
  },
  computed: {
    /**
     * is loading
     * @author: LEQUAN(24/02/2022)
     */
    // isLoading: (state) => state.loading.isLoading,
    ...mapState("loading", ["isLoading"]),

    /**
     * is active confirm delete popup
     * @author: LEQUAN(24/02/2022)
     */
    // isActiveConfirmDeletePopup: (state) => state.confirmDeletePopup.isActive,
    ...mapState("confirmDeletePopup", ["isActive"]),

    /**
     * is active warning popup
     * @author: LEQUAN(24/02/2022)
     */
    // isActiveWarningPopup: (state) => state.warningPopup.isActive,
    ...mapState("confirmDeleteExercise", ["isActiveDeleteExercise"]),
    /**
     * is active navbar
     * @author: LEQUAN(24/02/2022)
     */
    // isActiveNavbar: (state) => state.isActiveNavbar,

    /**
     * is active tost msg
     * @author: LEQUAN(24/02/2022)
     */
    // isActiveToastMsg: (state) => state.toastMsg.isActive,
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