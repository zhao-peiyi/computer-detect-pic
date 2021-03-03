import './Navigation.css';

const Navigation = (props) => {
  if (props.isSignedIn) {
    return (
      <nav>
        <p onClick={() => props.onRouteChange('signout') }>Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav>
        <p onClick={() => props.onRouteChange('signin') }>Sign In</p>
        <p onClick={() => props.onRouteChange('register') }>Register</p>
      </nav>
    );
  }

}

export default Navigation;
