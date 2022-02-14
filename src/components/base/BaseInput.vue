<template>

    <input
      type="text"
      class="m-input"
      id="txtSearch"
      placeholder="Nhập tên bài tập..."
        @input="handleInput"
    />

</template>

<script>
export default {
  data() {
    return {
      value:""
    };
  },
 
   methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>
<style lang="scss" scoped>

  input.m-input {
    border-style: solid;
    border: 1px solid #ced4da;
    border-radius: 9.5px;
    height: 40px;
    outline: none;
    background-color: unset;
    padding: 0 12px 0 10px;
    box-sizing: border-box;
    // margin-bottom: 16px;
    width: 100%;
  }
  input.m-input::placeholder {
    color: #a4a6b7;
    font-size: inherit;
  }
  .m-input:focus {
    border-color: #8a6bf6;
}
</style>