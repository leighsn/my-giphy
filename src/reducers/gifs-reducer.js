export default (state = [], action) => {
  switch (action.type){
    case "SEARCH":
      return [].concat(adapter(action.payload.data.data))
      
    case "NEXT_PAGE":
      return [].concat(...state, adapter(action.payload.data.data))
    default:
      return state
  }
}

function adapter(data){
  return data.map((img)=>{

    return {
        id: img.id,
        still: img.images.fixed_width_still.url,
        animated: img.images.fixed_width.url,
        height: img.images.fixed_width.height,
        width: img.images.fixed_width.width,
        title: img.title
      }
  })
}
