<template>
  <div class="compose">
    <div class="toolbal-title">hoặc tự tạo câu hỏi mới</div>
    <div class="toolbar">
      <div class="question" @click="showHideQuestionType(1)">
        <img
          src="https://sisapapp.misacdn.net/lms/img/select.e468fb04.svg"
          alt=""
          class="question_icon"
        />
        <div class="question__desc">Chọn đáp án</div>
      </div>
      <div class="question" @click="showHideQuestionType(2)">
        <img
          src="https://sisapapp.misacdn.net/lms/img/yesorno.3a131375.svg"
          alt=""
          class="question_icon"
        />
        <div class="question__desc">Đúng sai</div>
      </div>
      <div class="question" @click="showHideQuestionType(3)">
        <img
          src="https://sisapapp.misacdn.net/lms/img/fill.23c37329.svg"
          alt=""
          class="question_icon"
        />
        <div class="question__desc">Điền vào chỗ trống</div>
      </div>
      <div class="question" @click="showHideQuestionType(4)">
        <img
          src="https://sisapapp.misacdn.net/lms/img/essay.8abc9315.svg"
          alt=""
          class="question_icon"
        />
        <div class="question__desc" @click="showHideQuestionType(5)">Tự luận</div>
      </div>
      <div class="question">
        <img
          src="https://sisapapp.misacdn.net/lms/img/pairing.ab57347e.svg"
          alt=""
          class="question_icon"
        />
        <div class="question__desc">Ghép nối</div>
      </div>
      <div class="question">
        <img
          src="https://sisapapp.misacdn.net/lms/img/group.447cc2ea.svg"
          alt=""
          class="question_icon"
        />
        <div class="question__desc">Câu hỏi nhóm</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
     /**
     * Click chọn loại câu hỏi
     * CreatedBy:LEQUAN(11/02/2022)
     */
     showHideQuestionType(value){
        this.$store.commit("showHideQuestionType");
         this.$store.commit('questionType',value);
    }
  },
  computed:{
     ...mapState(["selectQuestion"]),
  }
};
</script>

<style lang="scss" scoped>
.compose {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
  .toolbal-title {
    margin-bottom: 1.5rem;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
  }
  .toolbar {
    display: flex;
    margin-left: 82px;
    .question {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-right: 82px;
      width: 64px;
      img {
        width: 64px;
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