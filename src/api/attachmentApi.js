import axiosClient from "./axiosClient";

/**
 * grade api
 * @author: LEQUAN(06/02/2022)
 */
const attachmentApi = {
  /**
   * insert attachment to database
   * @param {object} attachment attachment
   * @author: LEQUAN(06/02/2022)
   */
  insert(attachment) {
    const url = "Attachments";
    return axiosClient.post(url, attachment, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /**
   * copy attachment to attachment folder in server
   * @param {Array} attachments attachment array
   * @author: LEQUAN(06/02/2022)
   */
  copy(attachments) {
    const url = "Attachments/Copy";
    return axiosClient.post(url, attachments);
  },
};

export default attachmentApi;
