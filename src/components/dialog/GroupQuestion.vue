<template>
  <div class="group-question">
    <div class="group-question__left">
      <div
        :class="[
          'group-question-question-btn',
          {
            'group-question-question-btn--active':
              idx === idxOfSelectedQuestion,
          },
        ]"
        v-for="(buttonQuestion, idx) in buttonsFromQuestions"
        :key="idx"
      >
        <button @click="selectQuestion(idx)">
          {{ buttonQuestion }}
        </button>
        <div
          class="group-question-question-btn__remove"
          @click="deleteQuestion(idx)"
        >
          x
        </div>
      </div>
      <div class="group-question-question-btn">
        <button @click="addQuestion">+</button>
      </div>
    </div>
    <div class="group-question__right">
      <div class="group-question-content">
        <div class="group-question-content__combobox">
          <div class="question-number">
            {{ questionNumber }}
          </div>
          <div class="question-combobox">
            <BaseCombobox
              :dataOptions="questionTypeOptions"
              fieldValue="value"
              fieldDisplay="label"
              placeholder="Chọn đáp án"
              ref="childCombobox"
              v-model="typeOfSelectedQuestion"
              @input="handleChangeQuestionType"
            />
          </div>
        </div>
        <div
          class="group-question-content__content"
          :class="{
            essay: typeOfSelectedQuestion === 4,
            ChooseAnswer: typeOfSelectedQuestion === 1,
          }"
        >
          <CkEditorQuestion
            :value="contentOfSelectedQuestion"
            @input="handleInputQuestionContent"
          />
          <div class="question-attachments">
            <QuestionAttachment
              id="group-question-attachments"
              name="group-question-attachments"
              :value="attachmentsOfSelectedQuestion"
              @input="handleChangeAttachments"
            />
          </div>
        </div>
      </div>
      <div class="group-question-answers">
        <component
          v-bind:is="currentComponent"
          :value="answersOfSelectedQuestion"
          @input="handleChangeAnswers"
          @removeAnswer="removeAnswer"
          @onDelete="removeAnswer"
        />
      </div>
    </div>
    <div class="group-question__additional-btn" v-if="isActiveAdditionalBtn">
      <BaseButton @click.native="addAnswer">{{ addAnswerBtnText }}</BaseButton>
    </div>
  </div>
</template>

<script>
import CkEditorQuestion from "../base/CkEditorQuestion.vue";
import ChooseAnswer from "../dialog/ChooseAnswer.vue";
import TrueFalseAnswer from "../dialog/TrueFalseAnswer.vue";
import FillBlankAnswer from "../dialog/FillBlankAnswer.vue";
import EssayAnswer from "../dialog/EssayAnswer.vue";
import QuestionAttachment from "../base/QuestionAttachment.vue";
import BaseCombobox from "../base/BaseCombobox.vue";
import BaseButton from "../base/BaseButton.vue";

const QUESTION_TYPE_OPTIONS = [
  {
    value: 1,
    label: "Chọn đáp án",
  },
  {
    value: 2,
    label: "Đúng sai",
  },
  {
    value: 3,
    label: "Điền vào chỗ trống",
  },
  {
    value: 4,
    label: "Tự luận",
  },
  {
    value: 6,
    label: "Ghép nối",
  },
  {
    value: 5,
    label: "Câu hỏi nhóm",
  },
];

export default {
  name: "GroupQuestion",
  components: {
    CkEditorQuestion,
    BaseCombobox,
    ChooseAnswer,
    TrueFalseAnswer,
    FillBlankAnswer,
    EssayAnswer,
    QuestionAttachment,
    BaseButton,
  },
  props: {
    value: {
      type: Array,
      default: () => [
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
      ],
    },
    isActiveNumber: { type: Boolean, default: false },
    numberOfParentQuestion: { type: Number, default: 1 },
  },
  emits: ["input"],
  data() {
    return {
      idxOfSelectedQuestion: 0,
      typeOfSelectedQuestion: { ...this.value[0] }.type,
    };
  },
  computed: {
    contentOfSelectedQuestion() {
      return this.value[this.idxOfSelectedQuestion].content;
    },

    answersOfSelectedQuestion() {
      return this.value[this.idxOfSelectedQuestion].answers;
    },

    attachmentsOfSelectedQuestion() {
      return this.value[this.idxOfSelectedQuestion].attachments;
    },

    questionTypeOptions() {
      return QUESTION_TYPE_OPTIONS;
    },

    addAnswerBtnText() {
      if (this.value[this.idxOfSelectedQuestion].type === 1) {
        return "Thêm đáp án";
      }
      if (this.value[this.idxOfSelectedQuestion].type === 3) {
        return "Thêm ô trống";
      }
      return "";
    },

    isActiveAdditionalBtn() {
      return (
        this.value[this.idxOfSelectedQuestion].type === 1 ||
        this.value[this.idxOfSelectedQuestion].type === 3
      );
    },

    questionNumber() {
      // set number of question by it's index
      const numberOfQuestion =
        this.idxOfSelectedQuestion + this.numberOfParentQuestion;
      if (this.isActiveNumber) {
        // set child question number
        return `Câu ${this.numberOfParentQuestion}.${
          this.idxOfSelectedQuestion + 1
        } - `;
      }
      return `Câu ${numberOfQuestion} - `;
    },

    buttonsFromQuestions() {
      return this.value.map((_, idx) => {
        if (this.isActiveNumber) {
          return `${this.numberOfParentQuestion}.${idx + 1}`;
        }
        return `${this.numberOfParentQuestion + idx}`;
      });
    },

    /**
     * Chọn loại câu hỏi
     * CreatedBy: LEQUAN (11/02/2022)
     */
    currentComponent() {
      switch (this.value[this.idxOfSelectedQuestion].type) {
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
  methods: {
    onDelete() {},

    handleChangeQuestionType() {
      const newQuestions = [...this.value];
      const newQuestion = { ...newQuestions[this.idxOfSelectedQuestion] };
      newQuestion.type = this.typeOfSelectedQuestion;
      switch (this.typeOfSelectedQuestion) {
        case 1:
          newQuestion.answers = [
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
          break;
        case 2:
          newQuestion.answers = [
            {
              content: "Đúng",
              incorrect: false,
            },
            {
              content: "Sai",
              incorrect: false,
            },
          ];
          break;
        case 3:
          newQuestion.answers = [
            {
              content: "",
              incorrect: false,
            },
          ];
          break;
        case 4:
          newQuestion.answers = [];
          break;
        default:
          break;
      }
      newQuestions.splice(this.idxOfSelectedQuestion, 1, newQuestion);
      this.$emit("input", newQuestions);
    },

    handleInputQuestionContent(questionContent) {
      const newQuestions = [...this.value];
      const newQuestion = { ...this.value[this.idxOfSelectedQuestion] };
      newQuestion.content = questionContent;
      newQuestions.splice(this.idxOfSelectedQuestion, 1, newQuestion);
      this.$emit("input", newQuestions);
    },

    handleChangeAttachments(attachments) {
      const newQuestions = [...this.value];
      const newQuestion = { ...this.value[this.idxOfSelectedQuestion] };
      newQuestion.attachments = attachments;
      newQuestions.splice(this.idxOfSelectedQuestion, 1, newQuestion);
      this.$emit("input", newQuestions);
    },

    handleChangeAnswers(answers) {
      const newQuestions = [...this.value];
      const newQuestion = { ...this.value[this.idxOfSelectedQuestion] };
      newQuestion.answers = [...answers];
      newQuestions.splice(this.idxOfSelectedQuestion, 1, newQuestion);
      this.$emit("input", newQuestions);
    },

    addAnswer() {
      const newQuestions = [...this.value];
      const newQuestion = { ...this.value[this.idxOfSelectedQuestion] };
      const newAnswer = {
        content: "",
        attachment: null,
        incorrect: false,
      };
      if (newQuestion.type === 3) {
        newAnswer.incorrect = true;
      }
      newQuestion.answers.push(newAnswer);
      this.$emit("input", newQuestions);
    },

    removeAnswer(answerIndex) {
      const newQuestions = [...this.value];
      const newQuestion = { ...this.value[this.idxOfSelectedQuestion] };
      newQuestion.answers.splice(answerIndex, 1);
      newQuestions.splice(this.idxOfSelectedQuestion, 1, newQuestion);
      this.$emit("input", newQuestions);
    },

    addQuestion() {
      const newQuestions = [...this.value];
      const questionType = this.value[this.idxOfSelectedQuestion].type;
      const answers = this.createAnswers(questionType);
      const newQuestion = {
        content: "",
        attachments: [],
        type: questionType,
        hint: "",
        answers,
      };
      newQuestions.push(newQuestion);
      this.$emit("input", newQuestions);
      this.idxOfSelectedQuestion = newQuestions.length - 1;
    },

    createAnswers(questionType) {
      switch (questionType) {
        case 1:
          return [
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
        case 2:
          return [
            {
              content: "Đúng",
              incorrect: false,
            },
            {
              content: "Sai",
              incorrect: false,
            },
          ];
        case 3:
          return [
            {
              content: "",
              incorrect: false,
            },
          ];
        case 4:
          return [];
        default:
          break;
      }
    },

    selectQuestion(idxOfQuestion) {
      this.idxOfSelectedQuestion = idxOfQuestion;
    },

    deleteQuestion(idx) {
      if (this.value.length === 1) {
        // if question list has no question => display warning popup
        console.log("Không thể xóa toàn bộ câu hỏi");
        return;
      }

      // clone question list
      const newQuestions = [...this.value];

      // remove selected question
      newQuestions.splice(idx, 1);

      // if index if selected question <= index of edited question => set index of edited question decrement by 1
      if (idx <= this.idxOfSelectedQuestion) {
        this.idxOfSelectedQuestion =
          this.idxOfSelectedQuestion > 0 ? this.idxOfSelectedQuestion - 1 : 0;
      }

      // emit input event with new question list
      this.$emit("input", newQuestions);
    },
  },
};
</script>

<style lang="scss" scoped>
.group-question {
  position: relative;
  display: flex;
  padding: 16px 16px 0 16px;
  &__left {
    padding-right: 16px;
    display: flex;
    flex-direction: column;
    .group-question-question-btn {
      position: relative;
      margin-bottom: 8px;
      background-color: rgba(123, 126, 142, 0.2);
      border-radius: 10px;
      button {
        background-color: transparent;
        height: 40px;
        width: 40px;
        border-radius: 10px;
        border: none;
        outline: none;
        cursor: pointer;
        color: #7b7e8e;
      }
      &__remove {
        position: absolute;
        top: -8px;
        right: -8px;
        font-size: 14px;
        font-weight: bold;
        background-color: #7b7e8e;
        height: 18px;
        width: 18px;
        text-align: center;
        border-radius: 50%;
        color: #fff;
        cursor: pointer;
      }
      &--active {
        background-color: #e8e1fd;
      }
    }
  }
  &__right {
    flex-grow: 1;
    .group-question-content {
      position: relative;
      &__combobox {
        border-radius: 10px 0 10px 0;
        height: 40px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        display: flex;
        align-items: center;
        background-color: #f8e373;
        .question-number {
          padding-left: 16px;
        }
        .question-combobox {
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
      &__content {
        position: relative;
        ::v-deep .ck-reset {
          min-height: 200px;
          display: flex;
          flex-direction: column;
          border-radius: 10px;
          overflow: hidden;
          .ck-editor__main {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            .ck-content {
              flex-grow: 1;
            }
          }
        }
        .question-attachments {
          position: absolute;
          z-index: 100;
          bottom: 0;
          left: 0;
          ::v-deep .question-attachment {
            &__attachments {
              margin-top: 0;
              margin-bottom: 0;
              padding-left: 0;
            }
          }
        }
      }
    }
  }
  &__additional-btn {
    position: fixed;
    top: calc((100vh / 2) + 330px);
    left: calc((100vw / 2) - 596px);
    z-index: 999999;
  }
}
</style>