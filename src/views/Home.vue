<template>
  <div class="m-container">
    <div class="m-header">
      <div class="m-header-left">
        <div class="m-menu-item">
          <div class="m-item-icon-dashboard"></div>
          <div class="m-item-text">Tổng quan</div>
        </div>
        <div class="m-menu-item">
          <div class="m-item-icon-class"></div>
          <div class="m-item-text">Lớp học</div>
        </div>
        <div class="m-menu-item-active">
          <div class="m-item-icon-multi"></div>
          <div class="m-item-text">Học liệu</div>
        </div>
      </div>
      <div class="m-header-right">
        <div class="m-item-icon-toggle"></div>
        <div class="m-item-icon-setting"></div>
        <div class="m-item-icon-mess"></div>
        <div class="m-item-icon-notify"></div>
        <div class="m-item-profile">
          <div class="m-profile-name">Quân</div>
          <div class="m-profile-avatar"></div>
        </div>
      </div>
    </div>
    <div class="m-content">
      <div style="height: 100%">
        <div class="storage-container">
          <div class="title-storage">
            <div class="title-storage-left">
              <div class="t-storage-active">Của tôi <span>(89)</span></div>
              <div class="t-storage">Chia sẻ của trường <span>(19)</span></div>
              <div class="t-storage">Tham khảo <span>(19)</span></div>
            </div>
            <div class="title-storage-right">
              <BaseButton>Chia sẻ</BaseButton>
              <BaseButton
                class="composing-button"
                @click.native="showHideDialog"
                >Soạn bài</BaseButton
              >
            </div>
          </div>
          <div class="option-storage">
            <div class="title-storage-left">
              <div class="m-combobox">
                <BaseCombobox
                  :dataOptions="grades"
                  fieldValue="GradeCode"
                  fieldDisplay="GradeName"
                  placeholder="Tất cả các khối"
                />
              </div>
              <div class="m-combobox">
                <BaseCombobox
                  :dataOptions="subjects"
                  fieldValue="SubjectCode"
                  fieldDisplay="SubjectName"
                  placeholder="Tất cả các môn"
                  ref="comboboxSubject"
                />
              </div>
              <div class="m-combobox">
                <BaseCombobox
                  :dataOptions="topics"
                  fieldValue="TopicId"
                  fieldDisplay="TopicName"
                  placeholder="Tất cả chủ đề"
                />
              </div>
              <div class="m-combobox">
                <BaseCombobox placeholder="Tất cả học liệu" />
              </div>
            </div>
            <div class="title-storage-right"><BaseInputSearch /></div>
          </div>
          <div class="excercises-container">
            <div class="grid-view"><BaseGridView /></div>
          </div>
        </div>
      </div>
      <DialogInfo ref="childDialogInfo" />
    </div>
  </div>
</template>
<script>
import BaseButton from "../components/base/BaseButton.vue";
import BaseCombobox from "../components/base/BaseCombobox.vue";
import BaseInputSearch from "../components/base/BaseInputSearch.vue";
import BaseGridView from "../components/base/BaseGridView.vue";
import { mapState } from "vuex";
import DialogInfo from "../components/dialog/DialogInfo.vue";
export default {
  components: {
    // component button
    BaseButton,
    // component combobox
    BaseCombobox,
    // component input search
    BaseInputSearch,
    // component gird table
    BaseGridView,
    // popup bổ sung thông tin
    DialogInfo,
  },
  data() {
    return {
      placeholder: "",
      topics: [],
    };
  },
  computed: {
    ...mapState("subjects", ["subjects"]),
    ...mapState("grades", ["grades"]),
  },
  methods: {
    // Ẩn hiện dialog bổ sung thông tin
    showHideDialog() {
      this.$refs.childDialogInfo.isShowHideDialog =
        !this.$refs.childDialogInfo.isShowHideDialog;
    },
  },
};
</script>
<style lang="scss" scoped>
.m-container {
  .m-header {
    background-color: #ffffff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.16);
    height: 64px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    .m-header-left {
      display: flex;
      .m-menu-item,
      .m-menu-item-active {
        display: flex;
        align-items: center;
        margin-right: 48px;
        padding: 0 12px;
        margin: 0 12px;
        .m-item-icon-dashboard {
          width: 32px;
          height: 32px;
          margin-right: 8px;
          background-image: url("../assets/icon/Group_46550.svg");
          background-size: contain;
          background-repeat: no-repeat;
        }
        .m-item-icon-class {
          width: 32px;
          height: 32px;
          margin-right: 8px;
          background-image: url("../assets/icon/Group_46552.svg");
          background-size: contain;
          background-repeat: no-repeat;
        }
        .m-item-icon-multi {
          width: 32px;
          height: 32px;
          margin-right: 8px;
          background-image: url("../assets/icon/Group_46551.svg");
          background-size: contain;
          background-repeat: no-repeat;
        }
        .m-item-text {
          font-size: 16px;
          font-weight: 500;
          color: #4e5b6a;
        }
      }
      .m-menu-item-active {
        display: flex;
        align-items: center;
        margin-right: 48px;
        border-bottom: 2px solid #8a6bf6;
        padding: 0 12px;
        margin: 0 12px;
      }
    }
    .m-header-right {
      display: flex;
      align-items: center;
      .m-item-icon-toggle {
        width: 32px;
        height: 32px;
        margin-right: 16px;
        background-image: url("../assets/icon/Group_52080.svg");
        background-size: contain;
        background-repeat: no-repeat;
      }
      .m-item-icon-setting {
        width: 32px;
        height: 32px;
        margin-right: 16px;
        background-image: url("../assets/icon/gear.svg");
        background-size: contain;
        background-repeat: no-repeat;
      }
      .m-item-icon-mess {
        width: 32px;
        height: 32px;
        margin-right: 16px;
        background-image: url("../assets/icon/Group_52079.svg");
        background-size: contain;
        background-repeat: no-repeat;
      }
      .m-item-icon-notify {
        width: 32px;
        height: 32px;
        margin-right: 16px;
        background-image: url("../assets/icon/Group_52078.svg");
        background-size: contain;
        background-repeat: no-repeat;
      }
      .m-item-profile {
        display: flex;
        align-items: center;
        .m-profile-name {
          font-size: 16px;
          font-weight: 700;
          color: #4e5b6a;
          margin-right: 16px;
        }
        .m-profile-avatar {
          width: 47px;
          height: 47px;
          margin-right: 16px;
          background-image: url("../assets/icon/Group_52077.svg");
          background-size: contain;
          background-repeat: no-repeat;
        }
      }
    }
  }
  .m-content {
    position: absolute;
    top: 64px;
    left: 0;
    // background-color: rgb(245, 157, 187);
    width: 100%;
    height: calc(100% - 64px);
    overflow-y: hidden;
    .storage-container {
      height: 100%;
      // background-color: rgb(207, 74, 140);
      padding: 24px;
      .title-storage {
        font-weight: 700;
        font-size: 16px;
        color: #4e5b6a;
        margin-bottom: 22px;
        display: flex;
        justify-content: space-between;
        .title-storage-left {
          display: flex;
          .t-storage {
            height: 40px;
            border-radius: 10px;
            text-align: center;
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 0 12px;
            font-size: 14px;
            font-weight: 500;
          }
          .t-storage-active {
            background-color: #ece7fe;
            color: #8a6bf6;
            height: 40px;
            border-radius: 10px;
            text-align: center;
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 0 12px;
            font-size: 14px;
            font-weight: 500;
          }
        }
        .title-storage-right {
          .composing-button {
            border: none;
            background-color: #8a6bf6;
            color: #fff;
            margin-left: 12px;
          }
        }
      }
      .option-storage {
        display: flex;
        justify-content: space-between;
        .title-storage-left {
          display: flex;
          .m-combobox {
            width: 150px;
            margin-right: 16px;
          }
        }
        .title-storage-right {
        }
      }
      .excercises-container {
        .grid-view {
        }
      }
    }
  }
}
</style>
