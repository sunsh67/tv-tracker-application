import React, { Component } from 'react';

class Follow extends Component{
  constructor(props){
     super(props);
     this.handleOnFollow = this.handleOnFollow.bind(this);
  }
  handleOnFollow(){
     this.props.onFollow(this.props.series);
  }
  render(){
     return(<button onClick={this.handleOnFollow}>Follow</button>)
  }
}

export default Follow;