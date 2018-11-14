import React, { Component } from 'react'

class Gif extends Component {

  constructor(props){
    super(props)
    this.state = { image: props.still }
  }

  render(){
    return (
      <span className="gif__container">
        <img className="gif" alt={this.props.title} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} src={this.state.image} />
      </span>
    )
  }

  handleMouseEnter = (e) => {
    this.setState({ image: this.props.animated })
  }

  handleMouseLeave = () => {
    this.setState({ image: this.props.still })
  }
}

export default Gif
