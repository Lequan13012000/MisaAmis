<template>
  <div
    class="el-overlay-dynamic"
    v-show="isShowQuestionType && exercise.questions"
  >
    <div class="el-dialog">
      <div class="el-dialog__body">
        <div class="h-fulL">
          <div class="ms-form">
            <div class="dialog-content">
              <div class="choose-question-type">
                <div class="question-index">
                  <div class="number-no" v-if="isActiveNumber">
                    Câu
                    {{
                      idxOfSelectedQuestion !== undefined
                        ? idxOfSelectedQuestion + 1
                        : exercise.questions.length > 0
                        ? Math.floor(
                            Number(
                              exercise.questions[exercise.questions.length - 1]
                                .number
                            )
                          ) + 1
                        : 1
                    }}
                    -
                  </div>
                  <div class="ms-combo-box">
                    <BaseCombobox
                      class="custom-combobox"
                      :dataOptions="dynamics"
                      fieldValue="value"
                      fieldDisplay="label"
                      placeholder="Chọn đáp án"
                      ref="childCombobox"
                      v-model="selectQuestion"
                      @input="handleSelectQuestion"
                    />
                  </div>
                  <div
                    class="toggle-question-number"
                    v-if="selectQuestion === 5"
                  >
                    <BaseToggleButton
                      id="toggle-question-number"
                      name="toggle-question-number"
                      label="Đánh số thứ tự cho câu hỏi nhỏ"
                      v-model="isActiveNumber"
                    />
                  </div>
                </div>
              </div>
              <div
                class="ckeditor"
                :class="{
                  essay: selectQuestion === 4,
                  ChooseAnswer:
                    selectQuestion === 1 ||
                    selectQuestion === 2 ||
                    selectQuestion === 3,
                }"
              >
                <CkEditorQuestion v-model="questions.content" />
                <QuestionAttachment
                  id="attachment"
                  name="attachment"
                  v-model="questions.attachments"
                />
              </div>
              <keep-alive>
                <component
                  v-if="questions.type === 5"
                  v-bind:is="currentComponent"
                  v-model="questions.questions"
                  :isActiveNumber="isActiveNumber"
                  :numberOfParentQuestion="
                    idxOfSelectedQuestion === undefined
                      ? exercise.questions.length + 1
                      : idxOfSelectedQuestion + 1
                  "
                  @removeAnswer="removeAnswer"
                  @onDelete="onDelete"
                />
                <component
                  v-else
                  v-bind:is="currentComponent"
                  v-model="questions.answers"
                  @removeAnswer="removeAnswer"
                  @onDelete="onDelete"
                />
              </keep-alive>
            </div>
          </div>
        </div>
      </div>
      <div class="el-dialog__footer">
        <div class="toolbar-left" v-if="selectQuestion === 1">
          <BaseButton @click.native="addAnswer">Thêm đáp án</BaseButton>
        </div>
        <div class="toolbar-left" v-if="selectQuestion === 3">
          <BaseButton @click.native="addAnswer">Thêm ô trống</BaseButton>
        </div>
        <div class="toolbar-right">
          <BaseButton @click.native="showHideQuestionType">Hủy</BaseButton>
          <BaseButton @click.native="saveComposeQuestion()" class="button-save"
            >Lưu</BaseButton
          >
        </div>
      </div>
    </div>
    <BasePopupValidate />
  </div>
</template>

<script>
import CkEditorQuestion from "../base/CkEditorQuestion.vue";
import BaseButton from "../base/BaseButton.vue";
import BaseCombobox from "../base/BaseCombobox.vue";
import "../../element-variables.scss";
import { mapState } from "vuex";
// import { mapMutations } from 'vuex';
import ChooseAnswer from "../dialog/ChooseAnswer.vue";
import TrueFalseAnswer from "../dialog/TrueFalseAnswer.vue";
import FillBlankAnswer from "../dialog/FillBlankAnswer.vue";
import EssayAnswer from "../dialog/EssayAnswer.vue";
import QuestionAttachment from "../base/QuestionAttachment.vue";
import BasePopupValidate from "../base/BasePopupValidate.vue";
import GroupQuestion from "../dialog/GroupQuestion.vue";
import BaseToggleButton from "../base/BaseToggleButton.vue";
// resource
import resource from "../../scripts/resource";
export default {
  components: {
    // component soạn văn bản
    CkEditorQuestion,
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
    // tệp đính kèm
    QuestionAttachment,
    // popup validate câu hỏi
    BasePopupValidate,
    GroupQuestion,
    BaseToggleButton,
    resource,
  },
  data() {
    return {
      questions: {
        type: null,
        attachments: [],
        content: "",
        answers: [
          {
            content: "",
            incorrect: false,
            image: null,
          },
          {
            content: "",
            incorrect: false,
            image: null,
          },
          {
            content: "",
            incorrect: false,
            image: null,
          },
          {
            content: "",
            incorrect: false,
            image: null,
          },
        ],
        questions: [],
        hint: "",
      },
      isActiveNumber: true,
      idxOfSelectedQuestion: undefined,
    };
  },
  watch: {
    isShowQuestionType(newValue) {
      if (newValue) {
        this.questions.answers = this.$store.state.questionType.answers;
        this.questions.content = this.$store.state.questionType.content;
        this.questions.attachments = this.$store.state.questionType.attachments;
        this.questions.type = this.$store.state.questionType.selectQuestion;
        this.questions.questions = this.$store.state.questionType.questions;
        this.questions.sortOrder = this.$store.state.questionType.sortOrder;
        this.questions.id = this.$store.state.questionType.id;
        this.idxOfSelectedQuestion = this.$store.state.questionType.index;
        this.isActiveNumber = true;
      }
    },
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
    showHideQuestionType() {
      this.$store.commit("questionType/showHideQuestionType");
    },
    /**
     * Ẩn hiện form chọn câu hỏi hiển thị form soạn câu hỏi
     * CreatedBy: LEQUAN (11/02/2022)
     */
    showComposeHideToolBar() {
      this.$store.commit("composeQuestion/showComposeHideToolBar");
    },
    /**
     * Ẩn hiện form chọn câu hỏi hiển thị form soạn câu hỏi
     * CreatedBy: LEQUAN (11/02/2022)
     */
    hiddenQuestionType() {
      this.$store.commit("questionType/hiddenQuestionType");
    },
    /**
     * Click vào button thêm đấp án câu hỏi chọn đáp án
     * CreatedBy: LEQUAN (22/02/2022)
     */
    addAnswer() {
      this.questions.answers.push({
        content: "",
        incorrect: false,
      });
    },
    
    /**
     * hàm xóa đáp án câu hỏi chọn đáp án
     * CreatedBy: LEQUAN (11/02/2022)
     */
    removeAnswer(index) {
      this.questions.answers.splice(index, 1);
    },
    /**
     * hàm xóa đáp án câu hỏi điền từ
     * CreatedBy: LEQUAN (11/02/2022)
     */
    onDelete(index) {
      console.log("xóa ô trống điền từ");
      this.questions.answers.splice(index, 1);
    },
    handleSelectQuestion() {
      this.isActiveNumber = true;
      this.questions.type = this.selectQuestion;
      switch (this.selectQuestion) {
        case 1:
          this.questions.answers = [
            {
              content: "",
              incorrect: false,
            },
            {
              content: "",
              incorrect: false,
            },
            {
              content: "",
              incorrect: false,
            },
            {
              content: "",
              incorrect: false,
            },
          ];
          return;
        case 2:
          this.questions.answers = [
            {
              content: "Đúng",
              incorrect: false,
            },
            {
              content: "Sai",
              incorrect: false,
            },
          ];
          return;
        case 3:
          this.questions.answers = [
            {
              content: "",
              incorrect: false,
            },
          ];
          return;
        case 4:
          this.questions.answers = [];
          return;
        case 5:
          this.questions.answers = [];
          this.questions.questions = [
            {
              type: 1,
              content: "",
              attachments: [],
              hint: "",
              answers: [
                {
                  content: "",
                  incorrect: false,
                },
                {
                  content: "",
                  incorrect: false,
                },
                {
                  content: "",
                  incorrect: false,
                },
                {
                  content: "",
                  incorrect: false,
                },
              ],
            },
          ];
          break;
        default:
          return;
      }
    },
    /**
     * Lưu dữ liệu câu hỏi và đáp ấn
     * CreateBy:LEQUAN(17/2/2022)
     */
    saveComposeQuestion() {
      // validate
      if (!this.validateQuestion()) {
        return;
      }
      this.$store.commit("loading/openLoading");
      if (this.questions.type === 5) {
        // add group question
        let parentId = this.questions.id;
        if (parentId === undefined || parentId === null) {
          parentId =
            this.exercise.parentQuestions.length === 0
              ? 0
              : this.exercise.parentQuestions[
                  this.exercise.parentQuestions.length - 1
                ].id + 1;
        }

        // new parent question data
        const parentQuestion = {
          attachments: this.questions.attachments,
          content: this.questions.content,
          id: parentId,
          isActiveNumber: this.isActiveNumber,
        };

        const questions = [];
        // add children questions to question list
        this.questions.questions.forEach((question) => {
          questions.push({ ...question, parentId });
        });
        this.$store.dispatch("exercise/saveExercise", {
          question: null,
          idx: this.$store.state.questionType.sortOrder,
          parentQuestion,
          questions,
          callback: (exerciseId) => {
            this.hiddenQuestionType();
            if (exerciseId) this.$router.push(`/storage/${exerciseId}`);
          },
        });
      } else {
        // add normal question
        this.$store.dispatch("exercise/saveExercise", {
          question: this.questions,
          idx: this.$store.state.questionType.sortOrder,
          callback: (exerciseId) => {
            this.hiddenQuestionType();
            if (exerciseId) this.$router.push(`/storage/${exerciseId}`);
          },
        });
      }
      setTimeout(() => {
        this.$store.commit("loading/closeLoading");
      }, 500);
    },
    /**
     * validate question
     * @returns true if valid else false
     * @author: LEQUAN(28/01/2022)
     */
    validateQuestion() {
      let isValid = true;

      // error list
      let errors = [];
      if (
        this.selectQuestion === 1 ||
        this.selectQuestion === 2 ||
        this.selectQuestion === 3
      ) {
        // validate choose answer question, choose correct or wrong question, fill blank question
        errors =
          this.validateChooseAnswerQuestionChooseCorrectOrWrongQuestionFillBlank(
            this.questions
          );
      }

      if (this.selectQuestion === 4) {
        // validate text question
        errors = this.validateTextQuestion(this.questions);
      }

      if (errors.length > 0) {
        // if invalid => open warning popup
        isValid = false;
        this.$store.commit("warningPopup/openWarningPopup", errors);
      }

      return isValid;
    },
    /**
     * validate choose answer question, choose correct or wrong question, fill blank question
     * @param {object} questionData question data
     * @param {string} questionNumber question number (if has question number => this question is a child question of a group question)
     * @returns {array} error list
     * @author: LEQUAN(28/01/2022)
     */
    validateChooseAnswerQuestionChooseCorrectOrWrongQuestionFillBlank(
      questionData,
      questionNumber = ""
    ) {
      // error list
      const errors = [];
      if (
        questionData.content === "" &&
        questionData.attachments.length === 0
        // &&!questionNumber
      ) {
        // if question content is empty and question attachments is empty and question number is not empty => add error
        errors.push(resource.typeQuestionContentText);
      }
      if (
        questionData.answers.every((answer) => answer.content === "") ||
        questionData.answers.some(
          (answer) => answer.content === "" && answer.incorrect
        )
      ) {
        // if every answer is empty or some answer is correct but content is empty => add error
        errors.push(
          `${resource.typeAnswerContentText}${
            questionNumber
              ? resource.typeAnswerContentText2 + questionNumber
              : ""
          }`
        );
      }
      if (questionData.answers.every((answer) => answer.incorrect === false)) {
        // if every answer is incorrect => add error
        errors.push(
          `${resource.noCorrectAnswerWaringText}${
            questionNumber
              ? resource.typeAnswerContentText2 + questionNumber
              : ""
          }`
        );
      }

      return errors;
    },

    /**
     * validate text question
     * @param {object} questionData question data
     * @returns {array} error list
     * @author: LEQUAN(28/01/2022)
     */
    validateTextQuestion(questionData) {
      const errors = [];
      if (
        questionData.content === "" &&
        questionData.attachments.length === 0
      ) {
        // if question content is empty or question attachments is empty => add error
        errors.push(resource.typeQuestionContentText);
      }
      return errors;
    },
  },
  computed: {
    ...mapState("questionType", ["dynamics", "isShowQuestionType"]),
    ...mapState("exercise", ["exercise"]),
    //...mapState("warningPopup", ["exercise"]),
    selectQuestion: {
      get() {
        return this.$store.state.questionType.selectQuestion;
      },
      set(value) {
        this.$store.commit("questionType/questionType", value);
      },
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
        case 5:
          return GroupQuestion;
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

  // overflow: auto;
  .el-dialog {
    // overflow: scroll;
    margin-top: 24px;
    width: 1192px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgb(0 0 0 / 16%);
    // height: calc(100vh - 104px);
    height: 650px;
    margin-bottom: 0;
    background-color: #fff2ab;
    position: relative;
    margin: 0 auto 50px;
    background: #ffffff;
    margin-top: 24px;
    .el-dialog__body {
      padding: 0 24px 24px;
      word-break: break-word;
      border-radius: 10px;
      overflow: scroll;
      padding-bottom: 0 !important;
      background-color: #fff;
      overflow-x: hidden;
      height: 100%;
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
                // width: 300px;
                .number-no {
                  font-size: 16px;
                  font-weight: 700;
                  color: #4e5b6a;
                }
                .toggle-question-number {
                  padding-right: 20px;
                }
                .ms-combo-box {
                  .custom-combobox {
                    ::v-deep .el-input__inner {
                      padding-right: 30px;
                      background-color: #f8e373;
                      border: none;
                      padding-left: 5px;
                      width: 245px;
                      font-size: 16px;
                      font-weight: 700;
                      color: #4e5b6a;
                      &::placeholder {
                        font-size: 16px;
                        font-weight: 700;
                        color: #8e9085;
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
                .ck-editor__editable {
                  border: none;
                  height: 100%;
                }
              }
            }
            .ChooseAnswer {
              ::v-deep .ck-editor__main {
                height: 200px;
                .ck-editor__editable {
                  border: none;
                  height: 100%;
                }
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
