import React, { Component } from 'react'
import { connect } from 'react-redux'
import { search } from '../actions'

class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state = {term: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render(){
    return (
      <form className="searchbar" onSubmit={this.handleSubmit}>
        <input value={this.state.term} onChange={this.handleChange} type="text" className="col-xs-10" placeholder="Search for gifs" />
        <button className="btn btn-info btn-large" type="submit">
          <span className="glyphicon glyphicon-search"></span>
        </button>
      </form>
    )
  }

  handleChange(e){
    this.setState({term: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.search(this.state.term)
  }
}


export default connect(null, {search})(SearchBar)
