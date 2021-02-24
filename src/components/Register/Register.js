

const Register= (props) => {
  return(
    <form id="sign">
        <h1>Register</h1>
        <label htmlFor="name">Name</label>
        <input type="text" id="name"/>
        <label htmlFor="email">Email</label>
        <input type="email" id="email"/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password"/>
        <button onClick={ () => props.onRouteChange('homepage') }>Register</button>
    </form>
  );
}

export default Register;
