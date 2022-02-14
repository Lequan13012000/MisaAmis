import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
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
        },
        subjects: [{
            SubjectId: 1,
            SubjectName: 'Toán',
        }, {
            SubjectId: 2,
            SubjectName: 'Tiếng Việt',
        }, {
            SubjectId: 3,
            SubjectName: 'Đạo Đức',
        }, {
            SubjectId: 4,
            SubjectName: 'Ngữ Văn',
        }],
        grades: [{
            GradeId: 1,
            GradeName: 'Khối 1',

        }, {
            GradeId: 2,
            GradeName: 'Khối 2',

        }, {
            GradeId: 3,
            GradeName: 'Khối 3',

        }, {
            GradeId: 4,
            GradeName: 'Khối 4',

        }],
        // topics: [{
        //     TopicId: 1,
        //     TopicName: 'Bảng cửu chương',
        //     SubjectId: 1,
        //     GradeId: 1
        // }, {
        //     TopicId: 2,
        //     TopicName: 'Phân số tối giản',
        //     SubjectId: 2,
        //     GradeId: 2
        // }],
        // tags: [{}],


        // data questiontype
        dynamics: [{
                value: 1,
                label: 'Chọn đáp án',
            },
            {
                value: 2,
                label: 'Đúng sai',
            },
            {
                value: 3,
                label: 'Điền vào chỗ trống',
            },
            {
                value: 4,
                label: 'Tự luận',
            },
            {
                value: 5,
                label: 'Ghép nối',
            },
            {
                value: 6,
                label: 'Câu hỏi nhóm',
            },
        ],
        // data kiểu câu hỏi được chọn
        selectQuestion: 1,
        // ẩn hiện questiontype
        isShowQuestionType: false,
        // ẩn hiện form chọn loại câu hỏi
        isShowToolBar: true,
        // ẩn hiện form soạn câu hỏi
        isShowComposeQuestion: false,

    },
    mutations: {
        questionType(state, value) {
            // mutate state
            state.selectQuestion = value;
        },
        /**
         * Ẩn form combobox chọn loại câu hỏi
         * CreateBy:LEQUAN(11/2/2022)
         */
        showHideQuestionType(state) {
            state.isShowQuestionType = !state.isShowQuestionType;
        },
        /**
         * Ẩn hiện form chọn loại câu hỏi hiển thị form soạn câu hỏi
         * CreateBy:LEQUAN(11/2/2022)
         */
        showComposeHideToolBar(state) {
            state.isShowToolBar = !state.isShowToolBar;
            state.isShowComposeQuestion = !state.isShowComposeQuestion
        },
        /**
         * Reset lại value ẩn hiện
         * CreateBy:LEQUAN(14/2/2022)
         */
        backShowComposeHideToolBar(state) {
            console.log("Quỳnh")
            state.isShowToolBar = true;
            state.isShowComposeQuestion = false;
        },
        /**
         * Lưu giá trị thông tin bài tập
         * CreateBy:LEQUAN(14/2/2022)
         */
        saveDataExercise(state, data) {
            state.exercise = data;
        },
    },
    actions: {},
    modules: {}
})