/**
 * button type
 * @author: LEQUAN(24/02/2022)
 */
export class ButtonType {
  /**
   * primary
   * @author: LEQUAN(24/02/2022)
   */
  static primary = new ButtonType("primary");

  /**
   * secondary
   * @author: LEQUAN(24/02/2022)
   */
  static secondary = new ButtonType("secondary");

  constructor(name) {
    this.name = name;
  }
}

/**
 * side of tool tip
 * @author: LEQUAN(24/02/2022)
 */
export class SideOfTooltip {
  /**
   * left
   * @author: LEQUAN(24/02/2022)
   */
  static left = new SideOfTooltip("left");

  /**
   * right
   * @author: LEQUAN(24/02/2022)
   */
  static right = new SideOfTooltip("right");

  /**
   * top
   * @author: LEQUAN(24/02/2022)
   */
  static top = new SideOfTooltip("top");

  /**
   * bottom
   * @author: LEQUAN(24/02/2022)
   */
  static bottom = new SideOfTooltip("bottom");

  constructor(name) {
    this.name = name;
  }
}

/**
 * question type
 * @author: LEQUAN(24/02/2022)
 */
export const QuestionType = {
  /**
   * choose answer
   * @author: LEQUAN(24/02/2022)
   */
  chooseAnswer: 0,

  /**
   * choose correct or wrong
   * @author: LEQUAN(24/02/2022)
   */
  chooseCorrectOrWrong: 1,

  /**
   * fill blank question
   * @author: LEQUAN(24/02/2022)
   */
  fillBlank: 2,

  /**
   * text question
   * @author: LEQUAN(24/02/2022)
   */
  textQuestion: 3,

  /**
   * connect question
   * @author: LEQUAN(24/02/2022)
   */
  connectQuestion: 4,

  /**
   * group question
   * @author: LEQUAN(24/02/2022)
   */
  groupQuestion: 5,
};

/**
 * entity type
 * @author: LEQUAN(24/02/2022)
 */
export const EntityType = {
  /**
   * exercise
   * @author: LEQUAN(24/02/2022)
   */
  exercise: "exercise",

  /**
   * question
   * @author: LEQUAN(24/02/2022)
   */
  question: "question",
};

/**
 * tost msg state
 * @author: LEQUAN(24/02/2022)
 */
export const toastMsgState = {
  /**
   * success
   * @author: LEQUAN(24/02/2022)
   */
  success: "success",

  /**
   * danger
   * @author: LEQUAN(24/02/2022)
   */
  danger: "danger",

  /**
   * warning
   * @author: LEQUAN(24/02/2022)
   */
  warning: "warning",

  /**
   * primary
   * @author: LEQUAN(24/02/2022)
   */
  primary: "primary",
};

/**
 * subject code
 * @author: LEQUAN(24/02/2022)
 */
export const subjectCode = {
  /**
   * math
   * @author: LEQUAN(24/02/2022)
   */
  math: "TOAN",

  /**
   * geography
   * @author: LEQUAN(24/02/2022)
   */
  geography: "DIALY",

  /**
   * history
   * @author: LEQUAN(24/02/2022)
   */
  history: "LICHSU",

  /**
   * english
   * @author: LEQUAN(24/02/2022)
   */
  english: "TIENGANH",

  /**
   * literature
   * @author: LEQUAN(24/02/2022)
   */
  literature: "NGUVAN",

  /**
   * culture
   * @author: LEQUAN(24/02/2022)
   */
  culture: "GDCD",
};

/**
 * attachment icon
 * @author: LEQUAN(24/02/2022)
 */
export const attachmentIcon = {
  /**
   * image
   * @author: LEQUAN(24/02/2022)
   */
  image: "img",

  /**
   * video
   * @author: LEQUAN(24/02/2022)
   */
  video: "video",

  /**
   * word
   * @author: LEQUAN(24/02/2022)
   */
  word: "word",

  /**
   * excel
   * @author: LEQUAN(24/02/2022)
   */
  excel: "excel",

  /**
   * powerpoint
   * @author: LEQUAN(24/02/2022)
   */
  powerpoint: "powerpoint",

  /**
   * audio
   * @author: LEQUAN(24/02/2022)
   */
  audio: "audio",

  /**
   * pdf
   * @author: LEQUAN(24/02/2022)
   */
  pdf: "pdf",
};

/**
 * content type
 * @author: LEQUAN(24/02/2022)
 */
export const contentType = {
  /**
   * word 1
   * @author: LEQUAN(24/02/2022)
   */
  word1: "application/msword",

  /**
   * word 2
   * @author: LEQUAN(24/02/2022)
   */
  word2: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  /**
   * pdf
   * @author: LEQUAN(24/02/2022)
   */
  pdf: "application/pdf",

  /**
   * powerpoint 1
   * @author: LEQUAN(24/02/2022)
   */
  powerpoint1: "application/vnd.ms-powerpoint",

  /**
   * powerpoint 2
   * @author: LEQUAN(24/02/2022)
   */
  powerpoint2: "application/vnd.openxmlformats-officedocument.presentationml.presentation",

  /**
   * excel 1
   * @author: LEQUAN(24/02/2022)
   */
  excel1: "application/vnd.ms-excel",

  /**
   * excel 2
   * @author: LEQUAN(24/02/2022)
   */
  excel2: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

  /**
   * video
   * @author: LEQUAN(24/02/2022)
   */
  video: "video/mp4",

  /**
   * audio
   * @author: LEQUAN(24/02/2022)
   */
  audio: "audio/mp3",

  /**
   * image
   * @author: LEQUAN(24/02/2022)
   */
  image: "image/",
};

/**
 * exercise detail page status
 * @author: LEQUAN(24/02/2022)
 */
export const exerciseDetailPageStatus = {
  /**
   * empty
   * @author: LEQUAN(24/02/2022)
   */
  empty: "empty",
};
