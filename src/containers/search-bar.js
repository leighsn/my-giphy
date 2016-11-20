import React, { Component } from 'react'
import { search } from '../actions'
import { connect } from 'react-redux'



class SearchBar extends Component {
  constructor(){
    super()
    this.state = {term: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleChange(event){
    this.setState({term: event.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.search(this.state.term)
    this.setState({term: ''})
  }
}

export default connect( null , {search})(SearchBar)
