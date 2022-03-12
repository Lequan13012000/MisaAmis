import axiosClient from "./axiosClient";

/**
 * topic api
 * @author: LEQUAN(06/02/2022)
 */
const topicApi = {
  /**
   * get topics by grade id and subject id
   * @param {string} gradeId grade id
   * @param {string} subjectId subject id
   * @returns topics
   * @author: LEQUAN(06/02/2022)
   */
  filter: (gradeId, subjectId) => {
    const url = "/Topics/Filter";
    const params = {
      gradeId,
      subjectId,
    };
    return axiosClient.get(url, {
      params,
    });
  },
};

export default topicApi;
