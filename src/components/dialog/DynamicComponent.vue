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
                      @input="handleSelectQuestion"
                    />
                  </div>
                </div>
              </div>
              <div
                class="ckeditor"
                :class="{
                  essay: selectQuestion === 4,
                  ChooseAnswer: selectQuestion === 1,
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
          <BaseButton
            @click.native="
              hiddenQuestionType();
              saveComposeQuestion();
            "
            class="button-save"
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
    BasePopupValidate
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
        hint: "",
      },
    };
  },
  watch: {
    isShowQuestionType(newValue) {
      if (newValue) {
        this.questions.answers = this.$store.state.questionType.answers;
        this.questions.content = this.$store.state.questionType.content;
        this.questions.attachments = this.$store.state.questionType.attachments;
        this.questions.type = this.$store.state.questionType.selectQuestion;
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
     * Click vào button thêm đấp án
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
      this.$store.dispatch("exercise/saveExercise", {
        question: this.questions,
        idx: this.$store.state.questionType.index,
        callback: (exerciseId) => {
          this.$router.push(`/storage/${exerciseId}`);
        },
      });
    },
     /**
     * validate question
     * @returns true if valid else false
     * @author: BMThang(28/01/2022)
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
            this.questions.content
          );
      }

      if (this.selectQuestion === 4) {
        // validate text question
        errors = this.validateTextQuestion(this.questions.content);
      }

      if (errors.length > 0) {
        // if invalid => open warning popup
        isValid = false;
        this.$store.commit("", errors);
      }

      return isValid;
    },
     /**
     * validate choose answer question, choose correct or wrong question, fill blank question
     * @param {object} questionData question data
     * @param {string} questionNumber question number (if has question number => this question is a child question of a group question)
     * @returns {array} error list
     * @author: BMThang(28/01/2022)
     */
    validateChooseAnswerQuestionChooseCorrectOrWrongQuestionFillBlank(
      questionData,
      questionNumber = ""
    ) {
      // error list
      const errors = [];
      if (
        questionData.content === "" &&
        questionData.attachments.length === 0 &&
        !questionNumber
      ) {
        // if question content is empty and question attachments is empty and question number is not empty => add error
        errors.push(resource.typeQuestionContentText);
      }
      if (
        questionData.answers.every(
          (answer) => answer.content === "" && !answer.attachment
        ) ||
        questionData.answers.some(
          (answer) =>
            answer.content === "" && !answer.attachment && answer.isCorrect
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
      if (questionData.answers.every((answer) => answer.isCorrect === false)) {
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
     * @author: BMThang(28/01/2022)
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
            .ChooseAnswer {
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
