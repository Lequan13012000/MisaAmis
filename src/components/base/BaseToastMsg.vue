<template>
<div>
  <div class="base-toast-msg" v-show="isActiveToastMsg">
       <div class="m-toast-msg-icon"></div>
    <div class="base-toast-msg__text">Bạn đã xóa câu hỏi thành công</div>
      <div class="m-icon m-icon--close-toast-msg"></div>
  </div>
   <div class="base-toast-msg" v-show="isActiveToastMsgExercise">
       <div class="m-toast-msg-icon"></div>
    <div class="base-toast-msg__text">Bạn đã xóa bài tập thành công</div>
      <div class="m-icon m-icon--close-toast-msg"></div>
  </div>
</div>

</template>

<script>
import {mapState} from "vuex";
export default {
  name: "BaseToastMsg",
   computed: {
    ...mapState("toastMessage", ["isActiveToastMsg","isActiveToastMsgExercise"]),
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>

.base-toast-msg {
  position: fixed;
  z-index: 10000;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  height: 75px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba($color: #000000, $alpha: 0.16);
  .m-toast-msg-icon{
  width: 32px;
  height: 32px;
  margin: 16px 10px 12px 5px;
  background-image: url("../../assets/icon/ic_ToastMessage_Success.png");
  background-size: contain;
  background-repeat: no-repeat;
  }
//   &__icon {
//     display: flex;
//     align-items: center;
//     padding-left: 18px;
//     padding-right: 18px;
//     border-left: 3px solid #5ec576;
//     &--success {
//       border-color: #5ec576 ;
//     }
//     &--danger {
//       border-color: red;
//     }
//   }
  &__text {
    font-size: 16px;
    font-weight: 500;
    color: black;
    // min-width: 350px;
  }
  &__close {
    border: none;
    outline: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    padding: 0;
    margin-left: 18px;
    cursor: pointer;
  }
}
</style>