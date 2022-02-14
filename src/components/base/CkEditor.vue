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
      editorData: "<p>Nhập câu hỏi tại đây...</p>",
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
};
</script>

<style lang="scss">
// .ck.ck-editor {
//    width: 100%;
//     padding: 0 8px;
//     margin-top: 38px;
//     border: none;
// }
// .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused) {
//   height: 156px;
// }
// .ck-rounded-corners .ck.ck-editor__main>.ck-editor__editable, .ck.ck-editor__main>.ck-editor__editable.ck-rounded-corners {
//     height: 196px;
//     border: none;
//     display:flex;
//     align-items: center;
// }
// .ck.ck-editor__top .ck-sticky-panel .ck-toolbar {
//     border: none;
// }
// .ck.ck-reset_all * {
//     display: none;
// }
.ck.ck-dropdown {
    display: none;
}
.ck.ck-editor__main > .ck-editor__editable{
  border-color: var(--ck-color-base-border);
  border: none;
  font-size: 16px;
  background-color: #fff2ab;
  &:focus{
      border: none;
      box-shadow: none;
  }
}
.ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-toolbar{
    background-color: #fff2ab;
    border: none;
}
.ck.ck-toolbar.ck-toolbar_grouping>.ck-toolbar__items {
    flex-wrap: nowrap;
    display: flex;
    justify-content: flex-end;
}
.ck.ck-toolbar .ck.ck-toolbar__separator {
    display: none;
}
// .ck.ck-editor__editable_inline>:last-child {
//     margin-bottom: var(--ck-spacing-large);
//     position: absolute;
//     top: 50%;
//     left: 43%;
// }

</style>