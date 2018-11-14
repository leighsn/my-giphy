import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Gif from '../components/gif'

class Gifs extends PureComponent {

  render(){
    const { gifs = [] } = this.props

    return (
      <section className='gifs'>
      {
        gifs.length && gifs.map((gif)=>{
          return <Gif key={gif.id} still={gif.still} animated={gif.animated} />
        })
      }
      </section>
    )
  }
}

function mapStateToProps(state){
  return {
    gifs: state
  }
}

export default connect(mapStateToProps)(Gifs)
