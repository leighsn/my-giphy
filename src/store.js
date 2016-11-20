import { createStore, applyMiddleware } from 'redux'
import gifsReducer from './reducers/gifs-reducer'
import promiseMiddleware from 'redux-promise'


const Store = applyMiddleware(promiseMiddleware)(createStore)(gifsReducer)

export default Store
