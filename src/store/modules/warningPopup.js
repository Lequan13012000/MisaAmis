
const warningPopup = {
  namespaced: true,
  state: () => ({
    isActive: false,
    text: [],
  }),
  mutations: {
    /**
     * open warning popup
     * @param {object} state state
     * @param {string} text text
     * @author: BMThang(28/01/2022)
     */
    openWarningPopup(state, text){
      state.isActive = true;
      state.text = text;
    },

    /**
     * close warning popup
     * @param {object} state state
     * @author: BMThang(28/01/2022)
     */
    [CLOSE_WARNING_POPUP]: (state) => {
      state.isActive = false;
    },
  },
};

export default warningPopup;
