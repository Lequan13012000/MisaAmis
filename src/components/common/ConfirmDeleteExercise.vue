<template>
  <div class="el-overlay" v-show="isActiveDeleteExercise">
    <div class="el-message-box">
      <div class="el-message-box__header">
        <div class="el-message-box__title">
          <span>EMIS Ôn tập</span>
        </div>
      </div>
      <div class="el-message-box__content">
        <div class="el-message-box__container">
          <div class="el-message-box__message">
            <p>Bạn có chắc muốn xóa bài tập này không ?</p>
          </div>
        </div>
      </div>
      <div class="el-message-box__btns">
        <BaseButton @click.native="closeDeleteExercise">Hủy bỏ</BaseButton>
        <BaseButton
          style="background-color: #8a6bf6; color: #fff"
          @click.native="deleteExercise"
          >Xóa</BaseButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BaseButton from "../base/BaseButton.vue";
export default {
  components: {
    BaseButton,
  },
  computed: {
    ...mapState("confirmDeleteExercise", ["isActiveDeleteExercise", "value"]),
  },
  methods: {
    closeDeleteExercise() {
      this.$store.commit("confirmDeleteExercise/closeDeleteExercise");
    },
    deleteExercise() {
      this.$store.dispatch("exerciseList/deleteExercise", this.value);
      this.$store.commit("toastMessage/openToastMsgExercise");
      setTimeout(() => {
        this.$store.commit("toastMessage/closeToastMsgExercise");
      }, 2000);
      this.closeDeleteExercise();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-overlay {
  z-index: 10000;
  text-align: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-message-box {
    padding: 0;
    width: 414px;
    display: inline-block;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    text-align: left;
    overflow: hidden;
    backface-visibility: hidden;
    vertical-align: middle;
    .el-message-box__header {
      padding: 10px 16px;
      background-color: #eaebf5;
      position: relative;
      .el-message-box__title {
        padding-left: 0;
        margin-bottom: 0;
        font-size: 18px;
        line-height: 1;
        color: #303133;
      }
    }
    .el-message-box__content {
      padding: 24px 24px 0;
      color: #606266;
      font-size: 14px;
      .el-message-box__container {
        position: relative;
        .el-message-box__message {
          color: #4e5b6a;
          margin: 0;
          p {
            margin: 0;
            line-height: 24px;
          }
        }
      }
    }
    .el-message-box__btns {
      padding: 24px;
      display: flex;
      justify-content: flex-end;
      text-align: right;
    }
  }
}
</style>