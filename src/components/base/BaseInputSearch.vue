<template>
  <div class="m-base-input-search">
    <div class="icon-search"></div>
    <input
      type="text"
      class="m-input m-input-search"
      id="txtSearch"
      placeholder="Nhập tên học liệu để tìm kiếm"
    />
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.m-base-input-search {
  position: relative;
  display: flex;
  .icon-search {
    background-image: url("../../assets/icon/Group_30044.svg");
    width: 16px;
    height: 16px;
    position: absolute;
    background-size: contain;
    background-repeat: no-repeat;
    top: 12px;
    left: 12px;
    cursor: pointer;
  }
  input.m-input {
    border-style: solid;
    border: 1px solid #ced4da;
    border-radius: 4px;
    height: 32px;
    outline: none;
    background-color: unset;
    padding: 0 12px 0 10px;
    box-sizing: border-box;
    margin-bottom: 16px;
  }
  input.m-input-search {
    border-radius: 9.5px;
    border: 1px solid #b6b9ce;
    height: 39px;
    width: 300px;
    padding-left: 34px;
    overflow: hidden;
    color: #a4a6b7;
    font-size: inherit;
  }

  input.m-input-search::placeholder {
    color: #a4a6b7;
    font-size: inherit;
  }
  .m-input:focus {
    border-color: #8a6bf6;
}
}
</style>