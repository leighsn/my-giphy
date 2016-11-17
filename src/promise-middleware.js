const promiseMiddleware = (store) => {
  return function (next){
    return function (action){
      if (typeof action.payload.then !== 'function') {
        return next(action)
      }
      return action.payload.then((resp)=>{
        store.dispatch(Object.assign({}, action, {payload: resp.data}))
      })
    }
  }
}

export default promiseMiddleware
