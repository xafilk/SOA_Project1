import { combineReducers } from 'redux'
import carItems from './carItems'
import userInfo from './userInfo'

export default combineReducers({
    carItems,
    userInfo
})