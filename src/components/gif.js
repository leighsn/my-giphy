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
