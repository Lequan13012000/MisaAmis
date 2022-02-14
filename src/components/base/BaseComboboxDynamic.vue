<template>
  <el-select v-model="value" filterable clearable :placeholder="placeholder">
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
      value: "",
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    // mảng dữ liệu truyền vào
    dataOptions: {
      type: Array,
      default: () => []
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

</style>
