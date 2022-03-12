import { QuestionType } from "./enum";

/**
 * resource
 * @author: LEQUAN(24/02/2022)
 */
const resource = {
  /**
   * no data text
   * @author: LEQUAN(24/02/2022)
   */
  noData: "Không có dữ liệu",

  /**
   * close text
   * @author: LEQUAN(24/02/2022)
   */
  closeText: "Đóng",

  /**
   * delete text
   * @author: LEQUAN(24/02/2022)
   */
  deleteText: "Xóa",

  /**
   * save text
   * @author: LEQUAN(24/02/2022)
   */
  saveText: "Lưu",

  /**
   * cancel text
   * @author: LEQUAN(24/02/2022)
   */
  cancelText: "Hủy",

  /**
   * delete question success text
   * @author: LEQUAN(24/02/2022)
   */
  deleteQuestionSuccessText: "Xóa câu hỏi thành công",

  /**
   * add image text
   * @author: LEQUAN(24/02/2022)
   */
  addImageText: "Thêm ảnh",

  /**
   * loading text
   * @author: LEQUAN(24/02/2022)
   */
  loadingText: "Đang tải",

  /**
   * add attachment text
   * @author: LEQUAN(24/02/2022)
   */
  addAttachmentText: "Thêm tệp đính kèm",

  /**
   * type answer text
   * @author: LEQUAN(24/02/2022)
   */
  typeAnswerText: "Nhập đáp án tại đây...",

  /**
   * type question text
   * @author: LEQUAN(24/02/2022)
   */
  typeQuestionText: "Nhập câu hỏi tại đây...",

  /**
   * type fill blank question text
   * @author: LEQUAN(24/02/2022)
   */
  typeFillBlankQuestionText:
    "Nhập câu hỏi tại đây... (Sau khi nhập câu hỏi và nhấn ra ngoài, phần mềm sẽ tự nhận diện dâu ba chấm, dâu gạch chân để tạo ô trống)",

  /**
   * add answer text
   * @author: LEQUAN(24/02/2022)
   */
  addAnswerText: "Thêm đáp án",

  /**
   * add fill blank answer text
   * @author: LEQUAN(24/02/2022)
   */
  addFillBlankAnswerText: "Thêm ô trống",

  /**
   * add hint text
   * @author: LEQUAN(24/02/2022)
   */
  addHintText: "Thêm lời giải",

  /**
   * root url of attachment
   * @author: LEQUAN(24/02/2022)
   */
  rootUrlOfAttachment: "https://localhost:7215/api/v1/Attachments/GetFile",

  /**
   * warning delete all answer text
   * @author: LEQUAN(24/02/2022)
   */
  warningDeleteAllAnswerText: "Không thể xóa toàn bộ đáp án",

  /**
   * warning delete all question text
   * @author: LEQUAN(24/02/2022)
   */
  warningDeleteAllQuestionText: "Không thể xóa toàn bộ câu hỏi",

  /**
   * fill blank box title
   * @author: LEQUAN(24/02/2022)
   */
  fillBlankBoxTitle: "Ô trống",

  /**
   * fill blank box placeholder
   * @author: LEQUAN(24/02/2022)
   */
  fillBlankBoxPlaceholder: "Nhập đáp án rồi nhấn Enter...",

  /**
   * choose answer text
   * @author: LEQUAN(24/02/2022)
   */
  chooseAnswerQuestionText: "Chọn đáp án",

  /**
   * choose correct or wrong question text
   * @author: LEQUAN(24/02/2022)
   */
  chooseCorrectOrWrongQuestionText: "Đúng sai",

  /**
   * fill blank question text
   * @author: LEQUAN(24/02/2022)
   */
  fillBlankQuestionText: "Điền vào chỗ trống",

  /**
   * text question text
   * @author: LEQUAN(24/02/2022)
   */
  textQuestionText: "Tự luận",

  /**
   * group question text
   * @author: LEQUAN(24/02/2022)
   */
  groupQuestionText: "Câu hỏi nhóm",

  /**
   * question name
   * @author: LEQUAN(24/02/2022)
   */
  questionName: "Câu",

  /**
   * group question name
   * @author: LEQUAN(24/02/2022)
   */
  groupQuestionName: "Câu hỏi nhóm",

  /**
   * hint form placeholder
   * @author: LEQUAN(24/02/2022)
   */
  hintFormPlaceholder: "Nhập lời giải tại đây...",

  /**
   * back to question text
   * @author: LEQUAN(24/02/2022)
   */
  backToQuestionText: "Quay lại câu hỏi",

  /**
   * warning file size
   * @author: LEQUAN(24/02/2022)
   */
  warningFileSize: "Kích thước file không quá 10Mb",

  /**
   * hint text
   * @author: LEQUAN(24/02/2022)
   */
  hintText: "Lời giải",

  /**
   * clone text
   * @author: LEQUAN(24/02/2022)
   */
  cloneText: "Nhân bản",

  /**
   * edit text
   * @author: LEQUAN(24/02/2022)
   */
  editText: "Chỉnh sửa",

  /**
   * watch text
   * @author: LEQUAN(24/02/2022)
   */
  watchText: "Xem",

  /**
   * incompleted text
   * @author: LEQUAN(24/02/2022)
   */
  incompletedText: "Đang soạn",

  /**
   * confirm delete entity text
   * @author: LEQUAN(24/02/2022)
   */
  confirmDeleteText: "Bạn có chắc chắn muốn xóa",

  /**
   * avatar text
   * @author: LEQUAN(24/02/2022)
   */
  avatarText: "Ảnh đại diện",

  /**
   * exercise name input placeholder
   * @author: LEQUAN(24/02/2022)
   */
  exerciseNameInputPlaceholder: "Nhận tên bài tập...",

  /**
   * exercise name input label
   * @author: LEQUAN(24/02/2022)
   */
  exerciseNameInputLabel: "Tên bài tập",

  /**
   * subject input placeholder
   * @author: LEQUAN(24/02/2022)
   */
  subjectInputPlaceholder: "Chọn môn học",

  /**
   * subject input label
   * @author: LEQUAN(24/02/2022)
   */
  subjectInputLabel: "Môn học",

  /**
   * grade input placeholder
   * @author: LEQUAN(24/02/2022)
   */
  gradeInputPlaceholder: "Chọn khối lớp",

  /**
   * grade input label
   * @author: LEQUAN(24/02/2022)
   */
  gradeInputLabel: "Khối lớp",

  /**
   * topic input placeholder
   * @author: LEQUAN(24/02/2022)
   */
  topicInputPlaceholder: "Chọn chủ đề",

  /**
   * topic input label
   * @author: LEQUAN(24/02/2022)
   */
  topicInputLabel: "Chủ đề",

  /**
   * search tag input label
   * @author: LEQUAN(24/02/2022)
   */
  searchTagInputLabel: "Thẻ tìm kiếm",

  /**
   * default exercise avatar url
   * @author: LEQUAN(24/02/2022)
   */
  defaultExerciseAvatarUrl: "https://localhost:7215/Images/SubjectAvatars/default.png",

  /**
   * required text
   * @author: LEQUAN(24/02/2022)
   */
  requiredText: "không được để trống",

  /**
   * nav links
   * @author: LEQUAN(24/02/2022)
   */
  navLinks: [
    {
      text: "Tổng quan",
      icon: "overall",
      component: { name: "Home" },
    },
    {
      text: "Lớp học",
      icon: "class",
      component: { name: "Home" },
    },
    {
      text: "Học liệu",
      icon: "exercise",
      component: { name: "Exercises" },
    },
  ],

  /**
   * active number label
   * @author: LEQUAN(24/02/2022)
   */
  activeNumberLabel: "Đánh số thứ tự cho câu hỏi nhỏ",

  /**
   * watch do exercise interface text
   * @author: LEQUAN(24/02/2022)
   */
  watchDoExerciseInterfaceText: "Xem giao diện làm bài",

  /**
   * add info text
   * @author: LEQUAN(24/02/2022)
   */
  addInfoText: "Bổ sung thông tin",

  /**
   * change the way to type text
   * @author: LEQUAN(24/02/2022)
   */
  changeWayToTypeText: "Đổi kiểu soạn",

  /**
   * trial text
   * @author: LEQUAN(24/02/2022)
   */
  trialText: "Làm thử",

  /**
   * complete text
   * @author: LEQUAN(24/02/2022)
   */
  completeText: "Hoàn thành",

  /**
   * import exercises text
   * @author: LEQUAN(24/02/2022)
   */
  importExercisesText: "Nhập khẩu/Tách câu hỏi tự động sử dụng công nghệ AI",

  /**
   * import exercises text2
   * @author: LEQUAN(24/02/2022)
   */
  importExercisesText2: "Nhấn để tải lên file bài tập hoặc kéo thả file vào đây.",

  /**
   * import exercises file format text
   * @author: LEQUAN(24/02/2022)
   */
  importExercisesFileFormatText: "File có định dạn xls, xlsx, doc, docx, pdf",

  /**
   * upload excel file text
   * @author: LEQUAN(24/02/2022)
   */
  uploadExcelFileText: "Tải tệp Excel mẫu",

  /**
   * create new question text
   * @author: LEQUAN(24/02/2022)
   */
  createNewQuestionText: "hoặc tự tạo câu hỏi mới",

  /**
   * choose question from library text
   * @author: LEQUAN(24/02/2022)
   */
  chooseQuestionFromLibraryText: "Chọn câu từ thư viện học liệu",

  /**
   * sort question text
   * @author: LEQUAN(24/02/2022)
   */
  sortQuestionText: "Sắp xếp thứ tự câu hỏi",

  /**
   * import text
   * @author: LEQUAN(24/02/2022)
   */
  importText: "Nhập khẩu",

  /**
   * split question text
   * @author: LEQUAN(24/02/2022)
   */
  splitQuestionText: "Tách câu hỏi tự động sử dụng AI",

  /**
   * question types
   * @author: LEQUAN(24/02/2022)
   */
  questionTypes: [
    {
      text: "Chọn đáp án đúng",
      value: QuestionType.chooseAnswer,
    },
    {
      text: "Đúng sai",
      value: QuestionType.chooseCorrectOrWrong,
    },
    {
      text: "Điền vào chỗ trống",
      value: QuestionType.fillBlank,
    },
    {
      text: "Tự luận",
      value: QuestionType.textQuestion,
    },
    {
      text: "Câu hỏi nhóm",
      value: QuestionType.groupQuestion,
    },
  ],

  /**
   * true text Vn
   * @author: LEQUAN(24/02/2022)
   */
  trueTextVn: "Đúng",

  /**
   * false text Vn
   * @author: LEQUAN(24/02/2022)
   */
  falseTextVn: "Sai",

  /**
   * true text Eng
   * @author: LEQUAN(24/02/2022)
   */
  trueTextEng: "True",

  /**
   * false text Eng
   * @author: LEQUAN(24/02/2022)
   */
  falseTextEng: "False",

  /**
   * save question success text
   * @author: LEQUAN(24/02/2022)
   */
  saveQuestionSuccessText: "Lưu câu hỏi thành công",

  /**
   * type question content text
   * @author: LEQUAN(24/02/2022)
   */
  typeQuestionContentText: "Cần điền nội dung câu hỏi",

  /**
   * type answer content text
   * @author: LEQUAN(24/02/2022)
   */
  typeAnswerContentText: "Cần điền nội dung câu trả lời",

  /**
   * type answer content text 2
   * @author: LEQUAN(24/02/2022)
   */
  typeAnswerContentText2: " cho câu hỏi ",

  /**
   * no correct answer warning text
   * @author: LEQUAN(24/02/2022)
   */
  noCorrectAnswerWaringText: "Cần ít nhất 1 đáp án đúng",

  /**
   * warning delete question text
   * @author: LEQUAN(24/02/2022)
   */
  warningDeleteQuestionText: "Bạn chắc chắn muốn xóa câu hỏi",

  /**
   * warning no question text
   * @author: LEQUAN(24/02/2022)
   */
  warningNoQuestionText: "Cần có ít nhất 1 cầu hỏi",

  /**
   * share of school text
   * @author: LEQUAN(24/02/2022)
   */
  shareOfSchoolText: "Chia sẻ của trường (19)",

  /**
   * my exercises text
   * @author: LEQUAN(24/02/2022)
   */
  myExercisesText: "Của tôi",

  /**
   * refered exercises text
   * @author: LEQUAN(24/02/2022)
   */
  referedExercisesText: "Tham khảo (19)",

  /**
   * share text
   * @author: LEQUAN(24/02/2022)
   */
  shareText: "Chia sẻ",

  /**
   * make exercise text
   * @author: LEQUAN(24/02/2022)
   */
  makeExerciseText: "Soạn bài",

  /**
   * search field placeholder
   * @author: LEQUAN(24/02/2022)
   */
  searchFieldPlaceholder: "Nhập tên học liệu để tìm kiếm",

  /**
   * not found exercise text
   * @author: LEQUAN(24/02/2022)
   */
  notFoundExerciseText: "Không tìm thấy học liệu",

  /**
   * exercise text
   * @author: LEQUAN(24/02/2022)
   */
  exerciseText: "học liệu",
};

export default resource;
