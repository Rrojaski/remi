  
import { combineReducers } from 'redux';
//Reducers
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'
import uiReducer from './uiReducer';
import authReducer from './authReducer';
import blogReducer from './blogReducer'

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    ui: uiReducer,
    auth: authReducer,
    blog: blogReducer
})


export default rootReducer;