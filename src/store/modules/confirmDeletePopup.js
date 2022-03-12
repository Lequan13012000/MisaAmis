const confirmDeletePopup = {
    namespaced: true,
    state: {
        // ẩn hiện popup
        isActive: false,
        // index câu hỏi đc xóa
        index:null,
        questionType: null
    },
    mutations: {
        // mở popup
        openDeletePopup(state,{index, questionType}){
            state.isActive = true;
            state.index = index;
            state.questionType = questionType;
        },
          // đóng popup
          closeDeletePopup(state){
            state.isActive = false;
        }
    }
}
export default confirmDeletePopup