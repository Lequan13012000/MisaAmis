<template>
  <div class="el-overlay-dynamic" v-show="isShowQuestionType">
    <div class="el-dialog">
      <div class="el-dialog__body">
        <div class="h-fulL">
          <div class="ms-form">
            <div class="dialog-content">
              <div class="choose-question-type">
                <div class="question-index">
                  <div class="number-no">Câu 1 -</div>
                  <div class="ms-combo-box">
                    <BaseCombobox
                      class="custom-combobox"
                      :dataOptions="dynamics"
                      fieldValue="value"
                      fieldDisplay="label"
                      placeholder="Chọn đáp án"
                      ref="childCombobox"
                      v-model="selectQuestion"
                    />
                  </div>
                </div>
              </div>
              <div class="ckeditor" :class="{ essay: selectQuestion === 4, ChooseAnswer: selectQuestion === 1}">
                <CkEditor />
              </div>
              <keep-alive>
                <component v-bind:is="currentComponent" />
              </keep-alive>
            </div>
          </div>
        </div>
      </div>
      <div class="el-dialog__footer">
        <div class="toolbar-left" v-if="selectQuestion === 1"><BaseButton>Thêm đáp án</BaseButton></div>
          <div class="toolbar-left" v-if="selectQuestion === 3"><BaseButton>Thêm ô trống</BaseButton></div>
        <div class="toolbar-right">
          <BaseButton @click.native="showHideQuestionType">Hủy</BaseButton>
          <BaseButton @click.native="showComposeHideToolBar();showHideQuestionType()" class="button-save" >Lưu</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CkEditor from "../base/CkEditor.vue";
import BaseButton from "../base/BaseButton.vue";
import BaseCombobox from "../base/BaseCombobox.vue";
import "../../element-variables.scss";
import { mapState } from "vuex";
import { mapMutations } from 'vuex';
import ChooseAnswer from "../dialog/ChooseAnswer.vue";
import TrueFalseAnswer from "../dialog/TrueFalseAnswer.vue";
import FillBlankAnswer from "../dialog/FillBlankAnswer.vue";
import EssayAnswer from "../dialog/EssayAnswer.vue";
export default {
  components: {
    // component soạn văn bản
    CkEditor,
    // component button
    BaseButton,
    // component combobox
    BaseCombobox,
    // component chọn đáp án
    ChooseAnswer,
    // component chọn đúng sai
    TrueFalseAnswer,
    // component điền vào chỗ trống
    FillBlankAnswer,
    // component câu hỏi tự luận
    EssayAnswer,
  },
  data() {
    return {
      // ẩn hiện question type
    
    };
  },
  methods: {
     /**
      * Ẩn hiện popup bổ sung thông tin
      * CreatedBy: LEQUAN (11/02/2022)
      */
    showHideDialog() {
      this.$refs.childDialogInfo.isShowHideDialog = true;
    },
    /**
      * Ẩn hiện popup lựa chọn loại câu hỏi
      * CreatedBy: LEQUAN (11/02/2022)
      */
     ...mapMutations["questionType",["showHideQuestionType","questionType"]],
     ...mapMutations["",["showComposeHideToolBar"]]

  },
  computed: {
    ...mapState(["dynamics","isShowQuestionType"]),
    selectQuestion:{
  get () {
      return this.$store.state.selectQuestion;
    },
    set (value) {
      this.$store.commit('questionType',value);
    }
    },
     /**
      * Chọn loại câu hỏi
      * CreatedBy: LEQUAN (11/02/2022)
      */
        currentComponent() {
      switch (this.selectQuestion) {
        case 1:
          return ChooseAnswer;
        case 2:
          return TrueFalseAnswer;
        case 3:
          return FillBlankAnswer;
        case 4:
          return EssayAnswer;
        default:
          return ChooseAnswer;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-overlay-dynamic {
  z-index: 2451;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  .el-dialog {
    margin-top: 24px;
    width: 1192px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgb(0 0 0 / 16%);
    height: calc(100vh - 104px);
    margin-bottom: 0;
    background-color: #fff2ab;
    position: relative;
    margin: 0 auto 50px;
    background: #ffffff;
    margin-top: 84px;
    .el-dialog__body {
      padding: 0 24px 24px;
      word-break: break-word;
      border-radius: 10px;
      height: 100%;
      overflow: auto;
      padding-bottom: 0 !important;
      background-color: #fff;
      overflow-x: hidden;
      .h-fulL {
        height: 100%;
        .ms-form {
          .dialog-content {
            margin: 0 -24px;
            position: relative;
            .choose-question-type {
              position: absolute;
              top: 0;
              left: 0;
              z-index: 999;
              display: flex;
              align-items: center;
              background-color: #f8e373;
              padding-left: 12px;
              border-radius: 0 0 10px 0;
              font-weight: 700;
              font-size: 16px;
              line-height: 24px;
              .question-index {
                display: flex;
                align-items: center;
                width: 300px;
                .number-no {
                  font-size: 16px;
                  font-weight: 700;
                  color: #4e5b6a;
                }
                .ms-combo-box {
                  .custom-combobox {
                    ::v-deep .el-input__inner {
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
              }
            }
            .essay {
              ::v-deep .ck-editor__main {
                border-color: var(--ck-color-base-border);
                height: 503px;
              }
            }
            .ChooseAnswer{
               ::v-deep .ck-editor__main {
                height: 220px;
              }
            }
            .ckeditor {
              --8ab4d502: 141.55px;
              width: 100%;
              background-color: #fff2ab;
              position: relative;
              --ck-border-radius: 10px;
              --ck-color-base-border: #b6b9ce;
              --ck-focus-ring: 1px solid #b6b9ce;
            }
           
          }
        }
      }
    }
    .el-dialog__footer {
      display: flex;
      // justify-content: space-between;
      padding: 16px 0;
      .toolbar-left {
      }
      .toolbar-right {
            position: absolute;
    right: 0;
        .button-save {
          border: none;
          background-color: #8a6bf6;
          color: #fff;
          margin-left: 12px;
        }
      }
    }
  }
}
</style>