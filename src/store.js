import { createStore, applyMiddleware } from 'redux'
import gifsReducer from './reducers/gifs-reducer'
import promiseMiddleware from './promise-middleware'


const store = applyMiddleware(promiseMiddleware)(createStore)(gifsReducer)

export default store
