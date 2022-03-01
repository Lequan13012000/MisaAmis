<template>
  <div>
    <div class="questions">
      <div class="container">
        <div
          class="compose-question"
          v-for="(compose, index) in exercise.questions"
          :key="index"
        >
          <div class="question">
            <div class="question__decore"></div>
            <div class="question_detail">
              <div class="question__content">
                <div class="content">
                  <div class="content__content">
                    <div class="content__index">{{ index + 1 }}.</div>
                    <div class="content_text">
                      <div class="ckeditor-custom">
                        <div class="content-editor">
                          <p v-html="compose.content"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="content__attachments">
                    <div class="ms-preview-container">
                      <img
                        src="https://sisap.vn/lms/apis/file//v1/files/download?FileID=6e55b17a-9253-4e20-bcd8-9de14e8fcdc5&StorageType=105&OwnerID=83ba3221-36df-4889-aed9-b47013427098&IsPreview=true&ClientFileName=&Width=300"
                        alt=""
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
                    v-for="(answer, index) in compose.answers"
                    :key="index"
                  >
                    <div class="answer__index">
                      {{ convertIndexToCharacter(index) }}
                    </div>
                    <div class="ckeditor-custom" v-html="answer.content"></div>
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
                    @click.native="clickDeleteQuestion(index)"
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
        <div class="question">
          <img
            src="https://sisapapp.misacdn.net/lms/img/group.447cc2ea.svg"
            alt=""
            class="question_icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseButton from "../base/BaseButton.vue";
import { mapState } from "vuex";
export default {
  components: {
    // component button
    BaseButton,
  },
  computed: {
    ...mapState("exercise", ["exercise"]),
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
      let newAnswer = [];
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
          return;
        case 4:
          this.$store.commit("questionType/showHideQuestionType", {
            value
          });
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
        console.log(this.exercise.questions[index].attachments);
      const newAnswer = this.exercise.questions[index].answers;
      const newQuestion = this.exercise.questions[index].content;
      const type = this.exercise.questions[index].type;
      const attachments = this.exercise.questions[index].attachments;
      this.$store.commit("questionType/showHideQuestionType", {
        newAnswer,
        index,
        value: type,
        newQuestion,
        attachments
      });
    },
    /**
     * Click xóa câu hỏi
     * CreatedBy:LEQUAN(11/02/2022)
     */
    clickDeleteQuestion(index) {
      this.$store.dispatch("exercise/deleteQuestion", index);
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
                    width: 100%;
                    height: 100%;
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