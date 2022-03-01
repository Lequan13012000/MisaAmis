import axios from 'axios'
const grades = {

    namespaced: true,
    state: {
        grades: [{
            GradeId: 1,
            GradeName: 'Khối 1',

        }, {
            GradeId: 2,
            GradeName: 'Khối 2',

        }, {
            GradeId: 3,
            GradeName: 'Khối 3',

        }, {
            GradeId: 4,
            GradeName: 'Khối 4'
        }]
    },
    actions: {
        loadGrade({commit}) {
            axios.get('https://localhost:7051/api/Grades').then((response) => {
                commit('getGrade', response.data)
            })
        }
    },
    mutations: {
        getGrade(state, data) {
            state.grades = data;
        },
    }
}
export default grades