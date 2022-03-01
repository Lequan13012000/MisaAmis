import axiosClient from "./axiosClient";

/**
 * tag api
 * @author: BMThang(06/02/2022)
 */
const tagApi = {
  /**
   * get tags by grade id and subject id
   * @param {string} gradeId grade id
   * @param {string} subjectId subject id
   * @returns tags
   * @author: BMThang(06/02/2022)
   */
  filter: (gradeId, subjectId) => {
    const url = "/Tags/Filter";
    const params = {
      gradeId,
      subjectId,
    };
    return axiosClient.get(url, {
      params,
    });
  },
};

export default tagApi;
