import { createStore, combineReducers } from "redux"
import langReducer from "./langReducer"
import userReducer from "./userReducer"

const configureStore = () => (
    createStore(
        combineReducers({
            lang: langReducer,
            user: userReducer
        })
    )
)

const store = configureStore()

export default store
