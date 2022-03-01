import axiosClient from "./axiosClient";

/**
 * exercise api
 * @author: BMThang(06/02/2022)
 */
const exerciseApi = {
  /**
   * get all exercise
   * @returns exercises
   * @author: BMThang(06/02/2022)
   */
  getAll() {
    const url = "/Exercises";
    return axiosClient.get(url);
  },

  /**
   * get exercise by it's id
   * @param {string} exerciseId exercise id
   * @author: BMThang(06/02/2022)
   * @returns exercise
   */
  getById(exerciseId) {
    const url = `/Exercises/${exerciseId}`;
    return axiosClient.get(url);
  },

  /**
   * get filted exercises
   * @param {number} pageSize page size
   * @param {number} pageIndex page index
   * @param {string} searchText search text
   * @param {string} gradeId grade id
   * @param {string} subjectId subject id
   * @param {string} topicId topic id
   * @returns filted exercises
   * @author: BMThang(07/02/2022)
   */
  filter(pageSize, pageIndex, searchText, gradeId, subjectId, topicId, isCompleted) {
    const url = `Exercises/Filter`;
    const params = {
      pageSize,
      pageIndex,
    };
    if (searchText) {
      params.searchText = searchText;
    }
    if (gradeId) {
      params.gradeId = gradeId;
    }
    if (subjectId) {
      params.subjectId = subjectId;
    }
    if (topicId) {
      params.topicId = topicId;
    }
    if (isCompleted) {
      params.isCompleted = isCompleted;
    }
    return axiosClient.get(url, {
      params,
    });
  },

  /**
   * insert exercise to api
   * @param {object} exerciseData exercise data
   * @author: BMThang(06/02/2022)
   * @returns new exercise
   */
  insert(exerciseData) {
    const url = "/Exercises";
    return axiosClient.post(url, exerciseData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /**
   * update exercise by it's id
   * @param {string} exerciseId exercise id
   * @param {object} exerciseData exercise data
   * @author: BMThang(06/02/2022)
   */
  update(exerciseId, exerciseData) {
    const url = `/Exercises/${exerciseId}`;
    return axiosClient.put(url, exerciseData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /**
   * delete exercise by it's id
   * @param {string} exerciseId exercise id
   * @author: BMThang(06/02/2022)
   */
  delete(exerciseId) {
    const url = `/Exercises/${exerciseId}`;
    return axiosClient.delete(url);
  },
};

export default exerciseApi;
