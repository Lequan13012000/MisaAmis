import axios from 'axios'
const subjects = {
    namespaced: true,
    state: {
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
        }]
    },
    actions: {
        loadSubject({ commit }) {
            axios.get('https://localhost:7051/api/Subjects').then((response) => {
                commit('getSubject', response.data)
            })
        }
    },
    mutations: {
        getSubject(state, data) {
            state.subjects = data;
        },
    }
}
export default subjects