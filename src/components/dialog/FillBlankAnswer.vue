<template>
  <div class="compose-dialog__answer">
    <div class="grid">
      <div class="fill-answer">
        <div class="answer">
          <div class="answer-index">Ô trống 1</div>
          <div class="ms-tag-input">
            <VoerroTagsInput
              element-id="tags"
              v-model="selectedTags"
              :typeahead="true"
              placeholder="Nhập đáp án rồi nhấn Enter..."
            ></VoerroTagsInput>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VoerroTagsInput from "@voerro/vue-tagsinput";

// require("@voerro/vue-tagsinput/dist/style.css");

export default {
  data() {
    return {
      selectedTags: "",
    };
  },
  components: {
    VoerroTagsInput,
  },
};
</script>

<style src='@voerro/vue-tagsinput/dist/style.css'>
</style>

<style lang="scss" scoped>
.compose-dialog__answer {
  padding-bottom: 1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
  margin-top: 1rem;
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 12px;
    margin-bottom: 16px;
    .fill-answer {
      position: relative;
      .answer {
        display: flex;
        align-items: center;
        .answer-index {
          width: 5rem;
          margin-right: 0.5rem;
        }
      }
      .ms-tag-input {
        width: 100%;
        ::v-deep .tags-input-wrapper-default {
          padding: 0.5em 0.25em;
          background: #fff;
          border-color: #dbdbdb;
          border-radius: 9.5px;
          border: 1px solid #b6b9ce;
          height: 32px;
          &.active {
            border: 1px solid #8a6bf6;
            box-shadow: none;
          }
          .tags-input-badge-pill {
            border-radius: 8px;
            padding: 10px;
            padding-right: 24px;
          }
          .tags-input-badge-selected-default {
            color: #4e5b6a;
            background-color: #ffaec7;
            font-weight: normal;
          }
          .tags-input-remove {
            background-color: #7b7e8e;
            border-radius: 50%;
            top: unset;
            right: unset;
            margin-left: 5px;
          }
          .tags-input-remove:after,
          ::before {
            content: "";
            width: 68%;
            background-color: #fff;
          }
          input::placeholder {
          }
        }
      }
    }
    .add-answer {
      display: flex;
      .w-20 {
        width: 5rem;
        margin-right: 0.5rem;
      }
    }
    .add-answer-detail {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px dashed #dcdfe6;
      border-radius: 10px;
      background-color: #f1f2f7;
      cursor: pointer;
      color: rgba(78, 91, 106, 0.7);
      width: 100%;
      font-size: 16px;
      line-height: 24px;
      font-weight: 700;
    }
  }
}
</style>