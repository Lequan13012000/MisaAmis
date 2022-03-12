const confirmDeleteExercise = {
    namespaced: true,
    state: {
        // ẩn hiện popup
        isActiveDeleteExercise: false,
        // index câu hỏi đc xóa
        value:null
    },
    mutations: {
        // mở popup
        openDeleteExercise(state,value){
            state.isActiveDeleteExercise = true;
            state.value = value;
        },
          // đóng popup
          closeDeleteExercise(state){
            state.isActiveDeleteExercise = false;
        }
    }
}
export default confirmDeleteExercise 
