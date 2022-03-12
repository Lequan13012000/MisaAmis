<template>
  <div>
    <div class="questions">
      <div class="container">
        <div
          class="compose-question"
          v-for="(compose, index) in formattedQuestions"
          :key="index"
        >
          <div class="question" v-if="compose">
            <div class="question__decore"></div>
            <div class="question_detail">
              <div class="question__content">
                <div class="content">
                  <div class="content__content">
                    <div class="content__index">{{ compose.number }}.</div>
                    <div class="content_text">
                      <div class="ckeditor-custom">
                        <div class="content-editor">
                          <p v-html="compose.content"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="content__attachments">
                    <div
                      class="ms-preview-container"
                      v-for="(attach, index) in compose.attachments"
                      :key="index"
                    >
                      <img
                        v-if="true"
                        :src="attach.src"
                        :alt="attach.name"
                        class="image-item"
                      />
                    </div>
                  </div>
                     <div class="question__answers">
                      <div class="answers">
                        <div
                          class="answer"
                          :class="{ answer_correct: answer.incorrect }"
                          v-for="(answer, index) in compose.answers"
                          :key="index"
                        >
                          <div class="answer__index">
                            {{ convertIndexToCharacter(index) }}
                          </div>
                          <div
                            class="ckeditor-custom"
                            v-html="answer.content"
                          ></div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              <div class="question_group" v-if="compose.type == 5">
                <div class="question" v-for="(question,index) in compose.questions" :key="index">
                  <div class="question_detail">
                    <div class="question__content">
                      <div class="content">
                        <div class="content__content">
                          <div class="content__index">{{ question.number }}.</div>
                          <div class="content_text">
                            <div class="ckeditor-custom">
                              <div class="content-editor">
                                <p v-html="question.content"></p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="content__attachments">
                          <div
                            class="ms-preview-container"
                            v-for="(attach, index) in question.attachments"
                            :key="index"
                          >
                            <img
                              v-if="true"
                              :src="attach.src"
                              :alt="attach.name"
                              class="image-item"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="question__answers">
                      <div class="answers">
                        <div
                          class="answer"
                          :class="{ answer_correct: answer.incorrect }"
                          v-for="(answer, index) in question.answers"
                          :key="index"
                        >
                          <div class="answer__index">
                            {{ convertIndexToCharacter(index) }}
                          </div>
                          <div
                            class="ckeditor-custom"
                            v-html="answer.content"
                          ></div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="question__toolbar">
                <div class="question__toolbar__validate"></div>
                <div class="toolbar">
                  <BaseButton @click.native="clickEditQuestion(index)"
                    >Chỉnh sửa
                  </BaseButton>
                  <BaseButton style="width: 48px"
                    ><span
                      ><img
                        src="https://sisapapp.misacdn.net/lms/img/ic_dublicate.797078fb.svg"
                        alt="" /></span
                  ></BaseButton>
                  <BaseButton
                    @click.native="clickDeleteQuestion(compose.sortOrder, compose.type)"
                    style="width: 48px"
                    ><span
                      ><img
                        src="https://sisapapp.misacdn.net/lms/img/icon_delete.2bb67a1b.svg"
                        alt="" /></span
                  ></BaseButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="toolbar-right">
      <div class="toolbar">
        <div class="question" @click="showHideQuestionType(1)">
          <img
            src="https://sisapapp.misacdn.net/lms/img/select.e468fb04.svg"
            alt=""
            class="question_icon"
          />
        </div>
        <div class="question" @click="showHideQuestionType(2)">
          <img
            src="https://sisapapp.misacdn.net/lms/img/yesorno.3a131375.svg"
            alt=""
            class="question_icon"
          />
        </div>
        <div class="question" @click="showHideQuestionType(3)">
          <img
            src="https://sisapapp.misacdn.net/lms/img/fill.23c37329.svg"
            alt=""
            class="question_icon"
          />
        </div>
        <div class="question" @click="showHideQuestionType(4)">
          <img
            src="https://sisapapp.misacdn.net/lms/img/essay.8abc9315.svg"
            alt=""
            class="question_icon"
          />
        </div>
        <div class="question">
          <img
            src="https://sisapapp.misacdn.net/lms/img/pairing.ab57347e.svg"
            alt=""
            class="question_icon"
          />
        </div>
        <div class="question" @click="showHideQuestionType(5)">
          <img
            src="https://sisapapp.misacdn.net/lms/img/group.447cc2ea.svg"
            alt=""
            class="question_icon"
          />
        </div>
      </div>
    </div>
    <confirmDeletePopup />
  </div>
</template>
<script>
import BaseButton from "../base/BaseButton.vue";
import { mapState } from "vuex";
import CommonJS from "../../scripts/commonJS";
import confirmDeletePopup from "../common/ConfirmDeletePopup.vue";
export default {
  components: {
    // component button
    BaseButton,
    confirmDeletePopup,
  },
  computed: {
    ...mapState("exercise", ["exercise"]),
    //formattedQuestions() {
    // if (this.$store.state.exercise.exercise.questions) {
    //   return this.$store.state.exercise.exercise.questions.map((question) => {
    //     const attachments = CommonJS.formattedAttachments(
    //       question.attachments
    //     );
    //     return { ...question, attachments };
    //   });
    // }
    // return null;
    //},
    formattedQuestions() {
      if (this.$store.state.exercise.exercise.questions) {
        const exerciseData = JSON.parse(
          JSON.stringify(this.$store.state.exercise.exercise)
        );
        const newQuestions = [];
        for (let index = 0; index < exerciseData.questions.length; index++) {
          const question = exerciseData.questions[index];
          question.attachments = CommonJS.formattedAttachments(
            question.attachments
          );
          if (question.parentId !== null && question.parentId !== undefined) {
            // is a child question if parent question
            if (
              exerciseData.questions[index - 1]?.parentId === question.parentId
            ) {
              // if parent question has added to new question => find it and add child question to parent question
              const founedQuestion = newQuestions.find(
                (parentQuestion) => parentQuestion?.id === question.parentId
              );
              founedQuestion.questions.push({ ...question });

              // if parent question is not active number => push null element to question list to increment index of question list
              if (!founedQuestion.isActiveNumber) {
                newQuestions.push(null);
              }
            } else {
              // this question is the first child of parent question => find parent question in parent question list
              const parentQuestion = exerciseData.parentQuestions.find(
                (parentQuestion) => parentQuestion.id === question.parentId
              );

              // push new question to new questions with type is group question
              newQuestions.push({
                ...parentQuestion,
                questions: [
                  {
                    ...question,
                  },
                ],
                attachments: CommonJS.formattedAttachments(
                  parentQuestion.attachments
                ),
                type: 5,
              });
            }
          } else {
            // is a normal question => push it to new question list
            newQuestions.push({ ...question });
          }
        }
        return newQuestions;
      }
      return null;
    },

    formattedQuestionsData() {
       if (this.$store.state.exercise.exercise.questions) {
        const exerciseData = JSON.parse(
          JSON.stringify(this.$store.state.exercise.exercise)
        );
        const newQuestions = [];
        for (let index = 0; index < exerciseData.questions.length; index++) {
          const question = exerciseData.questions[index];
          if (question.parentId !== null && question.parentId !== undefined) {
            // is a child question if parent question
            if (
              exerciseData.questions[index - 1]?.parentId === question.parentId
            ) {
              // if parent question has added to new question => find it and add child question to parent question
              const founedQuestion = newQuestions.find(
                (parentQuestion) => parentQuestion?.id === question.parentId
              );
              founedQuestion.questions.push({ ...question });

              // if parent question is not active number => push null element to question list to increment index of question list
              if (!founedQuestion.isActiveNumber) {
                newQuestions.push(null);
              }
            } else {
              // this question is the first child of parent question => find parent question in parent question list
              const parentQuestion = exerciseData.parentQuestions.find(
                (parentQuestion) => parentQuestion.id === question.parentId
              );

              // push new question to new questions with type is group question
              newQuestions.push({
                ...parentQuestion,
                questions: [
                  {
                    ...question,
                  },
                ],
                type: 5,
              });
            }
          } else {
            // is a normal question => push it to new question list
            newQuestions.push({ ...question });
          }
        }
        return newQuestions;
      }
      return null;
    }
  },
  methods: {
    // saveComposeQuestion(){
    //   this.$store.commit("composeQuestion/saveComposeQuestion");
    // }
    /**
     * hàm lấy  chuyển số thành chữ
     * CreatedBy: LEQUAN (15/02/2022)
     */
    convertIndexToCharacter(number) {
      return String.fromCharCode(number + 65);
    },
    /**
     * Click chọn loại câu hỏi
     * CreatedBy:LEQUAN(11/02/2022)
     */
    showHideQuestionType(value) {
      this.$store.commit("loading/openLoading");
      let newAnswer = [];
      let newQuestions = [];
      switch (value) {
        case 1:
          newAnswer = [
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
          this.$store.commit("questionType/showHideQuestionType", {
            newAnswer,
            value,
          });
          setTimeout(() => {
            this.$store.commit("loading/closeLoading");
          }, 500);
          return;
        case 2:
          newAnswer = [
            {
              content: "Đúng",
              incorrect: false,
            },
            {
              content: "Sai",
              incorrect: false,
            },
          ];
          this.$store.commit("questionType/showHideQuestionType", {
            newAnswer,
            value,
          });
          setTimeout(() => {
            this.$store.commit("loading/closeLoading");
          }, 500);
          return;
        case 3:
          newAnswer = [
            {
              content: "",
              incorrect: true,
            },
          ];
          this.$store.commit("questionType/showHideQuestionType", {
            newAnswer,
            value,
          });
          setTimeout(() => {
            this.$store.commit("loading/closeLoading");
          }, 500);
          return;
        case 4:
          this.$store.commit("questionType/showHideQuestionType", {
            value,
          });
          setTimeout(() => {
            this.$store.commit("loading/closeLoading");
          }, 500);
          return;
        case 5:
          newQuestions = [
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
          this.$store.commit("questionType/showHideQuestionType", {
            newQuestions,
            value,
          });
          setTimeout(() => {
            this.$store.commit("loading/closeLoading");
          }, 500);
          return;
        default:
          return;
      }
    },
    /**
     * Click chỉnh sửa câu hỏi
     * CreatedBy:LEQUAN(11/02/2022)
     */
    clickEditQuestion(index) {
      this.$store.commit("loading/openLoading");
      // const newAnswer = this.exercise.questions[index].answers;
      // const newQuestion = this.exercise.questions[index].content;
      // const type = this.exercise.questions[index].type;
      // const attachments = this.exercise.questions[index].attachments;
      // const newQuestions = this.exercise.questions[index].questions;
      // const sortOrder = this.exercise.questions[index].sortOrder;
      // this.$store.commit("questionType/showHideQuestionType", {
      //   newAnswer,
      //   index,
      //   value: type,
      //   newQuestion,
      //   attachments,
      //   sortOrder,
      //   newQuestions
      // });
      const newAnswer = this.formattedQuestions[index].answers;
      const newQuestion = this.formattedQuestions[index].content;
      const type = this.formattedQuestions[index].type;
      const attachments = this.formattedQuestionsData[index].attachments;
      const newQuestions = this.formattedQuestionsData[index].questions;
      const sortOrder = this.formattedQuestions[index].sortOrder;
      const id = this.formattedQuestions[index].id;
      this.$store.commit("questionType/showHideQuestionType", {
        newAnswer,
        index,
        value: type,
        newQuestion,
        attachments,
        sortOrder,
        newQuestions,
        id
      });
      setTimeout(() => {
        this.$store.commit("loading/closeLoading");
      }, 500);
    },
    /**
     * Click xóa câu hỏi
     * CreatedBy:LEQUAN(11/02/2022)
     */
    clickDeleteQuestion(index, questionType) {
      // hiển thị lên popup xóa câu hỏi hay ko
      this.$store.commit("confirmDeletePopup/openDeletePopup", {index, questionType});
    },
  },
};
</script>

<style lang="scss" scoped>
.questions {
  height: calc(100vh - 164px);
  padding: 0 32px 32px 32px;
  margin: 0 -32px -32px -32px;
  margin-top: 36px;
  overflow: auto;
  .container {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 20px;
    .compose-question {
      position: relative;
      .question {
        box-shadow: 0 3px 20px rgb(90 125 141 / 16%);
        border-radius: 0 0 6px 6px;
        --tw-text-opacity: 1;
        color: rgba(78, 91, 106, var(--tw-text-opacity));
        .question__decore {
          background-color: rgb(0, 169, 236);
          height: 8px;
          border-radius: 6px 6px 0 0;
        }
        .question_detail {
          padding: 1.25rem;
          .question__content {
            margin-bottom: 20px;
            .content {
              .content__content {
                display: flex;
                align-items: center;
                .content__index {
                  font-weight: 700;
                  margin-right: 0.25rem;
                }
                .content_text {
                  flex: 1 1 0%;
                  .ckeditor-custom {
                    display: inline-block;
                    position: relative;
                    --ck-color-base-background: transparent;
                    --ck-color-base-border: transparent;
                    .content-editor {
                      // p{
                      //   color: black;
                    
                      // };
                    }
                  }
                }
              }
              .content__attachments {
                margin-top: 16px;
                gap: 1.5rem;
                flex-wrap: wrap;
                display: flex;
                .ms-preview-container {
                  position: relative;
                  height: 100% !important;
                  cursor: pointer;
                  .image-item {
                    width: 200px;
                    height: 200px;
                    object-fit: contain;
                  }
                }
              }
            }
          }
          .question__answers {
            padding-bottom: 20px;
            margin-bottom: 20px;
            border-bottom: 1px solid #eaebf5;
            .answers {
              display: grid;
              grid-row-gap: 20px;
              grid-template-columns: repeat(4, minmax(0, 1fr));
              .answer {
                display: flex;
                margin-right: 16px;
                .answer__index {
                  color: #fff;
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  text-align: center;
                  line-height: 24px;
                  background-color: #b6b9ce;
                  margin-right: 8px;
                }
                .ckeditor-custom {
                  flex: 1;
                  line-height: 26px;
                  display: inline-block;
                  position: relative;
                  --ck-color-base-background: transparent;
                  --ck-color-base-border: transparent;
                }
              }
              .answer_correct {
                display: flex;
                margin-right: 16px;
                .answer__index {
                  background-color: #00c542;
                  color: #fff;
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  text-align: center;
                  line-height: 24px;
                  margin-right: 8px;
                }
              }
            }
          }
          .question__toolbar {
            display: flex;
            justify-content: space-between;
            .question__toolbar__validate {
            }
            .toolbar {
              justify-content: flex-end;
              align-items: center;
              flex: 1 1 0%;
              display: flex;
              .m-button {
                margin-left: 16px;
              }
            }
          }
        }
      }
    }
  }
}
.toolbar-right {
  position: absolute;
  right: -102px;
  top: 0;
  flex-direction: column;
  .toolbar {
    margin-left: 82px;
    .question {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-bottom: 16px;
      width: 64px;
      img {
        width: 40px;
        transition: transform 0.5s;
        &:hover {
          transform: scale(1.2);
          cursor: pointer;
        }
      }

      .question__desc {
        width: max-content;
        margin-top: 12px;
      }
    }
    .decore-horizontal {
      margin-right: 56px;
      display: block;
    }
  }
}
</style>