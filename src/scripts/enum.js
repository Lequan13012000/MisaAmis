/**
 * button type
 * @author: BMThang(24/02/2022)
 */
export class ButtonType {
  /**
   * primary
   * @author: BMThang(24/02/2022)
   */
  static primary = new ButtonType("primary");

  /**
   * secondary
   * @author: BMThang(24/02/2022)
   */
  static secondary = new ButtonType("secondary");

  constructor(name) {
    this.name = name;
  }
}

/**
 * side of tool tip
 * @author: BMThang(24/02/2022)
 */
export class SideOfTooltip {
  /**
   * left
   * @author: BMThang(24/02/2022)
   */
  static left = new SideOfTooltip("left");

  /**
   * right
   * @author: BMThang(24/02/2022)
   */
  static right = new SideOfTooltip("right");

  /**
   * top
   * @author: BMThang(24/02/2022)
   */
  static top = new SideOfTooltip("top");

  /**
   * bottom
   * @author: BMThang(24/02/2022)
   */
  static bottom = new SideOfTooltip("bottom");

  constructor(name) {
    this.name = name;
  }
}

/**
 * question type
 * @author: BMThang(24/02/2022)
 */
export const QuestionType = {
  /**
   * choose answer
   * @author: BMThang(24/02/2022)
   */
  chooseAnswer: 0,

  /**
   * choose correct or wrong
   * @author: BMThang(24/02/2022)
   */
  chooseCorrectOrWrong: 1,

  /**
   * fill blank question
   * @author: BMThang(24/02/2022)
   */
  fillBlank: 2,

  /**
   * text question
   * @author: BMThang(24/02/2022)
   */
  textQuestion: 3,

  /**
   * connect question
   * @author: BMThang(24/02/2022)
   */
  connectQuestion: 4,

  /**
   * group question
   * @author: BMThang(24/02/2022)
   */
  groupQuestion: 5,
};

/**
 * entity type
 * @author: BMThang(24/02/2022)
 */
export const EntityType = {
  /**
   * exercise
   * @author: BMThang(24/02/2022)
   */
  exercise: "exercise",

  /**
   * question
   * @author: BMThang(24/02/2022)
   */
  question: "question",
};

/**
 * tost msg state
 * @author: BMThang(24/02/2022)
 */
export const toastMsgState = {
  /**
   * success
   * @author: BMThang(24/02/2022)
   */
  success: "success",

  /**
   * danger
   * @author: BMThang(24/02/2022)
   */
  danger: "danger",

  /**
   * warning
   * @author: BMThang(24/02/2022)
   */
  warning: "warning",

  /**
   * primary
   * @author: BMThang(24/02/2022)
   */
  primary: "primary",
};

/**
 * subject code
 * @author: BMThang(24/02/2022)
 */
export const subjectCode = {
  /**
   * math
   * @author: BMThang(24/02/2022)
   */
  math: "TOAN",

  /**
   * geography
   * @author: BMThang(24/02/2022)
   */
  geography: "DIALY",

  /**
   * history
   * @author: BMThang(24/02/2022)
   */
  history: "LICHSU",

  /**
   * english
   * @author: BMThang(24/02/2022)
   */
  english: "TIENGANH",

  /**
   * literature
   * @author: BMThang(24/02/2022)
   */
  literature: "NGUVAN",

  /**
   * culture
   * @author: BMThang(24/02/2022)
   */
  culture: "GDCD",
};

/**
 * attachment icon
 * @author: BMThang(24/02/2022)
 */
export const attachmentIcon = {
  /**
   * image
   * @author: BMThang(24/02/2022)
   */
  image: "img",

  /**
   * video
   * @author: BMThang(24/02/2022)
   */
  video: "video",

  /**
   * word
   * @author: BMThang(24/02/2022)
   */
  word: "word",

  /**
   * excel
   * @author: BMThang(24/02/2022)
   */
  excel: "excel",

  /**
   * powerpoint
   * @author: BMThang(24/02/2022)
   */
  powerpoint: "powerpoint",

  /**
   * audio
   * @author: BMThang(24/02/2022)
   */
  audio: "audio",

  /**
   * pdf
   * @author: BMThang(24/02/2022)
   */
  pdf: "pdf",
};

/**
 * content type
 * @author: BMThang(24/02/2022)
 */
export const contentType = {
  /**
   * word 1
   * @author: BMThang(24/02/2022)
   */
  word1: "application/msword",

  /**
   * word 2
   * @author: BMThang(24/02/2022)
   */
  word2: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  /**
   * pdf
   * @author: BMThang(24/02/2022)
   */
  pdf: "application/pdf",

  /**
   * powerpoint 1
   * @author: BMThang(24/02/2022)
   */
  powerpoint1: "application/vnd.ms-powerpoint",

  /**
   * powerpoint 2
   * @author: BMThang(24/02/2022)
   */
  powerpoint2: "application/vnd.openxmlformats-officedocument.presentationml.presentation",

  /**
   * excel 1
   * @author: BMThang(24/02/2022)
   */
  excel1: "application/vnd.ms-excel",

  /**
   * excel 2
   * @author: BMThang(24/02/2022)
   */
  excel2: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

  /**
   * video
   * @author: BMThang(24/02/2022)
   */
  video: "video/mp4",

  /**
   * audio
   * @author: BMThang(24/02/2022)
   */
  audio: "audio/mp3",

  /**
   * image
   * @author: BMThang(24/02/2022)
   */
  image: "image/",
};

/**
 * exercise detail page status
 * @author: BMThang(24/02/2022)
 */
export const exerciseDetailPageStatus = {
  /**
   * empty
   * @author: BMThang(24/02/2022)
   */
  empty: "empty",
};
