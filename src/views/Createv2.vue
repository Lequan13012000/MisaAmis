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
          <input
            class="h3"
            placeholder="Nhập tên bài tập..."
            :value="exercise.exerciseName"
          />
        </div>
      </div>
      <div class="header__bottom">
        <div class="header__bottom__left">
          <BaseCombobox
            placeholder="Chọn môn"
            style="width: 160px"
            :dataOptions="subjects"
            fieldValue="subjectId"
            fieldDisplay="subjectName"
            ref="comboboxSubject"
            @changeData="subjectSelected"
            v-model="exercise.subjectName"
          />
          <BaseCombobox
            placeholder="Chọn khối"
            style="width: 100px"
            :dataOptions="grades"
            fieldValue="gradeId"
            fieldDisplay="gradeName"
            @changeData="gradeSelected"
            v-model="exercise.gradeName"
          />
          <BaseButton style="width: 142px" @click.native="showHideDialog"
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
      <Upload v-show="!isShowQuestionList" />
      <ToolBar v-show="!isShowQuestionList" />
      <ComposeQuestion v-show="isShowQuestionList" />
    </div>
    <DynamicComponent />
    <DialogInfo ref="childDialogInfo" />
  </div>
</template>

<script>
import BaseButton from "../components/base/BaseButton.vue";
import BaseCombobox from "../components/base/BaseCombobox.vue";
import Upload from "../components/base/Upload.vue";
import ToolBar from "../components/base/ToolBar.vue";
import DynamicComponent from "../components/dialog/DynamicComponent.vue";
import ComposeQuestion from "../components/base/ComposeQuestion.vue";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import DialogInfo from "../components/dialog/DialogInfo.vue";
// import { cloneDeep } from "lodash";
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
    ComposeQuestion,
    // component dialog
    DialogInfo,
  },
  data() {
    return {
      exerciseData: { ...this.$store.state.exercise.exercise },
    };
  },
  mounted() {
    this.$store.commit("loading/openLoading");
    const exerciseId = this.$route.params.id;
    if (exerciseId !== "createv2") {
      this.$store.dispatch("exercise/loadExerciseSelected", exerciseId);
      setTimeout(() => {
        this.$store.commit("loading/closeLoading");
      },500);
    }
  },
  watch: {
    exercise(newValue) {
      this.exerciseData = newValue;
    },
  },

  methods: {
    ...mapMutations("composeQuestion", ["showComposeHideToolBar"]),
    // Ẩn hiện dialog bổ sung thông tin
    showHideDialog() {
      this.$store.commit("loading/openLoading");
      // const exercise = this.exercise;
      this.$refs.childDialogInfo.isShowHideDialog =
        !this.$refs.childDialogInfo.isShowHideDialog;
      // chỉ định sửa bài tập
      this.$refs.childDialogInfo.isEditExercise = true;
      // truyền thông tin bài tập lên form
      this.$refs.childDialogInfo.fakeExercise.exerciseName =
        this.exercise.exerciseName;
      this.$refs.childDialogInfo.fakeExercise.subjectId =
        this.exercise.subjectId;
      this.$refs.childDialogInfo.fakeExercise.subjectName =
        this.exercise.subjectName;
      this.$refs.childDialogInfo.fakeExercise.gradeId = this.exercise.gradeId;
      this.$refs.childDialogInfo.fakeExercise.gradeName =
        this.exercise.gradeName;
       this.$refs.childDialogInfo.fakeExercise.topicIds = this.exercise.topicIds;
      this.$refs.childDialogInfo.fakeExercise.avatar = this.exercise.avatar;
      this.$refs.childDialogInfo.fakeExercise.questions = this.exercise.questions;
      this.$refs.childDialogInfo.fakeExercise.parentQuestions = this.exercise.parentQuestions;
      this.$store.dispatch("topics/loadTopic",{
        gradeId: this.exercise.gradeId,
        subjectId: this.exercise.subjectId
      })
      setTimeout(() => {
        this.$store.commit("loading/closeLoading");
      }, 300);
    },
    backShowComposeHideToolBar() {
      this.$store.commit("composeQuestion/backShowComposeHideToolBar");
      this.$store.commit("exercise/resetExercise");
    },
    /**
     * truyền subjectname lên
     * CreatedBy:LEQUAN(25/02/2022)
     */
    subjectSelected(value) {
      this.subjectNameSelected = value.subjectName;
      this.subjectIdSelected = value.subjectId;
    },
    /**
     * truyền subjectname lên
     * CreatedBy:LEQUAN(25/02/2022)
     */
    gradeSelected(value) {
      this.gradeNameSelected = value.gradeName;
      this.gradeIdSelected = value.gradeId;
    },
  },
  computed: {
    isShowQuestionList() {
      if (this.exercise.questions && this.exercise.questions.length > 0) {
        return true;
      }
      return false;
    },
    ...mapState("composeQuestion", ["isShowToolBar", "isShowComposeQuestion"]),
    ...mapState("exercise", ["exercise"]),
    ...mapState("subjects", ["subjects"]),
    ...mapState("grades", ["grades"]),
  },
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