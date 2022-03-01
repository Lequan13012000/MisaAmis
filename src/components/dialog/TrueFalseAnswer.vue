<template>
  <div class="compose-dialog__answer">
    <div class="select-answer">
      <div class="grid">
        <div></div>
        <div class="select" v-for="(answer, index) in value" :key="index">
          <div class="thumbnail-lazy" style="background-color: #afeca4">
            <div class="ck-editor-custom">
              <CKEditor
                :value="answer.content"
                @input="handleInput"
                :index="index"
              />
            </div>
            <div class="head">
              <div class="index">{{ convertIndexToCharacter(index) }}</div>
              <div class="right">
                <div
                  class="toolbar-icon"
                  :class="{ correct_answer: answer.incorrect == true }"
                  @click="correctAnswer(index)"
                >
                  <img
                    v-if="answer.incorrect == true"
                    src="https://sisapapp.misacdn.net/lms/img/ic_check.3cdf2053.svg"
                    alt=""
                  />
                  <img
                    v-else
                    src="https://sisapapp.misacdn.net/lms/img/ic_uncheck.da5a285c.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../element-variables.scss";
import CKEditor from "../base/CkEditor.vue";
export default {
  components: { CKEditor },
  data() {
    return {};
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    /**
     * hàm lấy  chuyển số thành chữ
     * CreatedBy: LEQUAN (15/02/2022)
     */
    convertIndexToCharacter(number) {
      return String.fromCharCode(number + 65);
    },
    /**
     * hàm lấy  chuyển số thành chữ
     * CreatedBy: LEQUAN (15/02/2022)
     */
    handleInput(index, value) {
      const newanswers = [...this.value];
      const newanswer = { ...this.value[index] };
      newanswers.splice(index, 1, { ...newanswer, content: value });
      this.$emit("input", newanswers);
    },
    /**
     * hàm chọn đáp án đúng
     *  CreatedBy: LEQUAN (15/02/2022)
     */
    correctAnswer(idx) {
      const correctAnswers = [...this.value];
      const correctAnswer = correctAnswers.map((answer,index) => {
        if(index == idx){
          return {...answer,incorrect:true}
        }
        else{
          return {...answer,incorrect:false}
        }
      })
      console.log(correctAnswer)
      this.$emit("input", correctAnswer);
    },
  },
};
</script>

<style lang="scss" scoped>
.correct_answer {
  background-color: #2dd866 !important;
}
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
            .compose-dialog__answer {
              padding-bottom: 1.5rem;
              padding-left: 1.5rem;
              padding-right: 1.5rem;
              --tw-bg-opacity: 1;
              background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
              margin-top: 1rem;
              .select-answer {
                .grid {
                  gap: 1rem;
                  grid-template-columns: repeat(4, minmax(0, 1fr));
                  display: grid;
                  .select {
                    --b25f63ba: 200px;
                    --75a7d601: #f59ad4;
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    display: block;
                    padding-top: 95%;
                    border-radius: 10px;
                    .thumbnail-lazy {
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: calc(100% - 54px);
                      z-index: 1;
                      background: no-repeat 50%;
                      padding-top: 48px;
                      padding-bottom: 12px;
                      display: flex !important;
                      justify-content: center;
                      align-items: center;
                      background-color: rgb(255, 214, 240);
                      padding-bottom: 16px;

                      .ck-editor-custom {
                        height: 100%;
                        width: 100%;
                        padding-left: 12px;
                        padding-right: 12px;

                        ::v-deep .ck.ck-editor {
                          position: relative;
                          width: 100%;
                          height: 100%;
                          background: transparent;

                          .ck.ck-reset_all {
                            display: none;
                          }
                          .ck-editor__main {
                            height: 100%;
                          }
                          .ck.ck-editor__main > .ck-editor__editable {
                            text-align: center;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            height: 100%;
                            overflow: hidden;
                            border-radius: 10px;
                            background: transparent;
                          }
                        }
                      }

                      // textarea {
                      //   resize: none;
                      //   width: 92%;
                      //   height: 77%;
                      //   margin-top: 43px;
                      //   border: none;
                      //   border-radius: 9px;
                      //   text-align: center;
                      //   &::placeholder {
                      //     left: 30%;
                      //     position: absolute;
                      //     top: 40%;
                      //   }
                      //   background-color: #ffd6f0;
                      //   &:focus {
                      //     outline: none;
                      //     background-color: #ffff;
                      //     &::placeholder {
                      //       color: transparent;
                      //     }
                      //   }
                      // }

                      .head {
                        position: absolute;
                        top: 0;
                        left: 0;
                        display: flex;
                        justify-content: space-between;
                        width: 94%;
                        padding: 8px;
                        z-index: 999;
                        .index {
                          --tw-text-opacity: 1;
                          color: rgba(78, 91, 106, var(--tw-text-opacity));
                          margin-left: 0.25rem;
                          margin-top: 0.25rem;
                          font-size: 20px;
                          line-height: 28px;
                          font-weight: 700;
                        }
                        .right {
                          display: flex;
                          .toolbar-icon {
                            background-color: #fff;
                            width: 32px;
                            height: 32px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 10px;
                            cursor: pointer;
                            margin-left: 8px;
                            outline: none;
                            img {
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .el-dialog__footer {
      display: flex;
      justify-content: space-between;
      padding: 16px 0;
      .toolbar-left {
      }
      .toolbar-right {
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