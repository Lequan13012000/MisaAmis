<template>
  <el-select
    v-model="value"
    filterable
    clearable
    :placeholder="placeholder"
    @input="handleInput"
  >
    <el-option
      v-for="item in dataOptions"
      :key="item.id"
      :label="item[`${fieldDisplay}`]"
      :value="item[`${fieldValue}`]"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  // emits: ["input"],
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    // mảng dữ liệu truyền vào
    dataOptions: {
      type: Array,
      default: () => [],
    },
    // giá trị item được chọn
    fieldValue: {
      type: String,
      default: "",
    },
    // tên hiển thị trên combobox
    fieldDisplay: {
      type: String,
      default: "",
    },
    // value: { type: [String, Number], default: "" },
  },
  methods: {
    handleInput(value) {
      this.$emit("input", value);
    },
  },
};
</script>
<style lang="scss">
.el-input__inner {
  border-radius: 9.625px !important;
  border: 1px solid #b6b9ce;
}
.el-select-dropdown__item.selected {
  font-weight: 500;
}
.el-popper[x-placement^="bottom"] {
  margin-top: 0;
  z-index: 3000 !important;
}
</style>
