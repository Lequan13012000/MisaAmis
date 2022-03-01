import { contentType, attachmentIcon } from "./enum";

class CommonJS {
 

  static formattedAttachments(attachments) {
    const attachmentList = JSON.parse(JSON.stringify(attachments));
    const newAttachments = attachmentList.map((attachment) => {
      // set icon of attachment by it's content type
      let icon;
      switch (attachment.contentType) {
        case contentType.word1:
          icon = attachmentIcon.word;
          break;
        case contentType.word2:
          icon = attachmentIcon.word;
          break;
        case contentType.pdf:
          icon = attachmentIcon.pdf;
          break;
        case contentType.powerpoint1:
          icon = attachmentIcon.powerpoint;
          break;
        case contentType.powerpoint2:
          icon = attachmentIcon.powerpoint;
          break;
        case contentType.excel1:
          icon = attachmentIcon.excel;
          break;
        case contentType.excel2:
          icon = attachmentIcon.excel;
          break;
        case contentType.video:
          icon = attachmentIcon.video;
          break;
        case contentType.audio:
          icon = attachmentIcon.audio;
          break;
        default:
          icon = attachmentIcon.image;
          break;
      }
      // is image property
      const isImg = icon === attachmentIcon.image;
      return {
        src: `https://localhost:7051/api/attachments/GetFile/${attachment.attachmentId}?isDownLoad=${!isImg}`,
        name: attachment.fileName,
        isImg: isImg,
        contentType: attachment.contentType,
        icon,
      };
    });
    return newAttachments;
  }
}

export default CommonJS;
