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
