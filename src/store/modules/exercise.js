import axios from 'axios'
import attachmentApi from '../../api/attachmentApi'
import CommonJS from '../../scripts/commonJS'

const changeIsTempOfAttachments = (exerciseData) => {
    const tempAttachments = [];

    // change isTemp in parent questions
    // exerciseData.parentQuestions.forEach((parentQuestion) => {
    //     parentQuestion.attachments.forEach((attachment) => {
    //         if (attachment.isTemp === true) {
    //             attachment.isTemp = false;
    //             tempAttachments.push(attachment);
    //         }
    //     });
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
        // question.answers.forEach((answer) => {
        //     if (answer.attachment && answer.attachment?.isTemp === true) {
        //         answer.attachment.isTemp = false;
        //         tempAttachments.push(answer.attachment);
        //     }
        // });
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
            questions: [],
            parentQuestions: [],
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
            const question = data.question;
            const idx = data.idx;
            const parentQuestion = data.parentQuestion;
            const questions = data.questions;
            if (idx !== undefined && idx !== null) {
                if (questions && parentQuestion) {
                    const extParentQuestion = state.exercise.parentQuestions[idx]
                    const parentId = extParentQuestion.id

                    const sortOrderOfTheFirstChildQuestion = state.exercise.questions.find(question => question.parentId === parentId).sortOrder
                    // remove children question
                    state.exercise.questions = state.exercise.questions.filter(question => question.parentId !== parentId)
                    // add new children questio
                    state.exercise.questions.splice(sortOrderOfTheFirstChildQuestion, 0, ...questions)

                    //it quest
                    state.exercise.parentQuestions.splice(idx, 1, parentQuestion)
                } else {

                    state.exercise.questions.splice(idx, 1, question);
                }
            } else {
                if (questions && parentQuestion) {
                    state.exercise.questions = [...state.exercise.questions, ...questions];
                    state.exercise.parentQuestions.push(parentQuestion);
                } else {
                    state.exercise.questions.push(question);
                }
            }
        },
        deleteQuestion(state, { idx, questionType }) {
            if (questionType === 5) {
                const parentQuestion = state.exercise.parentQuestions[idx];
                const parentId = parentQuestion.id;
                const newQuestions = state.exercise.questions.filter(question => {
                    return question.parentId !== parentId
                })
                console.log(newQuestions)
                state.exercise.questions = newQuestions
                state.exercise.parentQuestions.splice(idx, 1)
            } else {

                state.exercise.questions.splice(idx, 1);
            }
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
         * Lưu dữ liệu bài tập vào database dưới dạng formdata
         * CreateBy:LEQUAN(20/2/2022)
         */
        saveExercise({ commit, state }, data) {
            const question = data.question;
            const idx = data.idx;
            const parentQuestion = data.parentQuestion;
            const questions = data.questions;
            if (state.exercise.questions.length == 0) {
                if (parentQuestion && questions) {
                    commit("saveComposeQuestion", { parentQuestion, questions, idx });
                } else {
                    commit("saveComposeQuestion", { question, idx });
                }
                const tempAttachments = changeIsTempOfAttachments(state.exercise);
                const formatedExercise = CommonJS.formatExerciseDataBeforeSendToServer(state.exercise);
                const formData = new FormData();
                formData.append("exerciseName", formatedExercise.exerciseName);
                formData.append("gradeId", formatedExercise.gradeId);
                formData.append("gradeName", formatedExercise.gradeName);
                formData.append("subjectId", formatedExercise.subjectId);
                formData.append("subjectName", formatedExercise.subjectName);
                formData.append("topicIds", JSON.stringify(formatedExercise.topicIds));
                formData.append("avatarFile", state.exercise.avatarFile);
                formData.append("avatar", formatedExercise.avatar);
                formData.append("textQuestions", JSON.stringify(formatedExercise.questions));
                formData.append("textParentQuestions", JSON.stringify(formatedExercise.parentQuestions));
                formData.append("textTopics", JSON.stringify(formatedExercise.topicIds));

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
                console.log(parentQuestion && questions);
                if (parentQuestion && questions) {
                    commit("saveComposeQuestion", { parentQuestion, questions, idx });
                } else {
                    console.log(1);
                    commit("saveComposeQuestion", { question, idx });
                }
                const tempAttachments = changeIsTempOfAttachments(state.exercise);
                const formatedExercise = CommonJS.formatExerciseDataBeforeSendToServer(state.exercise);
                const formData = new FormData();
                formData.append("exerciseName", formatedExercise.exerciseName);
                formData.append("gradeId", formatedExercise.gradeId);
                formData.append("gradeName", formatedExercise.gradeName);
                formData.append("subjectId", formatedExercise.subjectId);
                formData.append("subjectName", formatedExercise.subjectName);
                formData.append("topicIds", JSON.stringify(formatedExercise.topicIds));
                formData.append("avatarFile", state.exercise.avatarFile);
                formData.append("avatar", formatedExercise.avatar);
                formData.append("textQuestions", JSON.stringify(formatedExercise.questions));
                formData.append("textParentQuestions", JSON.stringify(formatedExercise.parentQuestions));
                formData.append("textTopics", JSON.stringify(formatedExercise.topicIds));

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
                            data.callback(null)
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
        deleteQuestion({ commit, state }, { idx, questionType }) {
            commit('deleteQuestion', { idx, questionType });
            const tempAttachments = changeIsTempOfAttachments(state.exercise);
            console.log(tempAttachments)
            const formatedExercise = CommonJS.formatExerciseDataBeforeSendToServer(state.exercise);
            const formData = new FormData();
            formData.append("exerciseName", formatedExercise.exerciseName);
            formData.append("gradeId", formatedExercise.gradeId);
            formData.append("gradeName", formatedExercise.gradeName);
            formData.append("subjectId", formatedExercise.subjectId);
            formData.append("subjectName", formatedExercise.subjectName);
            formData.append("topicIds", JSON.stringify(formatedExercise.topicIds));
            formData.append("avatarFile", formatedExercise.avatarFile);
            formData.append("avatar", formatedExercise.avatar);
            formData.append("textQuestions", JSON.stringify(formatedExercise.questions));
            formData.append("textParentQuestions", JSON.stringify(formatedExercise.parentQuestions));
            formData.append("textTopics", JSON.stringify(formatedExercise.topicIds));

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
                })
            } else {
                axios.put(`https://localhost:7051/api/Exercises/${state.exercise.exerciseId}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }).then((response) => {
                    commit('getExercise', response.data);
                })
            }
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