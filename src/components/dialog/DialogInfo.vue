<template>
  <div class="el-overlay" v-show="isShowHideDialog">
    <div class="el-dialog">
      <div class="el-dialog__header">
        <div class="dialog-title">Bổ sung thông tin</div>
        <button class="el-dialog__headerbtn">
          <i class="el-dialog__close"></i>
        </button>
      </div>
      <div class="el-dialog__body">
        <div class="dialog-content">
          <div class="ms-form">
            <div class="content-left">
              <div class="title">Ảnh đại diện</div>
              <div class="image-container">
                <img
                  src="https://sisapapp.misacdn.net/lms/img/toan1.5b5ad581.png"
                  alt=""
                  class="image"
                />
                <div class="ms-upload-field">
                  <label for="" class="label-input">
                    <img
                      src="https://sisapapp.misacdn.net/lms/img/ic_upload-image.20a77bdb.svg"
                      alt=""
                    />
                  </label>
                  <input type="file" class="change-avatar" />
                </div>
              </div>
            </div>
            <div class="content-right">
              <div class="ms-text-field">
                <label for="" class="ms-label">Tên bài tập</label>
                <BaseInput
                  v-model="fakeExercise.ExrciseName"
                  :class="{
                    errorvalidate:
                      errorsObj.ExcriseName.length > 0 &&
                      !fakeExercise.ExrciseName,
                  }"
                />
                <span
                  class="error-msg"
                  v-if="
                    errorsObj.ExcriseName.length > 0 &&
                    !fakeExercise.ExrciseName
                  "
                  >Không được bỏ trống</span
                >
              </div>
              <div class="grid">
                <div class="ms-combo-box">
                  <label for="" class="ms-label">Môn</label>
                  <BaseCombobox
                    :dataOptions="subjects"
                    fieldValue="SubjectId"
                    fieldDisplay="SubjectName"
                    placeholder="Chọn môn"
                    v-model="fakeExercise.SubjectId"
                    :class="{
                      errorcombobox:
                        errorsObj.SubjectName.length > 0 &&
                        !fakeExercise.SubjectId,
                    }"
                  />
                  <span
                    class="error-msg"
                    v-if="
                      errorsObj.SubjectName.length > 0 &&
                      !fakeExercise.SubjectId
                    "
                    >Không được bỏ trống</span
                  >
                </div>
                <div class="ms-combo-box">
                  <label for="" class="ms-label">Khối</label>
                  <BaseCombobox
                    :dataOptions="grades"
                    fieldValue="GradeId"
                    fieldDisplay="GradeName"
                    placeholder="Chọn khối"
                    v-model="fakeExercise.GradeId"
                    :class="{
                      errorcombobox:
                        errorsObj.GradeName.length > 0 && !fakeExercise.GradeId,
                    }"
                  />
                  <span
                    class="error-msg"
                    v-if="
                      errorsObj.GradeName.length > 0 && !fakeExercise.GradeId
                    "
                    >Không được bỏ trống</span
                  >
                </div>
              </div>
              <div class="ms-combo-box">
                <label for="" class="ms-label">Chủ đề</label>
                <BaseCombobox placeholder="Chọn chủ đề" />
              </div>
              <div class="ms-suggest-tag-input">
                <label for="" class="ms-label">Thẻ tìm kiếm</label>
                <div class="suggest-container">
                  <span class="el-tag">Ôn tập học kì I</span>
                </div>
                <!-- <div class="ms-tag-input">
                  <VoerroTagsInput
                    element-id="tags"
                    v-model="selectedTags"
                    :typeahead="true"
                  ></VoerroTagsInput>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="el-dialog__footer">
        <div class="dialog-toolbar">
          <BaseButton @click.native="showHideDialog">Đóng</BaseButton>
          <!-- <router-link to="/storage/createv2"> -->
          <BaseButton class="composing-button" @click.native="checkForm"
            >Lưu</BaseButton
          >

          <!-- </router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "../base/BaseInput.vue";
import BaseCombobox from "../base/BaseCombobox.vue";
import BaseButton from "../base/BaseButton.vue";
import { mapState } from "vuex";
// import VoerroTagsInput from "@voerro/vue-tagsinput";
export default {
  components: {
    // component input
    BaseInput,
    // component combobox
    BaseCombobox,
    // component button
    BaseButton,
    // thẻ tìm kiếm
    // VoerroTagsInput,
  },
  data() {
    return {
      selectedTags: "",
      // hiển thị dialog
      isShowHideDialog: false,
      // validate
      errorsObj: {
        ExcriseName: [],
        SubjectName: [],
        GradeName: [],
      },

      fakeExercise: {
        ExrciseName: "",
        SubjectId: null,
        GradeId: null,
      },
    };
  },
  computed: {
    ...mapState(["subjects", "grades", "exercise"]),
  },

  methods: {
    /**
     * Ẩn hiện dialog
     * CreatedBy: LEQUAN (28/01/2022)
     */
    showHideDialog() {
      this.isShowHideDialog = !this.isShowHideDialog;
    },
    /**
     * Hàm xử lí validate dữ liệu
     * Created by : LEQUAN (12/2/2022)
     */
    checkForm: function (e) {
      this.errorsObj = {
        ExcriseName: [],
        SubjectName: [],
        GradeName: [],
      };
      if (!this.fakeExercise.ExrciseName) {
        this.errorsObj.ExcriseName.push("ExcriseName required.");
      }

      if (!this.fakeExercise.SubjectId) {
        this.errorsObj.SubjectName.push("SubjectName required.");
      }
      if (!this.fakeExercise.GradeId) {
        this.errorsObj.GradeName.push("GradeName required.");
      }
      if (
        !this.errorsObj.ExcriseName.length &&
        !this.errorsObj.SubjectName.length &&
        !this.errorsObj.GradeName.length
      ) {
        this.saveDataExercise(this.fakeExercise);
        this.$router.push("/storage/createv2");
      }
      e.preventDefault();
    },
    /**
     * Hàm lưu dữ liệu thông tin bài tập
     * CreatedBy: LEQUAN(14/02/2022)
     */
    saveDataExercise(data) {
      this.$store.commit("saveDataExercise", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.errorvalidate {
  border: 1px solid red !important;
}
.errorcombobox {
  ::v-deep .el-input--suffix .el-input__inner {
    border: 1px solid red;
  }
}
.el-overlay {
  z-index: 2019;
  font-weight: 500;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  .el-dialog {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 800px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgb(0 0 0 / 16%);
    .el-dialog__header {
      padding: 24px;
      .dialog-title {
        font-weight: 700;
        font-size: 28px;
        line-height: 36px;
        color: #4e5b6a;
      }
      .el-dialog__headerbtn {
        top: 16px;
        right: 16px;
        position: absolute;
        padding: 0;
        background: 0 0;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
        overflow: visible;
        .el-dialog__close {
        }
      }
    }
    .el-dialog__body {
      padding: 0 24px 24px;
      word-break: break-word;
      color: #606266;
      font-size: 14px;
      .dialog-content {
        display: flex;
        font-weight: 500;
        .ms-form {
          display: flex;
          font-weight: 500;
          .content-left {
            width: 260px;
            display: flex;
            flex-direction: column;
            font-weight: 500;
            .title {
              color: #4e5b6a;
              font-weight: 500;
              padding-bottom: 4px;
              font-size: 14px;
              line-height: 20px;
            }
          }
          .image-container {
            border-radius: 10px;
            background-color: #f1f2f7;
            width: 100%;
            height: 156px;
            overflow: hidden;
            margin-bottom: 8px;
            font-weight: 500;
            position: relative;
            .image {
              width: 100%;
              height: 100%;
              object-fit: cover;
              font-weight: 500;
            }
            .ms-upload-field {
              color: #8a6bf6;
              bottom: 0.75rem;
              right: 0.75rem;
              position: absolute;
              .label-input {
                cursor: pointer;
                img {
                  width: 40px;
                  height: 40px;
                }
              }
              .change-avatar {
                display: none;
                bottom: 0.75rem;
                right: 0.75rem;
                position: absolute;
              }
            }
          }
        }
        .content-right {
          width: calc(100% - 260px);
          padding-left: 40px;
          display: grid;
          grid-template-columns: 100%;
          grid-row-gap: 16px;
          overflow: hidden;
          .ms-text-field {
            flex-direction: column;
            display: flex;
            vertical-align: top;
            .error-msg {
              font-size: 15px;
              color: #ff6161;
              font-weight: normal;
            }
            .ms-label {
              min-width: max-content;
              margin-bottom: 4px !important;
              font-weight: 500;
              display: inline-block;
              font-size: 14px;
              line-height: 20px;
              color: #4e5b6a;
            }
          }
          .grid {
            display: grid;
            grid-template-columns: 5fr 3fr;
            grid-column-gap: 12px;
            .ms-combo-box {
              flex-direction: column;
              display: flex;
              vertical-align: top;
            }
            .ms-label {
              min-width: max-content;
              margin-bottom: 4px !important;
              font-weight: 500;
              display: inline-block;
              font-size: 14px;
              line-height: 20px;
              color: #4e5b6a;
            }
          }
          .ms-combo-box {
            flex-direction: column;
            display: flex;
            vertical-align: top;
            .ms-label {
              min-width: max-content;
              margin-bottom: 4px !important;
              font-weight: 500;
              display: inline-block;
              font-size: 14px;
              line-height: 20px;
              color: #4e5b6a;
            }
            .error-msg {
              font-size: 15px;
              color: #ff6161;
              font-weight: normal;
            }
          }
          .ms-suggest-tag-input {
            .ms-label {
              min-width: max-content;
              margin-bottom: 4px !important;
              font-weight: 500;
              display: inline-block;
              font-size: 14px;
              line-height: 20px;
              color: #4e5b6a;
            }
            .suggest-container {
              flex-wrap: wrap;
              max-height: 80px;
              overflow: hidden;
              margin-bottom: 4px;
              display: flex;
              .el-tag {
                margin: 0 8px 8px 0;
                cursor: pointer;
                color: #4e5b6a;
                height: 32px;
                line-height: 30px;
                font-size: 14px;
                border-radius: 10px !important;
                user-select: none;
              }
            }
            .ms-tag-input {
              // height: 72px;
              // padding: 4px;
              // border-color: #b6b9ce;
              // overflow-x: auto;
              // overflow-y: auto;
              // border: 1px solid #b6b9ce;
              // border-radius: 10px;
              // min-height: 42px;
              // position: relative;

              ::v-deep .tags-input-wrapper-default {
                height: 72px;
                padding: 4px;
                overflow-x: auto;
                overflow-y: auto;
                border-radius: 10px;
                min-height: 42px;
                position: relative;

                border: 1px solid #b6b9ce;

                &.active {
                  border: 1px solid #8a6bf6;
                  box-shadow: none;
                }
                .tags-input-badge-pill {
                  border-radius: 8px;
                  padding: 10px;
                  padding-right: 24px;
                }
                .tags-input-badge-selected-default {
                  color: #4e5b6a;
                  background-color: #f1f2f7;
                  font-weight: normal;
                }
                .tags-input-remove {
                  background-color: #7b7e8e;
                  border-radius: 50%;
                  top: unset;
                  right: unset;
                  margin-left: 5px;
                }
                .tags-input-remove:after,
                ::before {
                  content: "";
                  width: 68%;
                  background-color: #fff;
                }
                input[type="text"] {
                  // position: absolute;
                  // top: 12px;
                  &::placeholder {
                    color: transparent;
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
    padding: 0 24px 24px;
    text-align: right;
    box-sizing: border-box;
    .dialog-toolbar {
      .composing-button {
        border: none;
        background-color: #8a6bf6;
        color: #fff;
        margin-left: 12px;
      }
    }
  }
}
</style>