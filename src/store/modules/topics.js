import axios from 'axios'
const topics = {
    namespaced: true,
    state: {
        topics: [
        //     {
        //     topicId: 1,
        //     topicName: 'Toán',
        // }, {
        //     topicId: 2,
        //     topicName: 'Tiếng Việt',
        // }, {
        //     topicId: 3,
        //     topicName: 'Đạo Đức',
        // }, {
        //     topicId: 4,
        //     topicName: 'Ngữ Văn',
        // }
    ]
    },
    actions: {
        loadTopic({ commit },payload) {
            axios.get(`https://localhost:7051/api/Topics/Filter?gradeId=${payload.gradeId}&subjectId=${payload.subjectId}`).then((response) => {
                commit('getTopic', response.data)
            })
        }
    },
    mutations: {
        getTopic(state, data) {
            state.topics = data;
        },
        setTopic(state, data) {
            state.topics = data;
        }
    }
}
export default topics