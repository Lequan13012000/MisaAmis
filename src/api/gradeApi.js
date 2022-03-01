import axiosClient from "./axiosClient";

/**
 * grade api
 * @author: BMThang(06/02/2022)
 */
const gradeApi = {
  /**
   * get all grades
   * @author: BMThang(06/02/2022)
   * @returns grades
   */
  getAll: () => {
    const url = "/Grades";
    return axiosClient.get(url);
  },
};

export default gradeApi;
