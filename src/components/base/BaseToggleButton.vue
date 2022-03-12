<template>
  <div class="base-toggle-button">
    <input
      type="checkbox"
      class="base-toggle-button__input"
      :checked="checked"
      :name="name"
      :id="id"
      @change="$emit('change', $event.target.checked)"
    />
    <label
      :for="id"
      :class="[
        'base-toggle-button__label',
        { 'base-toggle-button__label--checked': checked },
      ]"
    ></label>
    <label :for="id" class="base-toggle-button__label-text">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "BaseToggleButton",
  model: {
    prop: "checked",
    event: "change",
  },
  emits: ["change"],
  props: {
    /**
     * name
     * @author: LEQUAN(24/02/2022)
     */
    name: { type: String, default: "" },

    /**
     * id
     * @author: LEQUAN(24/02/2022)
     */
    id: { type: String, default: "" },

    /**
     * label
     * @author: LEQUAN(24/02/2022)
     */
    label: { type: String, default: "" },

    /**
     * checked
     * @author: LEQUAN(24/02/2022)
     */
    checked: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
.base-toggle-button {
  height: 16px;
  position: relative;
  display: flex;
  align-items: center;
  &__input {
    position: absolute;
    height: 1px;
    width: 1px;
    opacity: 0;
  }
  &__label {
    display: flex;
    height: 16px;
    width: 26px;
    background-color: #b6b9ce;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.2s ease;
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 3px;
      transform: translate(0, -50%);
      height: 10px;
      width: 10px;
      background-color: #fff;
      border-radius: 50%;
      transition: left 0.2s ease;
    }
    &--checked {
      background-color: #8a6bf6;
      &::before {
        left: 13px;
      }
    }
  }
  &__label-text {
    display: block;
    padding-left: 7px;
    font-size: 16px;
    font-weight: 500;
    color: #636c6b;
    cursor: pointer;
  }
}
</style>