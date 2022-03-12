<template>
  <div
    :class="[
      'combobox',
      { 'combobox--active': isActive },
      { 'combobox--error': error },
    ]"
    :style="{ width: width }"
    ref="combobox"
  >
    <label v-if="label" :for="id" class="combobox__label">{{ label }}</label>
    <div
      :class="['display', { 'display--focus': isActive }]"
      ref="display"
      @click="handleClickDisplay"
    >
      <div class="display__items">
        <ul class="combobox-chips">
          <template v-if="value.length > 0 && options.length > 0">
            <li
              class="combobox-chips__chip"
              v-for="(chip, idx) in chips"
              :key="idx"
            >
              <span class="chip-text" :title="chip.text">{{ chip.text }}</span>
              <div class="chip-close" @click="removeChip(idx)">
                <div class="m-icon m-icon--12 m-icon--close" isCloseBtn></div>
              </div>
            </li>
          </template>
          <input
            type="text"
            class="combobox-input"
            autocomplete="off"
            :id="id"
            :name="name"
            :placeholder="formattedPlaceholder"
            v-model="inputValue"
            @keydown="handleKeyDown"
            @focus="handleFocusInput"
            ref="input"
          />
        </ul>
      </div>
      <div class="display__icon" @click="handleClickIcon" ref="icon">
        <div class="m-icon m-icon--arrow-down"></div>
      </div>
    </div>
    <div v-if="error" class="combobox__error">{{ error }}</div>
    <div class="list-wrapper">
      <ul class="list" ref="list">
        <li v-if="formattedOptions.length === 0" class="list__option--empty">
          {{ resource.noData }}
        </li>
        <template v-else>
          <li
            v-for="(option, idx) in formattedOptions"
            :class="[
              'list__option',
              { 'list__option--selected': option.isSelected },
              { 'list__option--hover': idx === idxOfSelectedOption },
            ]"
            :key="idx"
            @click="handleClickOption(option.value)"
          >
            <span :title="option.text">
              {{ option.text }}
            </span>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import resource from "../../scripts/resource";

export default {
  name: "BaseMultiCombobox",
  props: {
    /**
     * value of combobox
     * @author: LEQUAN(24/01/2022)
     */
    value: { type: Array, default: () => [] },

    /**
     * options of combobox
     * @author: LEQUAN(24/01/2022)
     */
    options: { type: Array, default: () => [] },

    /**
     * width of combobox, default: 172px
     * @author: LEQUAN(24/01/2022)
     */
    width: { type: String, default: "100%" },

    /**
     * id of combobox
     * @author: LEQUAN(24/01/2022)
     */
    id: { type: String, default: "" },

    /**
     * name of combobox
     * @author: LEQUAN(24/01/2022)
     */
    name: { type: String, default: "" },

    /**
     * label of combobox
     * @author: LEQUAN(24/01/2022)
     */
    label: { type: String, default: "" },

    /**
     * error of combobox
     * @author: LEQUAN(24/01/2022)
     */
    error: { type: String, default: "" },

    /**
     * placeholder of combobox
     * @author: LEQUAN(24/01/2022)
     */
    placeholder: { type: String, default: "" },
  },
  emits: ["input", "keydown"],
  data() {
    return {
      /**
       * is active menu combobox
       * @author: LEQUAN(24/01/2022)
       */
      isActive: false,

      /**
       * input value
       * @author: LEQUAN(06/02/2022)
       */
      inputValue: "",

      /**
       * index of selected option
       * @author: LEQUAN(06/02/2022)
       */
      idxOfSelectedOption: 0,
    };
  },
  computed: {
    /**
     * resource
     * @author: LEQUAN(24/02/2022)
     */
    resource() {
      return resource;
    },

    /**
     * filted options
     * @author: LEQUAN(06/02/2022)
     */
    filtedOptions() {
      const filtedOption = this.options.filter(
        (option) =>
          option.text.toLowerCase().indexOf(this.inputValue.toLowerCase()) > -1
      );
      return filtedOption;
    },

    /**
     * formtted placeholder
     * @author: LEQUAN(24/02/2022)
     */
    formattedPlaceholder() {
      if (this.value.length === 0) {
        // if there are no selected options => return default placeholder
        return this.placeholder;
      } else {
        // else return empty
        return "";
      }
    },

    /**
     * formatted options
     * @author: LEQUAN(06/02/2022)
     */
    formattedOptions() {
      const formattedOptions = this.filtedOptions.map((option) => {
        // if value of option is in value => set isSelected to true
        const isSelected = this.value.includes(option.value);
        return {
          ...option,
          isSelected,
        };
      });
      return formattedOptions;
    },

    /**
     * convert from selected option to chips
     * @author: LEQUAN(06/02/2022)
     */
    chips() {
      const chips = this.value.map((valueOfOption) => {
        return this.options.find((option) => option.value === valueOfOption);
      });
      return chips;
    },
  },
  watch: {
    /**
     * toggle window event listener
     * @author: LEQUAN(25/01/2022)
     */
    isActive(newValue) {
      if (newValue) {
        // if open => add event listener to window
        window.addEventListener(
          "click",
          this.closeOptionListWhenClickingOutSide
        );
      } else {
        // if close => remove window event listener
        window.removeEventListener(
          "click",
          this.closeOptionListWhenClickingOutSide
        );
      }
    },
  },
  beforeDestroy() {
    // remove window event listener
    window.removeEventListener(
      "click",
      this.closeOptionListWhenClickingOutSide
    );
  },
  methods: {
    /**
     * when clicking option => emit input event with value of selected option
     * @param {string} optionValue value of selected option
     * @author: LEQUAN(24/01/2022)
     */
    handleClickOption(optionValue) {
      const newValue = [...this.value];

      // check if option is selected
      const idxOfChip = this.value.findIndex((value) => value === optionValue);

      // remove from value
      if (idxOfChip > -1) {
        newValue.splice(idxOfChip, 1);
      }
      // push to value
      else {
        newValue.push(optionValue);
      }

      // focus to input
      this.focus();

      // emit input event with new value
      this.$emit("input", newValue);
    },

    /**
     * open combobox menu when focusing input
     * @author: LEQUAN(24/02/2022)
     */
    handleFocusInput() {
      this.isActive = true;
    },

    /**
     * toggle combobox menu when clicking icon
     * @author: LEQUAN(24/02/2022)
     */
    handleClickIcon() {
      if (this.isActive) {
        // close combobox menu
        this.isActive = false;
      } else {
        // open combobox menu, focus to input
        this.isActive = true;
        this.focus();
      }
    },

    /**
     * focus to input when clicking display element
     * @param {object} e event object
     * @author: LEQUAN(24/02/2022)
     */
    handleClickDisplay(e) {
      if (!this.$refs.icon.contains(e.target)) {
        // just execute when element is not icon element
        this.focus();
      }
    },

    /**
     * remove chip
     * @param {number} idx index of chip in value
     * @author: LEQUAN(24/02/2022)
     */
    removeChip(idx) {
      const newValue = [...this.value];
      newValue.splice(idx, 1);
      this.$emit("input", newValue);
    },

    /**
     * when pressing a key => do some functions
     * @param {object} e event object
     * @author: LEQUAN(24/01/2022)
     */
    handleKeyDown(e) {
      const lengthOfFiltedOptions = this.filtedOptions.length;
      // if there are no options => return
      if (lengthOfFiltedOptions === 0) {
        if (e.key === "Tab") {
          // if press tab key => close combobox menu, set input value to empty
          this.isActive = false;
          this.inputValue = "";
        }
        return;
      }
      const { key } = e;

      if (key === "ArrowDown") {
        e.preventDefault();
        if (this.isActive) {
          // if combobox menu is open
          if (this.idxOfSelectedOption < lengthOfFiltedOptions - 1) {
            // increment index of selected option by 1 if index of selected option is less than length of filted options - 1
            this.idxOfSelectedOption += 1;
          }
        } else {
          // else option combobox menu
          this.isActive = true;
        }
      } else if (key === "ArrowUp") {
        e.preventDefault();
        if (this.isActive) {
          // if combobox menu is open
          if (this.idxOfSelectedOption > 0) {
            // decrement index of selected option by 1 if index of selected option is less than length of filted options - 1
            this.idxOfSelectedOption -= 1;
          }
        } else {
          // else option combobox menu
          this.isActive = true;
        }
      } else if (key === "Enter") {
        // press enter => handle click option
        this.handleClickOption(
          this.filtedOptions[this.idxOfSelectedOption].value
        );
      } else if (key === "Tab") {
        // press tab => close combobox menu, set input value to empty
        this.isActive = false;
        this.inputValue = "";
      } else if (/^(\w|\d)$/.test(key)) {
        // press alphanumeric keys => set index of selected option to 0
        this.idxOfSelectedOption = 0;
      }

      // emit keydown event
      this.$emit("keydown", e);
    },

    /**
     * close option list when clicking out side of display box
     * @author: LEQUAN(24/01/2022)
     */
    closeOptionListWhenClickingOutSide(e) {
      if (
        !this.$refs.combobox.contains(e.target) &&
        !e.target.hasAttribute("isCloseBtn")
      ) {
        this.isActive = false;
        this.inputValue = "";
      }
    },

    /**
     * focus to input
     * @author: LEQUAN(24/02/2022)
     */
    focus() {
      this.$refs.input.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
.combobox {
  position: relative;
  .display {
    background-color: #fff;
    // width: 100%;
    min-height: 40px;
    border-radius: 10px;
    border: 1px solid #b6b9ce;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    padding-left: 0;
    transition: border-color 0.2s ease;
    &--focus {
      border-color: #8a6bf6;
    }
    &__items {
      max-width: calc(100% - 34px);
      flex-grow: 1;
      .combobox-input {
        flex-grow: 1;
        flex-shrink: 1;
        border-radius: 10px;
        padding: 0 12px;
        border: none;
        outline: none;
        height: 100%;
        width: 0%;
        height: 38px;
        color: #8a6bf6;
      }
      .combobox-chips {
        flex-shrink: 0;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        width: 100%;
        margin-left: -32px;
        &__chip {
          display: flex;
          align-items: center;
          height: 32px;
          background-color: #f1f2f7;
          border: 1px solid #b6b9ce;
          border-radius: 10px;
          padding: 0 10px;
          margin: 2px 0 2px 6px;
          max-width: 100%;
          .chip-text {
            display: block;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #606266;
            font-size: 14px;
            font-weight: 500;
          }
          .chip-close {
            display: block;
            margin-left: 10px;
            display: flex;
            align-items: center;
            cursor: pointer;
          }
        }
      }
    }
    &__text {
      color: #62768e;
      font-weight: 500;
      font-size: 13px;
    }
    &__icon {
      flex-shrink: 0;
      transition: transform 0.2s ease;
      .m-icon {
        height: 10px;
        width: 10px;
        background-size: 10px 10px;
      }
    }
  }
  &__label {
    display: block;
    margin-bottom: 4px;
    width: max-content;
    font-size: 13px;
    font-weight: 500;
    color: #4e5b6a;
  }
  &__input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
    &:focus + .display {
      border-color: #8a6bf6;
    }
    &:focus ~ .combobox__error {
      opacity: 1;
      visibility: visible;
    }
  }
  &__error {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    bottom: 47px;
    left: 50%;
    transform: translateX(-50%);
    background-color: lightcoral;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 500;
    color: #fff;
    padding: 6px;
    text-align: center;
    transition: opacity 0.2s ease, visibility 0.2s ease;
    &::before {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 7px solid transparent;
      border-top: 7px solid lightcoral;
      border-bottom: none;
    }
  }
  .list-wrapper {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba($color: #000, $alpha: 0.16);
    transition: opacity 0.2s ease, visibility 0.2s ease;
    background-color: #fff;
    z-index: 20;
    overflow: hidden;
    .list {
      // width: 100%;
      padding-left: 8px;
      padding-top: 8px;
      list-style: none;
      margin: 0;
      max-height: 300px;
      overflow: auto;
      &__option {
        font-size: 13px;
        font-weight: 500;
        color: #62768e;
        padding: 6px;
        border-radius: 10px;
        cursor: pointer;
        transition: color 0.2s ease;
        position: relative;
        // width: 100%;
        span {
          display: inline-block;
          padding-right: 24px;
          // width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        &::before {
          opacity: 0;
          visibility: hidden;
          content: "";
          position: absolute;
          top: 8px;
          right: 16px;
          height: 10px;
          width: 6px;
          border-right: 1px solid #8a6bf6;
          border-bottom: 1px solid #8a6bf6;
          transform: rotate(45deg);
          transition: opacity 0.2s ease, visibility 0.2s ease;
        }
        &:hover {
          background-color: #f1f2f7;
        }
        &--hover {
          background-color: #f1f2f7;
        }
        &--selected {
          // background-color: #ece7fe;
          color: #8a6bf6;
          &::before {
            opacity: 1;
            visibility: visible;
          }
          &:hover {
            background-color: #ece7fe;
            color: #8a6bf6;
          }
        }
        &--empty {
          font-size: 13px;
          font-weight: 500;
          background-color: #fff;
          cursor: default;
          color: #999;
          text-align: center;
        }
      }
    }
  }
  &--active {
    .list-wrapper {
      opacity: 1;
      visibility: visible;
    }
    .display {
      &__icon {
        transform: rotate(180deg);
      }
    }
  }
  &--error {
    .display {
      border-color: lightcoral;
      &:hover ~ .combobox__error {
        opacity: 1;
        visibility: visible;
      }
    }
    .combobox__input {
      &:focus + .display {
        border-color: lightcoral;
      }
    }
  }
}
</style>