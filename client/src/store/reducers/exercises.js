import { SET_EXERCISES, ADD_EXERCISE, REMOVE_EXERCISE, SET_CURRENT_BODY_PART } from '../actions/exercises';

const initialState = {
    list: {},
    ids: [],
    bodyParts: [],
    currentBodyPart: '',
};

export default function reducer(state = initialState, action) {
    let newState = { ...state };
    switch (action.type) {
        case SET_EXERCISES:
            newState.list = { ...action.exerciseObject };
            newState.bodyParts = [...action.bodyPartsArray];
            newState.ids = Object.keys(newState.list);
            return newState;
        case SET_CURRENT_BODY_PART:
            newState.currentBodyPart = action.bodyPart;
            return newState;
        case ADD_EXERCISE:
            newState.list[action.exercise.id] = action.exercise;
            newState.ids.push(action.exercise.id);
            return newState;
        case REMOVE_EXERCISE:
            delete newState.list[action.exerciseId];
            newState.ids = newState.ids.filter(id => Number(id) !== Number(action.exerciseId));
            // We must check bodyPart array to see if it still includes the exercise body part we have just deleted.
            let newBodyPartsList = new Set();
            for (let listItem in newState.list) {
                console.log(newState.list[listItem]);
                if (newBodyPartsList.has(newState.list[listItem].body_part)) continue;
                newBodyPartsList.add(newState.list[listItem].body_part);
            }
            newState.bodyParts = Array.from(newBodyPartsList);
            return newState;
        default:
            return state;
    }
}
