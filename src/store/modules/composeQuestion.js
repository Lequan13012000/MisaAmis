const composeQuestion = {
    namespaced: true,
    state: {
        isShowToolBar: true,
        // ẩn hiện form soạn câu hỏi
        isShowComposeQuestion: false,
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
            state.isShowToolBar = true;
            state.isShowComposeQuestion = false;
        },
    }
}
export default composeQuestion