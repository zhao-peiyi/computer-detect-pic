import './SignIn.css';
import React from 'react';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signinEmail:'',
      signinPassword: '',
    }
  }

  onInputChange = (event, input) => {
    this.setState({ [input]: event.target.value});
  }

  onSubmitClick = (event) => {
    fetch('http://localhost:2000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signinEmail,
        password: this.state.signinPassword,
      }),
    })
    .then( response => response.json())
    .then( data => {
      if(data !== 'fail') {
        this.props.loadUser(data);
        this.props.onRouteChange('homepage')
      }
    })
  }

  render() {
    return(
      <div id="sign">
          <h1>Sign In</h1>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={(event)=>this.onInputChange(event, 'signinEmail')}/>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={(event)=>this.onInputChange(event, 'signinPassword')}/>
          <button onClick={ this.onSubmitClick }>Sign in</button>
          <p onClick={ () => this.props.onRouteChange('register') }>Register</p>
      </div>
    );
  }
}

export default SignIn;
