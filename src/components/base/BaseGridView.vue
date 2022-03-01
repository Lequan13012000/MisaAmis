<template>
  <div class="grid-container" v-if="exercise.length > 0">
    <router-link
      :to="`/storage/${exe.exerciseId}`"
      class="item-storage"
      v-for="(exe, index) in exercise"
      :key="index"
      @click.native="
        showComposeHideToolBar();
 
      "
    >
      <div class="thumbnail-lazy">
        <div class="avatar">
          <div class="thumbnail-lazy">
            <div class="subject-content">
              {{ exe.gradeName }} - {{ exe.subjectName }}
            </div>
            <img
              :src="exe.avatar"
              alt=""
            />
          </div>
        </div>
        <div class="describe">
          <div class="title-describe" @click="handleClickMenu" >
            <div class="exercise-name">
              <span>{{ exe.exerciseName }}</span>
            </div>
            <div class="button-more" @click="showOption(index)">
              <div class="icon-option">
                <img
                  src="https://sisapapp.misacdn.net/lms/img/icon_option.90d8b4a5.svg"
                  alt=""
                />
              </div>
            </div>
            <ul
              :class="[
                'option__list',
                { 'option__list--active': isShowOption == index },
              ]"
            >
              <li class="item">
                <router-link
                   :to="`/storage/${exe.exerciseId}`"
                  class="btn"
                  @click="
                    showComposeHideToolBar();
                  "
                  >Xem</router-link
                >
              </li>
              <li class="item">
                <button class="btn" style="width: 100%" @click="deleteExercise(exe.exerciseId)">Xóa</button>
              </li>
            </ul>
          </div>
          <div class="number">
            <div class="num-left">
              <div class="num-leftct">
                <div class="num-leftct-detail">
                  <img
                    src="https://sisapapp.misacdn.net/lms/img/ic_number_aswer.e8c79201.svg"
                  />
                  <span>
                    {{ exe.questions ? exe.questions.length : 0 }} câu
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // ẩn hiện option xem xóa bài tập
      isShowOption: null,
    };
  },
  mounted() {
    this.$store.dispatch("exerciseList/loadExercise");
  },
  computed: {
    ...mapState("exercise", ["exercise"]),
      ...mapState("exerciseList", ["exercise"]),
  },
  props: {
    // id bài tập được Chọn
    exerciseSelected: null,
  },
  methods: {
    /**
     * Ẩn hiện form chọn câu hỏi hiển thị form soạn câu hỏi
     * CreatedBy: LEQUAN (11/02/2022)
     */
    showComposeHideToolBar() {
      this.$store.commit("composeQuestion/showComposeHideToolBar");
    },
    /**
     * Lấy id của bài tập đc Chọn
     * CreatedBy: LEQUAN (21/02/2022)
     */
    getExerciseId(value) {
        //e.preventDefault();
      console.log(value);
      this.$store.dispatch("exerciseList/loadExerciseSelected", value);
    },
    /**
     * Ẩn hiện option xem xóa bài tập
     * CreatedBy: LEQUAN (21/02/2022)
     */
    showOption(index) {
      console.log("showoption");
      if (index == this.isShowOption) {
        this.isShowOption = null;
      } else {
        this.isShowOption = index;
      }
    },
    handleClickMenu(e) {
      e.preventDefault();
    },
     /**
     * Xóa bài tập
     * CreatedBy: LEQUAN (21/02/2022)
     */
    deleteExercise(value){
      this.isShowOption = null;
      this.$store.dispatch("exerciseList/deleteExercise",value);
    }
  },
};
</script>

<style lang="scss" scoped>
.grid-container {
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  display: grid;
  grid-gap: 24px;
  padding-bottom: 10px;
  .item-storage {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 3px 20px rgb(90 125 141 / 16%);
    // width: 310px;
    height: 16px;
    position: relative;
    width: 100%;
    overflow: hidden;
    display: block;
    padding-top: 64.5161290323%;
    cursor: pointer;
    .thumbnail-lazy {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
      z-index: 1;
      background-size: cover;
      background: no-repeat 50%;
      background-color: #fff;
      .avatar {
        position: relative;
        width: 100%;
        overflow: hidden;
        display: block;
        padding-top: 40.5844155844%;
        .thumbnail-lazy {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: block;
          z-index: 1;
          background-size: cover;
          background: no-repeat 50%;
          background-color: #fff;
          .subject-content {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            --tw-text-opacity: 1;
            color: rgba(255, 255, 255, var(--tw-text-opacity));
            padding-top: 0.375rem;
            padding-bottom: 0.375rem;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            --tw-bg-opacity: 1;
            background-color: rgba(0, 169, 236, var(--tw-bg-opacity));
            border-bottom-right-radius: 10px;
            font-size: 16px;
            line-height: 24px;
            font-weight: 700;
          }
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .describe {
      position: relative;
      //   width: 100%;
      // height: 79px;
      padding: 0.75rem;
      flex-direction: column;
      display: flex;
      justify-content: space-between;
      .title-describe {
        .exercise-name {
          width: calc(100% - 10px);
          display: flex;
          justify-content: space-between;
        }
        span {
          width: 16rem;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          color: #4e5b6a;
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
        }
      }
      .button-more {
        height: 32px;
        width: 32px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 50%;
        overflow: hidden;
        margin: 12px 0;
        z-index: 2;
        .icon-option {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 0;
          img {
            width: 4px;
            height: 20px;
          }
        }
      }
      .option {
        position: relative;
        &__list {
          top: 16px;
          right: 28px;
          opacity: 0;
          visibility: hidden;
          margin: 0;
          padding: 0 8px;
          background-color: #fff;
          list-style: none;
          border-radius: 10px;
          position: absolute;
          width: max-content;
          z-index: 20;
          transition: opacity 0.2s ease, visibility 0.2s ease;
          border: 1px solid #ebeef5;
          box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

          .btn {
            height: 30px;
            // width: 100%;
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: left;
            border: none;
            outline: none;
            padding: 0 12px;
            margin: 0;
            background-color: #fff;
            border-radius: 10px;
            font-size: 13px;
            color: #4e5b6a;
            cursor: pointer;
            &:hover {
              background-color: #ece7fe;
            }
          }
          &--active {
            opacity: 1;
            visibility: visible;
          }
        }
      }
    }
    .number {
      display: flex;
      align-items: center;
      margin-bottom: 0.125rem;
      .num-left {
        font-size: 16px;
        color: #4e5b6a;
        .num-leftct {
          display: flex;
        }
        .num-leftct-detail {
          justify-content: center;
          align-items: center;
          flex-direction: row;
          display: flex;
          img {
          }
          span {
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>
