import React, { Component } from 'react';
import inforpic from './user.svg';

class UserInfo extends Component{

    render(){
        if(this.props.display !== 'none' && this.props.username !== ''){
    	return(
    		<div className='userinfo' style={{display: this.props.display}}>
    		<div id='welcome'>Welcome!</div>
    		<div id='info-pic'><img src={inforpic} alt='info'/></div>
    		<div id='username'>{this.props.username}</div>
            <div id='logout-container'><button id='logout' onClick={this.props.onLogout}>Logout</button></div>
    		</div>
    		);}
        return (<div></div>);
    }
	}
export default UserInfo; 