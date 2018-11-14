import React, { Component } from 'react'
import { search } from '../actions/actions'
import { connect } from 'react-redux'



class SearchBar extends Component {

  state = {
    term: ''
  }

  render(){
    return (
      <form className="searchbar" onSubmit={this.handleSubmit}>
        <input type="text" className="col-xs-10" placeholder="Search for gifs" onChange={this.handleChange} value={this.state.term}/>
        <button className="btn btn-info btn-large" type="submit">
          <span className="glyphicon glyphicon-search"></span>
        </button>
      </form>
    )
  }

  handleChange = (event) => {
    this.setState({ term: event.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.search(this.state.term)
  }
}

export default connect(null, { search })(SearchBar)
