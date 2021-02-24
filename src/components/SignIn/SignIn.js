import './SignIn.css';

const SignIn= () => {
  return(
    <form id="sign">
        <h1>Sign In</h1>
        <label for="email">Email</label>
        <input type="email" id="email"/>
        <label for="password">Password</label>
        <input type="password" id="password"/>
        <button>Sign in</button>
        <a href="www.baidu.com">Register</a>
    </form>
  );

}

export default SignIn;
