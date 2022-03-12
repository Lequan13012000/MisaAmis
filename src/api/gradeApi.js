import axiosClient from "./axiosClient";

/**
 * grade api
 * @author: LEQUAN(06/02/2022)
 */
const gradeApi = {
  /**
   * get all grades
   * @author: LEQUAN(06/02/2022)
   * @returns grades
   */
  getAll: () => {
    const url = "/Grades";
    return axiosClient.get(url);
  },
};

export default gradeApi;
