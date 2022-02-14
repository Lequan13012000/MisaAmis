<template>
  <ckeditor
    :editor="editor"
    v-model="editorData"
    :config="editorConfig"
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
      editorData: "<p>Nhập đáp án...</p>",
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
};
</script>

<style lang="scss">
</style>