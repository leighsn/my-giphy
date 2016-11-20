import axios from 'axios'

const giphyKey = 'dc6zaTOxFJmzC'

export function search(term){
  let slugTerm = term.replace(' ', '+')
  let url = `http://api.giphy.com/v1/gifs/search?q=${slugTerm}&api_key=${giphyKey}&limit=24`
  let gifs = axios.get(url)
  return {
    type: "SEARCH",
    payload: gifs
  }
}
