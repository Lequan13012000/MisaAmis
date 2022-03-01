<template>
  <ckeditor
    :editor="editor"
    :value="value"
    :config="editorConfig"
    @input="handleInput"
  ></ckeditor>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Vue from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue2";

Vue.use(CKEditor);

export default {
  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        // The configuration of the editor.
        placeholder: "Nhập câu hỏi tại đây...",
      },
    };
  },
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleInput(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss">
</style>