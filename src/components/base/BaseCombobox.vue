<template>
  <el-select
    :value="value"
    filterable
    clearable
    :placeholder="placeholder"
    @input="handleInput"
    @change="changeData"
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
    return {};
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
    value: { type: [String, Number], default: "" },
  },
  methods: {
    handleInput(value) {
      this.$emit("input", value);
    },
    changeData(event) {
      const dataSelected = this.dataOptions.find(
        (option) => option[this.fieldValue] == event
      );
      // if(dataSelected)
      this.$emit("changeData", dataSelected);
    },
  },
  // computed: {
  //   valueSelected: {
  //     // getter
  //     get: function () {
  //       return this.value;
  //     },
  //     // setter
  //     set: function (newValue) {
  //       this.value = newValue;
  //     },
  //   },
  // },
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
