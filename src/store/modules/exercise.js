import axios from 'axios'
import attachmentApi from '../../api/attachmentApi'

const changeIsTempOfAttachments = (exerciseData) => {
    const tempAttachments = [];

    // change isTemp in parent questions
    // exerciseData.parentQuestions.forEach((parentQuestion) => {
    //   parentQuestion.attachments.forEach((attachment) => {
    //     if (attachment.isTemp === true) {
    //       attachment.isTemp = false;
    //       attachment.modifiedDate = modifiedDate;
    //       tempAttachments.push(attachment);
    //     }
    //   });
    // });

    // change isTemp in questions and answer
    exerciseData.questions.forEach((question) => {
        // change question attachments
        question.attachments.forEach((attachment) => {
            if (attachment.isTemp === true) {
                attachment.isTemp = false;
                tempAttachments.push(attachment);
            }
        });

        // change answer attachments
        question.answers.forEach((answer) => {
            if (answer.attachment && answer.attachment?.isTemp === true) {
                answer.attachment.isTemp = false;
                tempAttachments.push(answer.attachment);
            }
        });
    });

    return tempAttachments;
};

const exercise = {
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
            avatarFile: "",
            // avatar: "https://localhost:7051/image/default.png",
        }
    },

    mutations: {
        /**
         * Lưu giá trị thông tin bài tập
         * CreateBy:LEQUAN(14/2/2022)
         */
        saveDataExercise(state, data) {
            data.questions = state.exercise.questions ? state.exercise.questions : []
            data.exerciseId = state.exercise.exerciseId;
            state.exercise = data;
        },
        /**
         * Lưu dữ liệu câu hỏi và đáp ấn
         * CreateBy:LEQUAN(17/2/2022)
         */
        saveComposeQuestion(state, data) {
            const question = data.question
            const idx = data.idx
            if (idx !== undefined && idx !== null) {
                state.exercise.questions.splice(idx, 1, question)
            } else {
                state.exercise.questions.push(question);
            }
        },
        deleteQuestion(state, idx) {
            state.exercise.questions.splice(idx, 1);
        },
        getExercise(state, data) {
            
            state.exercise = data;
        },
        /**
      * reset exercise
      * CreateBy:LEQUAN(17/2/2022)
      */
        resetExercise(state) {
            state.exercise = {};
        }


    },
    /**
     * Lưu dữ liệu bài tập vào database
     * CreateBy:LEQUAN(17/2/2022)
     */
    actions: {
        /**
         * Lưu dữ liệu bài tập fake
         * CreateBy:LEQUAN(20/2/2022)
         */
        saveFakeExercise({ commit }, data) {
            commit('saveDataExercise', data);
        },
        /**
         * Lưu dữ liệu bài tập vào database
         * CreateBy:LEQUAN(20/2/2022)
         */
        // saveExercise({ commit, state }, data) {
        //     const question = data.question;
        //     const idx = data.idx;

        //     console.log("truoc", state.exercise )
        //     if (state.exercise.questions.length == 0) {
        //         commit('saveComposeQuestion', { question, idx });

        //         console.log(state.exercise)
        //      
        //         axios.post('https://localhost:7051/api/Exercises', state.exercise).then((response) => {
        //             console.log(response);
        //             commit('getExercise', response.data);
        //             if (data.callback) {
        //                 data.callback(response.data.exerciseId)
        //             }
        //         })

        //     }
        //     else {
        //         console.log('sửa câu hỏi')
        //         commit('saveComposeQuestion', { question, idx });
        //         axios.put(`https://localhost:7051/api/Exercises/${state.exercise.exerciseId}`, state.exercise).then((response) => {
        //             console.log(response);
        //             commit('getExercise', JSON.parse(JSON.stringify(state.exercise)));
        //         })
        //     }
        // },
        /**
         * Lưu dữ liệu bài tập vào database dưới dạng formdata
         * CreateBy:LEQUAN(20/2/2022)
         */
        saveExercise({ commit, state }, data) {
            const question = data.question;
            const idx = data.idx;
            if (state.exercise.questions.length == 0) {
                commit('saveComposeQuestion', { question, idx });
                const tempAttachments = changeIsTempOfAttachments(state.exercise);
                const formData = new FormData();

                formData.append("exerciseName", state.exercise.exerciseName);
                formData.append("gradeId", state.exercise.gradeId);
                formData.append("gradeName", state.exercise.gradeName);
                formData.append("subjectId", state.exercise.subjectId);
                formData.append("subjectName", state.exercise.subjectName);
                formData.append("avatarFile", state.exercise.avatarFile);
                formData.append("avatar", state.exercise.avatar);
                formData.append("textQuestions", JSON.stringify(state.exercise.questions));

                if (tempAttachments.length > 0) {
                    Promise.all([
                        axios.post('https://localhost:7051/api/Exercises', formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }),
                        attachmentApi.copy(tempAttachments)
                    ]).then((response) => {
                        commit('getExercise', response[0].data);
                        if (data.callback) {
                            data.callback(response[0].data.exerciseId)
                        }
                    })
                } else {
                    axios.post('https://localhost:7051/api/Exercises', formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }).then((response) => {
                        commit('getExercise', response.data);
                        if (data.callback) {
                            data.callback(response.data.exerciseId)
                        }
                    })
                }


            }
            else {
                commit('saveComposeQuestion', { question, idx });
                const tempAttachments = changeIsTempOfAttachments(state.exercise);
                console.log(tempAttachments)
                const formData = new FormData();
                formData.append("exerciseName", state.exercise.exerciseName);
                formData.append("gradeId", state.exercise.gradeId);
                formData.append("gradeName", state.exercise.gradeName);
                formData.append("subjectId", state.exercise.subjectId);
                formData.append("subjectName", state.exercise.subjectName);
                formData.append("avatarFile", state.exercise.avatarFile);
                formData.append("avatar", state.exercise.avatar);
                formData.append("textQuestions", JSON.stringify(state.exercise.questions));

                // axios.put(`https://localhost:7051/api/Exercises/${state.exercise.exerciseId}`, formData, {
                //     headers: {
                //         "Content-Type": "multipart/form-data",
                //     }
                // }).then((response) => {
                //     console.log(response);
                //     commit('getExercise', JSON.parse(JSON.stringify(state.exercise)));
                // })
                if (tempAttachments.length > 0) {

                    Promise.all([
                        axios.put(`https://localhost:7051/api/Exercises/${state.exercise.exerciseId}`, formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }),
                        attachmentApi.copy(tempAttachments)
                    ]).then((response) => {
                        commit('getExercise', response[0].data);
                        if (data.callback) {
                            data.callback(response[0].data.exerciseId)
                        }
                    })
                } else {
                    axios.put(`https://localhost:7051/api/Exercises/${state.exercise.exerciseId}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }).then((response) => {
                        commit('getExercise', response.data);
                        if (data.callback) {
                            data.callback(response.data.exerciseId)
                        }
                    })
                }
            }
        },


        /**
        * xóa câu hỏi
        * CreateBy:LEQUAN(20/2/2022)
        */
        deleteQuestion({ commit, state }, idx) {
            commit('deleteQuestion', idx);
            axios.put(`https://localhost:7051/api/Exercises/${state.exercise.exerciseId}`, state.exercise).then((response) => {
                console.log(response);
                commit('getExercise', JSON.parse(JSON.stringify(state.exercise)));
            })
        },
        /**
         * Load dữ liệu bài tập 
         * CreateBy:LEQUAN(17/2/2022)
         */
        loadExercise({ commit }) {
      
            axios.get(`https://localhost:7051/api/Exercises`).then((response) => {
                commit('getExercise', response.data)
            })
        },
        /**
         * Load dữ liệu bài tập theo id
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
        },
    }
}
export default exercise