import axiosClient from "./axiosClient";

/**
 * subject api
 * @author: BMThang(06/02/2022)
 */
const subjectApi = {
  /**
   * get all subjects
   * @returns subjects
   * @author: BMThang(06/02/2022)
   */
  getAll: () => {
    const url = "/Subjects";
    return axiosClient.get(url);
  },
};

export default subjectApi;
