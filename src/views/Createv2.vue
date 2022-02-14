<template>
  <div class="compose-exercise-font">
    <div class="header">
      <router-link to="/storage" class="btn--back">
        <div @click="backShowComposeHideToolBar">
          <img
            src="https://sisapapp.misacdn.net/lms/img/icon_back.8e4472f2.svg"
            alt=""
          /></div
      ></router-link>

      <div class="header__top">
        <div class="header__top__avatar">
          <img
            src="https://sisapapp.misacdn.net/lms/img/default.d2422f80.png"
            alt=""
          />
        </div>
        <div class="header__top__name">
          <input class="h3" placeholder="Nhập tên bài tập..." />
        </div>
      </div>
      <div class="header__bottom">
        <div class="header__bottom__left">
          <BaseCombobox placeholder="Chọn môn" style="width: 160px" />
          <BaseCombobox placeholder="Chọn khối" style="width: 100px" />
          <BaseButton  style="width: 142px"
            >Bố sung thông tin</BaseButton
          >
          <BaseButton>Đổi kiểu soạn</BaseButton>
        </div>
        <div class="header__bottom__right">
          <BaseButton>Làm thử</BaseButton>
          <BaseButton class="composing-button">Hoàn thành</BaseButton>
        </div>
      </div>
    </div>
    <div class="content">
      <Upload v-show="isShowToolBar" />
      <ToolBar v-show="isShowToolBar"/>
      <ComposeQuestion v-show="isShowComposeQuestion" />
    </div>
    <DynamicComponent/>
   
  </div>
</template>

<script>
import BaseButton from "../components/base/BaseButton.vue";
import BaseCombobox from "../components/base/BaseCombobox.vue";
import Upload from "../components/base/Upload.vue";
import ToolBar from "../components/base/ToolBar.vue";
import DynamicComponent from "../components/dialog/DynamicComponent.vue";
import ComposeQuestion from "../components/base/ComposeQuestion.vue"
import { mapState } from "vuex";
import { mapMutations } from 'vuex';
export default {
  
  components: {
    // component button
    BaseButton,
    // component combobox
    BaseCombobox,
    // component upload
    Upload,
    // component toolbar
    ToolBar,
    // component các lựa chọn dạng câu hỏi
    DynamicComponent,
    // component soạn câu hỏi
    ComposeQuestion
  },
  data() {
    return {
    }
  },
  methods: {
        ...mapMutations("composeQuestion",["backShowComposeHideToolBar","showComposeHideToolBar"]),
  },
   computed:{
     ...mapState("composeQuestion",["isShowToolBar","isShowComposeQuestion"])
  }
 
};
</script>

<style lang="scss" scoped>
.compose-exercise-font {
  height: 100%;
  .header {
    // height: 120px;
    box-shadow: 0 3px 20px rgb(90 125 141 / 16%);
    padding-left: 4rem;
    padding-right: 0.75rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    gap: 1rem;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    display: grid;
    position: relative;
    .btn--back {
      // cursor: pointer;
      left: 1.5rem;
      top: 1.25rem;
      position: absolute;
      img {
      }
    }
    .header__top {
      padding-right: 0.75rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      .header__top__avatar {
        border-radius: 9999px;
        width: 2.5rem;
        height: 2.5rem;
        img {
          object-fit: cover;
          border-radius: 9999px;
          width: 40px;
          height: 40px;
        }
      }
      .header__top__name {
        width: 100%;
        input.h3 {
          border: none;
          outline: none;
          color: #4e5b6a;
          width: 100%;
          font-weight: 700;
          font-size: 24px;
          line-height: 32px;
        }
      }
    }
    .header__bottom {
      display: flex;
      justify-content: space-between;
      .header__bottom__left {
        display: flex;
        gap: 0.75rem;
      }
      .header__bottom__right {
        gap: 0.75rem;
        display: flex;
        .composing-button {
          border: none;
          background-color: #8a6bf6;
          color: #fff;
        }
      }
    }
  }
  .content {
    position: relative;
    width: calc(100% - 344px);
    margin: 0 auto;
    height: calc(100% - 128px);
  }
  .custom-combobox {
    .el-input__inner {
      padding-right: 30px;
      background-color: #f8e373;
      border: none;
      padding-left: 5px;
      width: 245px;
      &::placeholder {
        font-size: 16px;
        font-weight: 700;
        color: #4e5b6a;
      }
    }
  }
}
</style>