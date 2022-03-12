<template>
  <div class="question-attachment">
    <ul class="question-attachment__attachments">
      <li
        class="attachment-card"
        v-for="(attachment, idx) in formattedAttachments"
        :key="idx"
      >
        <a
          :href="attachment.src"
          target="_blank"
          tabindex="-1"
          :title="attachment.name"
        >
          <img
            class="attachment-card-display"
            v-if="attachment.isImg"
            :src="attachment.src"
            :alt="attachment.name"
          />
          <div v-else class="attachment-card-doc">
            <div :class="['m-icon', `m-icon--${attachment.icon}`]"></div>
            <span>{{ attachment.name }}</span>
          </div>
        </a>
        <button tabindex="-1" @click="deleteAttachment(idx)">
          <img
            style="width: 100%; position: absolute; top: 0px; left: 0px"
            src="https://sisapapp.misacdn.net/lms/img/x_sign.1c600a62.svg"
            alt=""
          />
        </button>
      </li>
      <li class="question-attachment__btn">
        <input
          type="file"
          :name="name"
          :id="id"
          hidden
          accept="image/*,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.mp4,.mp3"
          @change="handleChangeFile"
          ref="attachment"
        />
        <div class="attachment-loading" v-if="isLoading">
          <div class="attachment-loading__circle"></div>
          <div class="attachment-loading__text">Đang tải</div>
        </div>
        <label :for="id" v-else>
          <div class="m-icon m-icon--plus">
            <img
              src="https://sisapapp.misacdn.net/lms/img/plus_single.108bfd89.svg"
              alt=""
            />
          </div>
          <span>Thêm tệp đính kèm</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
// api
import attachmentApi from "../../api/attachmentApi";

import CommonJS from "../../scripts/commonJS";

export default {
  name: "QuestionAttachment",
  props: {
    /**
     * name of input
     * @author: LEQUAN(24/02/2022)
     */
    name: { type: String, default: "" },

    /**
     * id of input
     * @author: LEQUAN(24/02/2022)
     */
    id: { type: String, default: "" },

    /**
     * attachment list
     * @author: LEQUAN(24/02/2022)
     */
    value: { type: Array, default: () => [] },
  },
  emits: ["input"],
  data() {
    return {
      /**
       * is loading
       * @author: LEQUAN(24/02/2022)
       */
      isLoading: false,
    };
  },
  computed: {
    /**
     * formatted attachments
     * @author: LEQUAN(24/02/2022)
     */
    formattedAttachments() {
      return CommonJS.formattedAttachments(this.value);
    },
  },
  methods: {
    /**
     * handle change file
     * @author: LEQUAN(24/02/2022)
     */
    async handleChangeFile() {
      if (this.$refs.attachment.files[0]) {
        // max file size
        const maxFileSize = 10485760;

        // if file size is greater than max file size => open tost msg
        if (this.$refs.attachment.files[0].size > maxFileSize) {
          console.log(1);
        }

        // set loading
        this.isLoading = true;

        // create form data
        const formData = new FormData();
        formData.append("resource", this.$refs.attachment.files[0]);

        // send form data to server
        const attachmentData = await attachmentApi.insert(formData);

        // emit input event with new attachment
        this.$emit("input", [...this.value, attachmentData]);

        // close loading
        this.isLoading = false;
      }
    },

    /**
     * delete attachment
     * @param {number} idx index of selected attachment
     * @author: LEQUAN(24/02/2022)
     */
    deleteAttachment(idx) {
      // create new attachments
      const newAttachments = [...this.value];

      // remove selected attachment
      newAttachments.splice(idx, 1);

      // emit input event
      this.$emit("input", [...newAttachments]);
    },
  },
};
</script>

<style lang="scss" scoped>
.question-attachment {
  padding-bottom: 11px;
  padding-right: 11px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  ::-webkit-scrollbar {
    background-color: transparent !important;
    height: 8px !important;
  }
  &__attachments {
    display: flex;
    align-items: flex-end;
    margin-left: 11px;
    width: 100%;
    // height: 95px;
    // overflow-x: auto;
    overflow-y: visible;
    .attachment-card {
      flex-shrink: 0;
      width: 144px;
      height: 72px;
      margin-left: 11px;
      position: relative;
      &::marker {
        color: #fff2ab;
      }
      &:first-child {
        margin-left: 0;
      }

      a {
        display: block;
        height: 100%;
        width: 100%;
        border-radius: 8px;
        background-color: #f1f2f7;
        // img {
        //   display: block;
        //   height: 100%;
        //   width: 100%;
        //   object-fit: contain;
        // }
        .attachment-card-display {
          display: block;
          height: 100%;
          width: 100%;
          object-fit: contain;
        }
      }
      button {
        position: absolute;
        top: -4px;
        right: -4px;
        display: flex;
        align-items: center;
        border: none;
        outline: none;
        padding: 0;
        height: 20px;
        width: 20px;
        background-color: #fff;
        border-radius: 50%;
        cursor: pointer;
      }
      .attachment-card-doc {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        span {
          position: absolute;
          bottom: -23px;
          left: 0;
          right: 0;
          padding: 3px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          color: #000;
          text-align: center;
          background-color: rgba($color: #000000, $alpha: 0.2);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          transition: bottom 0.2s ease;
        }
        &:hover span {
          bottom: 0;
        }
      }
    }
  }
  &__btn {
    flex-shrink: 0;
    display: block;
    margin-left: 11px;
    background-color: #f1f2f7;
    height: 72px;
    width: 144px;
    border-radius: 8px;
    label {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      span {
        display: block;
        margin-top: 4px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(177 130 246);
      }
    }
    .attachment-loading {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      flex-direction: column;
      &__circle {
        height: 25px;
        width: 25px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-left-color: purple;
        border-top-color: purple;
        animation: attachment-loading 0.5s ease infinite;
      }
      &__text {
        margin-top: 4px;
        font-size: 14px;
        font-weight: 700;
        color: purple;
        cursor: default;
      }
      @keyframes attachment-loading {
        0% {
          transform: rotate(0deg);
        }
        25% {
          transform: rotate(90deg);
        }
        50% {
          transform: rotate(180deg);
        }
        75% {
          transform: rotate(270deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>