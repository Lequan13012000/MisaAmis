const exercise = {
    namespaced: true,
    state: {
        exercise: {
            ExrciseName: 'Bài tập mẫu - Toán',
            GradeId: 1,
            GradeName: 'Khối 1',
            SubjectId: '1',
            SubjectName: 'Toán',
            Avatar: {},
            Tags: ['a', 'b'],
            Topics: ['a', 'b'],
            Questions: [{
                Type: 1,
                Content: 'abcd',
                Attachments: [{}],
                Answers: [{
                    Content: '',
                    Correct: false,
                    Image: {

                    }
                }]
            }]
        }
    },

    mutations: {
        /**
         * Lưu giá trị thông tin bài tập
         * CreateBy:LEQUAN(14/2/2022)
         */
        saveDataExercise(state, data) {
            state.exercise = data;
        }
    }
}
export default exercise