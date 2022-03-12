const loading = {
    namespaced: true,
    state: {
        // ẩn hiện loading
        isLoading: false
    },
    mutations: {
        // mở loading
        openLoading(state){
            state.isLoading = true;
        },
          // đóng loading
          closeLoading(state){
            state.isLoading = false;
        }
    }
}
export default loading