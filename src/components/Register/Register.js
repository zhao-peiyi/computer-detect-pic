import React from 'react';

class Register extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        registerName: '',
        registerEmail: '',
        registerPassword: '',
      };
  }

  onInputChange = (event, input) => {
    this.setState({ [input]: event.target.value})
  }

  onSubmitClick = () => {
    fetch('http://localhost:2000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.registerName,
        email: this.state.registerEmail,
        password: this.state.registerPassword,
      }),
    })
    .then(response=>response.json())
    .then(data => {
      if(data) {
        this.props.loadUser(data);
        this.props.onRouteChange('homepage');
      }
    });


  }

  render() {
    return(
      <div id="sign">
          <h1>Register</h1>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" onChange={(event)=>this.onInputChange(event, 'registerName')}/>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={(event)=>this.onInputChange(event, 'registerEmail')}/>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={(event)=>this.onInputChange(event, 'registerPassword')}/>
          <button onClick={ this.onSubmitClick }>Register</button>
      </div>
    );
  }
}

export default Register;
