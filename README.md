### Make a Giphy Clone

This app was configured with create-react-app. Check out [the documentation](create-react-app-readme.md).


### Functionality
+ User visits our app, sees grid-style display of still gifs
+ Hovering over a gif causes it to be animated
+ User can search for gifs by keyword
+ User can click on a gif to see details

### Creating the Search Bar

+ Make a new folder inside /src called containers. Then, make new file: `search-bar.js`. This will hold our search bar container.

```JavaScript
//search-bar.js
import React, { Component } from 'react'

class SearchBar extends Component {
  render(){
    return (
      <form>
        <input type="text" />
        <button type="submit"></button>
      </form>
    )
  }
}

export default SearchBar
```


To add styling:

```javaScript
//serach-bar.js
  <form className="searchbar">
    <input type="text" className="col-xs-10" placeholder="Search for gifs"/>
    <button className="btn btn-info btn-large" type="submit">
      <span className="glyphicon glyphicon-search"></span>
    </button>
  </form>
```

Next, we'll give our SearchBar component **state** and handle some user interactions.

Add constructor to our class so we can initialize it with a state object:

```javaScript
//inside SearchBar class
constructor(props){
  super(props)
  this.state = {term: ''}
}

```

Now, we'll hook up our input element to our state.term property, and define a callback to update the value whenever the text changes:

```javaScript
//inside the form
<input type="text" value={this.state.term} onChange={this.handleChange} className="col-xs-10" placeholder="Search for gifs"/>


//on the SearchBar class, we'll write a new method
//because of scope rules, we'll need to bind this to it, which we can do inside the constructor

handleChange(e){
  this.setState({term: e.target.value})
}
```

Next, we need to figure our how to search for gifs. Because we'll want to use Redux to hold this data, we'll need to create a Redux store that will hold application state.

To hold our gifs, the state object will look like this:

```javascript
const state = {
  gifs: []
}
```

We'll also need a gifs reducer. Let's make a new folder called reducers and make a `gifs-reducer.js` file.

```javascript
export default (state = [], action) => {
  switch (action.type){
    case "SEARCH":
      // to come
    default:
      return state
  }
}
```

**Note the default value for state**


Let's set up our store in a new file, `store.js`, and import it into `index.js`.


```JavaScript
//store.js
import { createStore } from 'redux'
import gifsReducer from './reducers/gifs-reducer'

const Store = createStore(gifsReducer)

export default Store


```




Next, we'll create an action that will fetch our gifs. Let's look at the [Giphy API documentation](https://github.com/Giphy/GiphyAPI#search-endpoint) to see how we can fetch our data.

We'll code the data fetching in our `actions.js` file:

```javascript
import axios from 'axios'

const giphyKey = 'dc6zaTOxFJmzC'

export function search(term){
  let slugTerm = term.replace(' ', '+')
  let url = `http://api.giphy.com/v1/gifs/search?q=${slugTerm}&api_key=${giphyKey}&limit=25`
  let gifs = axios.get(url)
  return {
    type: "SEARCH",
    payload: gifs,
    term: term
  }
}


```


Now we need to make one change to our store - adding middleware. Because our action relies on an async call, we need to prevent it from being dispatched until the payload Promise is resolved.

We'll write some custom middleware that's just a set of curried functions that will check if the payload is a promise, and not pass it in to the dispatcher unless it's not a promise.

We'll make a new file called middleware and add the following code:

```javascript
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

// promiseMiddleware(store)(next)(action)

export default promiseMiddleware

```
Next, we'll add this middleware to our application so that each action will flow through the middleware before being dispatched to our reducers. We'll use Redux's `applyMiddleware` function to change how we're creating our Store:


```javaScript
//store.js

import { createStore, applyMiddleware } from 'redux'
import gifsReducer from './reducers/gifs-reducer'
import promiseMiddleware from './promise-middleware'


const store = applyMiddleware(promiseMiddleware)(createStore)(gifsReducer)

export default store

```


Now, we need to wrap our app in a special React element `<Provider />` that will let us make the store and application state available to the React classes that we connect with it. We'll add this to `index.js`:

```JavaScript
import { Provider } from 'react-redux'
import Store from './store'


ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

```

This lets us connect our React components to our Redux functions so that our action (hitting the API) gets dispatched to our reducers and our application state gets updated.

We'll do this by using the connect function from React-Redux and importing this and our search function into our SearchBar component.

At the bottom of our file (outside our SearchBar class), we'll change the default export to a new version of our SearchBar that is connected to our application state's dispatch function.

```javascript
//search-bar.js
import { connect } from 'react-redux'
import { search } from '../actions'


export default connect(null, {search})(SearchBar)
```

This does two things:
+ Makes the search function available as a prop on the SearchBar component
+ Wraps the search function in `store.dispatch` so that any time search is invoked, the return value is passed to all reducers

Next, we'll fill in our reducer function so that once it receives the data from Giphy, it will return only the info that we need:

```javascript
export default (state = [], action) => {
  switch (action.type){
    case "SEARCH":
      return [].concat(adapter(action.payload.data))
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
```

Great! So now we should have our data, but we don't have a way to display it.

We'll want to have a type of component that will hold each gif info and render it, and a parent component that can connect to our state object, iterate over the list of gifs, and render them.

Let's start by making an element to represent a single gif. Because we want this element to have state (still gif and animated gif), we'll make it a React class.

Make a new file in /components called gif.js.

```javascript
import React, { Component } from 'react'

class Gif extends Component {
  constructor(props){
    super(props)
    this.state = {image: props.still}
  }
  render(){
    return (
      <img src={this.state.image} />
    )
  }

}

export default Gif
```

We know we'll need to have a parent component that will use our data to create instances of our Gif elements and pass down information on props. Let's make that parent element now


Make a new file in `/containers` called gifs.js. This element will be a container because we need it to access our application state.

```javascript
//gifs.js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Gif from '../components/gif'

class Gifs extends Component {
  constructor(props){
    super(props)
    this.renderGifs = this.renderGifs.bind(this)
  }

  render(){
    return (
      <div>
      {this.renderGifs()}
      </div>
    )
  }

  renderGifs(){
    return this.props.gifs.map((gif)=>{
      return <Gif key={gif.id} still={gif.still} animated={gif.animated} />
    })
  }

}

function mapStateToProps(state){
  return {
    gifs: state
  }
}
export default connect(mapStateToProps)(Gifs)


```

So now we have a parent container component that will render our gifs for us. It's connected to application state, so it should have access to the gifs once we get them back from the API.

So now we can search for gifs and render the data we receive as React elements. But right now, we only have still images. Let's updated our React element so that when we hover over a gif, it will switch the `src` property to point to the URL of the animated gif.

Let's update our gif class to handle a user hover action:


```JavaScript
import React, { Component } from 'react'

class Gif extends Component {
  constructor(props){
    super(props)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.state = {image: props.still}
  }
  render(){
    return (
      <div className="gif">
        <img onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} src={this.state.image} />
      </div>
    )
  }

  handleMouseEnter(e){
    this.setState({image: this.props.animated})
  }

  handleMouseLeave(){
    this.setState({image: this.props.still})
  }
}

export default Gif

```

Now we should have a basic working app but it's missing some things. It doesn't have any gifs on the homepage when we visit. We need to handle this action.

The functionality we want is this:
When a user first visits the site, we want the app to render trending gifs.
When there is a search term, we want the app to fetch those gifs.

We want the URL to change.
