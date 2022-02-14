const questionType = {
    namespaced: true,
    state: {
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
        isShowQuestionType: false
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
    }
}
export default questionType