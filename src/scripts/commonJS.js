import { contentType, attachmentIcon } from "./enum";

class CommonJS {
  static deepCloneObject(obj) {
    const clonedObject = JSON.parse(JSON.stringify(obj));
    return clonedObject;
  }

  static formatExerciseDataBeforeSendToServer(exerciseData) {
    const newExerciseData = CommonJS.deepCloneObject(exerciseData);
    const lengthOfQuestions = newExerciseData.questions.length;

    newExerciseData.parentQuestions = newExerciseData.parentQuestions.map((question, idx) => {
      return { ...question, sortOrder: idx };
    });

    let childQuestionNumber = 1;
    let questionNumber = 0;
    const newQuestions = [];
    for (let idx = 0; idx < lengthOfQuestions; idx++) {
      const question = newExerciseData.questions[idx];
      if (question.parentId !== undefined && question.parentId !== null) {
        const parentQuestion = newExerciseData.parentQuestions.find(
          (parentQuestion) => parentQuestion.id === question.parentId
        );
        const isActiveNumber = parentQuestion.isActiveNumber;

        if (newExerciseData.questions[idx - 1]?.parentId === question.parentId) {
          if (isActiveNumber) {
            childQuestionNumber += 1;
            newQuestions.push({
              ...question,
              number: `${questionNumber}.${childQuestionNumber}`,
              sortOrder: idx,
            });
          } else {
            questionNumber += 1;
            newQuestions.push({
              ...question,
              number: `${questionNumber}`,
              sortOrder: idx,
            });
          }
        } else {
          if (isActiveNumber) {
            questionNumber += 1;
            childQuestionNumber = 1;
            parentQuestion.number = `${questionNumber}`;
            newQuestions.push({
              ...question,
              number: `${questionNumber}.${childQuestionNumber}`,
              sortOrder: idx,
            });
          } else {
            questionNumber += 1;
            parentQuestion.number = `Câu hỏi nhóm`;
            newQuestions.push({
              ...question,
              number: `${questionNumber}`,
              sortOrder: idx,
            });
          }
        }
      } else {
        questionNumber += 1;
        newQuestions.push({
          ...question,
          number: `${questionNumber}`,
          sortOrder: idx,
        });
      }
    }
    newExerciseData.questions = newQuestions;
    return newExerciseData;
  }

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
