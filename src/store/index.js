import Vue from "vue";
import Vuex from "vuex";
import exercise from "../store/modules/exercise";
import exerciseList from "../store/modules/exerciseList";
import composeQuestion from "../store/modules/composeQuestion"
import grades from "../store/modules/grades";
import questionType from "../store/modules/questionType";
import subjects from "../store/modules/subjects";
import topics from "../store/modules/topics"
import warningPopup from "../store/modules/warningPopup"
import loading from "../store/modules/loading"
import confirmDeletePopup from "../store/modules/confirmDeletePopup"
import confirmDeleteExercise from "../store/modules/confirmDeleteExercise"
import toastMessage from "../store/modules/toastMessage"
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        exercise,
        composeQuestion,
        grades,
        questionType,
        subjects,
        topics,
        exerciseList,
        warningPopup,
        loading,
        confirmDeletePopup,
        confirmDeleteExercise,
        toastMessage
    }
})