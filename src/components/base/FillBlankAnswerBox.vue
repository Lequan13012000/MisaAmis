<template>
  <li class="fill-blank-answer-box">
    <label class="fill-blank-answer-box__label" :for="id">{{ title }}</label>
    <div
      :class="[
        'fill-blank-answer-box__main',
        { 'fill-blank-answer-box__main--focus': isFocus },
      ]"
    >
      <ul class="fill-blank-answer-chips">
        <li
          v-for="(chip, index) in formatAnswerToChips"
          :class="['fill-blank-answer-chip', chip.chipClass]"
          :key="index"
        >
          <span class="fill-blank-answer-chip__text">{{ chip.text }}</span>
          <button
            class="fill-blank-answer-chip__close-btn"
            @click="deleteChip(index)"
          >
            <div class="m-icon m-icon--14 m-icon--close-2">
              <img src="https://sisapapp.misacdn.net/lms/img/ic_remove.4c9d3209.svg" alt="">
            </div>
          </button>
        </li>
      </ul>
      <input
        type="text"
        class="fill-blank-answer-input"
        :id="id"
        :name="id"
        :placeholder="placeholder"
        v-model="inputValue"
        @keydown="handleKeyDown"
        @focus="handleFocusInput"
        @blur="handleBlurInput"
      />
      <button
        class="fill-blank-answer-delete-btn"
        @click="handleClickDeleteBtn"
      >
        <div class="m-icon m-icon--16 m-icon--close-3">
             <img src="https://sisapapp.misacdn.net/lms/img/ic_remove.4c9d3209.svg" alt="">
        </div>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: "FillBlankAnswerBox",
  components: {},
  props: {
    /**
     * index of answer
     * @author: LEQUAN(25/01/2022)
     */
    idx: { type: Number, default: 0 },

    /**
     * value of answer
     * @author: LEQUAN(25/01/2022)
     */
    value: { type: [String, Object], default: "" },
  },
  emits: ["input", "onDelete"],
  data() {
    return {
      /**
       * input value
       * @author: LEQUAN(25/01/2022)
       */
      inputValue: "",

      /**
       * is focus
       * @author: LEQUAN(25/01/2022)
       */
      isFocus: false,
    };
  },
  computed: {
    /**
     * title of input
     * @author: LEQUAN(25/01/2022)
     */
    title() {
      return `Ô trống ${this.idx + 1}`;
    },

    /**
     * id of input
     * @author: LEQUAN(25/01/2022)
     */
    id() {
      return `fill-blank-answer-${this.idx}`;
    },

    /**
     * placeholder of input
     * @author: LEQUAN(25/01/2022)
     */
    placeholder() {
      // if has value => set placeholder to empty
      if (this.value) {
        return "";
      }
      return "Nhập đáp án rồi nhấn Enter...";
    },

    /**
     * format answer list to chips
     * @author: LEQUAN(25/01/2022)
     */
    formatAnswerToChips() {
      // if there is no answer => empty
      if (this.value === "") {
        return null;
      }
      const chips = this.value.split(";");
      const formattedChips = chips.map((chip, idx) => {
        return {
          text: chip,
          chipClass: this.convertIdxToClass(idx),
        };
      });
      return formattedChips;
    },
  },
  methods: {
    /**
     * emit onDelete event when clicking delete btn
     * @author: LEQUAN(25/01/2022)
     */
    handleClickDeleteBtn() {
      this.$emit("onDelete", this.idx);
    },

    /**
     * emit input event when pressing enter
     * @param {object} e event object
     * @author: LEQUAN(25/01/2022)
     */
    handleKeyDown(e) {
      const key = e.key;
      if (key === "Enter" || key === "Tab") {
        // if input value is empty => return
        if (this.inputValue === "") {
          return;
        }
        if (this.value === "") {
          // value is empty
          this.$emit("input", this.inputValue, this.idx);
        } else {
          // value is not empty => link string
          const newValue = `${this.value}; ${this.inputValue}`;
          this.$emit("input", newValue, this.idx);
        }
        // clear input value
        this.inputValue = "";
      }
    },

    /**
     * emit input event when clicking delete btn
     * @param {number} index index of answer
     * @author: LEQUAN(25/01/2022)
     */
    deleteChip(index) {
      const chips = this.value.split("; ");
      chips.splice(index, 1);
      const newValue = chips.join("; ");
      this.$emit("input", newValue, this.idx);
    },

    /**
     * set is focus to true
     * @author: LEQUAN(25/01/2022)
     */
    handleFocusInput() {
      this.isFocus = true;
    },

    /**
     * set is focus to false
     * @author: LEQUAN(25/01/2022)
     */
    handleBlurInput() {
      this.isFocus = false;
    },

    /**
     * convert index to classes of chip
     * @author: LEQUAN(25/01/2022)
     */
    convertIdxToClass(idx) {
      return `fill-blank-answer-chip--${
        idx + 1 <= 4 ? idx + 1 : (idx + 1) % 4 === 0 ? 4 : (idx + 1) % 4
      }`;
    },
  },
};
</script>

<style lang="scss" scoped>


.fill-blank-answer-box {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  &__label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: black;
    margin-right: 30px;
  }
  &__main {
    flex-grow: 1;
    display: flex;
    align-items: center;
    border-radius: 10px;
    height: 40px;
    background-color: #fff;
    border: 1px solid #b6b9ce;
    padding-right: 12px;
    .fill-blank-answer-input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      border-radius: 10px;
      padding: 0 12px 0 4px;
    }
    .fill-blank-answer-chips {
      height: 100%;
      padding: 0 4px;
      display: flex;
      align-items: center;
      .fill-blank-answer-chip {
        display: flex;
        align-items: center;
        border-radius: 8px;
        height: 32px;
        padding: 0 8px;
        margin-right: 4px;
        white-space: nowrap;
        &__text {
          font-size: 13px;
          font-weight: 500;
          cursor: default;
          color: black;
        }
        &__close-btn {
          border: none;
          outline: none;
          padding: 0;
          background-color: transparent;
          height: 14px;
          width: 14px;
          cursor: pointer;
          margin-left: 8px;
        }
        &--1 {
          background-color: #ffaec7;
        }
        &--2 {
          background-color: #afeca4;
        }
        &--3 {
          background-color: #f9c3b7;
        }
        &--4 {
          background-color: #b7dfff;
        }
      }
    }
    .fill-blank-answer-delete-btn {
      border: none;
      outline: none;
      background-color: transparent;
      height: 16px;
      width: 16px;
      padding: 0;
      cursor: pointer;
    }
    &--focus {
      border-color: #8a6bf6;
    }
  }
}
</style>