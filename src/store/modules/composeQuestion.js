const composeQuestion = {
    namespaced: true,
    state: {
        isShowToolBar: true,
        // ẩn hiện form soạn câu hỏi
        isShowComposeQuestion: false,
        // state soạn câu hỏi
        questionData: {
            content: "",
            answer: [
                {
                    content: "",
                    incorrect: false,
                },
                {
                    content: "",
                    incorrect: false,
                },
                {
                    content: "",
                    incorrect: false,
                },
                {
                    content: "",
                    incorrect: false,
                },
            ],
        },
    },
    mutations: {
        /**
         * Ẩn hiện form chọn loại câu hỏi hiển thị form soạn câu hỏi
         * CreateBy:LEQUAN(11/2/2022)
         */
        showComposeHideToolBar(state) {
            state.isShowToolBar = !state.isShowToolBar;
            state.isShowComposeQuestion = !state.isShowComposeQuestion;
        },
        /**
         * Reset lại value ẩn hiện
         * CreateBy:LEQUAN(14/2/2022)
         */
        backShowComposeHideToolBar(state) {
            console.log('test dublicate')
            state.isShowToolBar = true;
            state.isShowComposeQuestion = false;
        },
        /**
         * Lưu dữ liệu câu hỏi và đáp ấn
         * CreateBy:LEQUAN(17/2/2022)
         */
        saveComposeQuestion(state, data) {
            state.questionData = data;
        }
    }
}
export default composeQuestion