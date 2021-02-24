import './SignIn.css';

const SignIn= (props) => {
  return(
    <form id="sign">
        <h1>Sign In</h1>
        <label htmlFor="email">Email</label>
        <input type="email" id="email"/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password"/>
        <button onClick={ () => props.onRouteChange('homepage') }>Sign in</button>
        <p onClick={ () => props.onRouteChange('register') }>Register</p>
    </form>
  );
}

export default SignIn;
