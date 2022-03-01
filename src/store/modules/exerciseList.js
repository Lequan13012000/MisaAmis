import axios from 'axios'
const exerciseList = {
    namespaced: true,
    state: {
        exercise: {
            // ExerciseName: 'Bài tập mẫu - Toán',
            // GradeId: 1,
            // GradeName: 'Khối 1',
            // SubjectId: '1',
            // SubjectName: 'Toán',
            // Avatar: {},
            // Tags: ['a', 'b'],
            // Topics: ['a', 'b'],
            // questions: [{
            //     type: null,
            //     attachments: [],
            //     content: "Tác giả của bài Dế Mèn bênh vực kẻ yếu là ai ?",
            //     answers: [{
            //             content: "Trần Đăng Khoa",
            //             incorrect: false,
            //             image: null,
            //         },
            //         {
            //             content: "Lê Anh Quân",
            //             incorrect: false,
            //             image: null,
            //         },
            //         {
            //             content: "Trần Diễm Quỳnh",
            //             incorrect: true,
            //             image: null,
            //         },
            //         {
            //             content: "Lê Tuấn Vũ",
            //             incorrect: false,
            //             image: null,
            //         },
            //     ],
            //     hint: "",
            // }, ],
            // Status: 0
        }
    },

    mutations: {

        getExercise(state, data) {
            state.exercise = data.data;
        },


    },
    /**
     * Lưu dữ liệu bài tập vào database
     * CreateBy:LEQUAN(17/2/2022)
     */
    actions: {
        /**
         * Load dữ liệu bài tập 
         * CreateBy:LEQUAN(17/2/2022)
         */
        loadExercise({ commit }, payload) {
            
            const params = {
                pageSize: 10,
                pageIndex: 1,
            }
            if (payload?.searchText) {
                params.searchText = payload.searchText;
            }
            if (payload?.gradeId) {
                params.gradeId = payload.gradeId;
            }
            if (payload?.subjectId) {
                params.subjectId = payload.subjectId;
            }
            if (payload?.topicId) {
                params.topicId = payload.topicId;
            }
            axios.get(`https://localhost:7051/api/Exercises/Filter`, { params }).then((response) => {
                commit('getExercise', response.data)
            })
        },
        /**
         * Load dữ liệu bài tập theo idz
         * CreateBy:LEQUAN(17/2/2022)
         */
        loadExerciseSelected({ commit }, exerciseId) {
            axios.get(`https://localhost:7051/api/Exercises/${exerciseId}`).then((response) => {
                commit('getExercise', response.data)
            })
        },
        /**
        * Xóa exercise
        * CreateBy:LEQUAN(17/2/2022)
        */
        deleteExercise({ state, dispatch }, value) {
            axios.delete(`https://localhost:7051/api/Exercises/${value}`, state.exercise).then((response) => {
                console.log(response.data)
                dispatch('loadExercise');
            })
        }
    }
}
export default exerciseList