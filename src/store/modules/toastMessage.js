const toastMessage = {
    namespaced: true,
    state: {
        // ẩn hiện toast message câu hỏi
        isActiveToastMsg: false,
        // ẩn hiện toast message bài tập
        isActiveToastMsgExercise:false
    },
    mutations: {
        // mở toast message
        openToastMsg(state){
            state.isActiveToastMsg = true;
        },
          // đóng toast message
          closeToastMsg(state){
            state.isActiveToastMsg = false;
        },

         // mở toast message bài tập
         openToastMsgExercise(state){
            state.isActiveToastMsgExercise = true;
        },
          // đóng toast message bài tập
          closeToastMsgExercise(state){
            state.isActiveToastMsgExercise = false;
        }
    }
}
export default toastMessage