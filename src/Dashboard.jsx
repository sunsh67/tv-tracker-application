import React, { Component } from 'react';
import UserController from './UserController';

class Dashboard extends Component{
	constructor(props){
		super(props);
		this.state = {
			display: 'none',//for buttons
            userOption:'',
            disabled: false
		}
		this.onDashButton = this.onDashButton.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleAfter = this.handleAfter.bind(this);
		this.handleAfterLogout = this.handleAfterLogout.bind(this);
	}
    handleRegister(){
        this.setState({userOption:'register'});
    }
    handleLogin(){
        this.setState({userOption:'login'});
    }
    handleAfter(){
        this.setState({display: 'none', userOption: 'userInfo',disabled: true});
    }
    handleAfterLogout(){
        this.setState({userOption: '',disabled: false});
    }
    onDashButton(){
    	if(!this.state.disabled){
    		this.setState({display: 'block'});
    	}
    }

	render(){
        let buttons = <div></div>;
        if(this.state.display === 'block'){
            buttons = (
             <div id='buttons'>
             <button onClick={this.handleRegister}>Sign Up</button>
             <button onClick={this.handleLogin}>Login</button>
             </div>)
        }
		return(
			<div className='dashboard'>
			<div className='dashBtn-container'><button onClick={this.onDashButton} id='dashButton'>My Dashboard</button></div>
			{buttons}
            <UserController userOption={this.state.userOption} onAfter={this.handleAfter} onAfterLogout={this.handleAfterLogout}/>
			</div>
			);
	}
}

export default Dashboard;