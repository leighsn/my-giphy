export default (state = [], action) => {
  switch (action.type){
    case "SEARCH":
    debugger
      return [].concat(adapter(action.payload.data.data))
    default:
      return state
  }
}

function adapter(data){
  return data.map((img)=>{
    return {
        id: img.id,
        still: img.images.fixed_width_still.url,
        animated: img.images.fixed_width.url
      }
  })
}
