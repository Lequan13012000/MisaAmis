<template>
  <div class="compose-exercise">
    <div class="extract">
      <div class="extract__title">
        Nhập khẩu / Tách câu hỏi tự động sử dụng công nghệ AI
      </div>
      <div class="upload-wrap">
        <div class="button-download-wrap">
          <BaseButton class="upload-button">Tải tệp Excel mẫu</BaseButton>
        </div>
        <div class="extract__content">
          <label for="" class="drop-zone">
            <div class="file-extract">
              <div class="extract__content__icon">
                <img
                  src="https://sisapapp.misacdn.net/lms/img/ic_extract.d2383948.svg"
                  alt=""
                />
              </div>
              <div class="extract__content__desc">
                Nhấn để tải lên file bài tập hoặc kéo thả file vào đây.
                <br />
                File có định dạng xls, xlsx, doc, docx, pdf
              </div>
            </div>
          </label>
          <div class="preview-menu-container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "../base/BaseButton.vue";
export default {
  components: {
    BaseButton
  },
};
</script>

<style lang="scss" scoped>
.compose-exercise {
  color: #4e5b6a;
  height: 100%;
  padding-bottom: 20px;
  .extract {
    padding-top: 2.5rem;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    .extract__title {
      margin-bottom: 1.5rem;
      font-weight: 700;
      font-size: 18px;
      line-height: 26px;
    }
    .upload-wrap {
      width: 840px;
      height: 224px;
      justify-content: center;
      display: flex;
      position: relative;
      .button-download-wrap {
        z-index: 999;
        bottom: 1.5rem;
        position: absolute;
        .upload-button{
            width: 132px;
            color:#8a6bf6!important
        }
      }
      .extract__content {
        width: 840px;
        // height: 224px;
        border: 2px dashed #b6b9ce;
        padding: 24px 0;
        border-radius: 10px;
        label.drop-zone {
           position: absolute;
    top: 24px;
    left: 0;
    right: 0;
    z-index: 50;
          .file-extract {
            overflow: hidden;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
            height: 100%;
            display: flex;
            .extract__content__icon {
              margin-bottom: 16px;
              height: 64px;
            }

            .extract__content__desc {
              text-align: center;
            }
          }
        }
        .preview-menu-container {
        }
      }
    }
  }
  .compose {
  }
}
</style>