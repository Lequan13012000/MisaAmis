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
            value: 6,
            label: 'Ghép nối',
        },
        {
            value: 5,
            label: 'Câu hỏi nhóm',
        },
        ],
        answers: [],
        content: "",
        index: null,
        attachments: [],
        questions: [],
        // data kiểu câu hỏi được chọn
        selectQuestion: 1,
        // ẩn hiện questiontype
        isShowQuestionType: false,
        sortOrder:null,
        id: null
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
         showHideQuestionType(state, payload) {
            state.isShowQuestionType = !state.isShowQuestionType;
            state.selectQuestion = payload?.value;
            state.answers = payload?.newAnswer;
            state.questions = payload?.newQuestions;
            state.content = payload?.newQuestion || "";
            state.index = payload?.index;
            state.sortOrder = payload?.sortOrder;
            state.id = payload?.id;
            state.attachments = payload?.attachments || [];
          },

        hiddenQuestionType(state) {
            state.isShowQuestionType = false;
        }
    }
}
export default questionType