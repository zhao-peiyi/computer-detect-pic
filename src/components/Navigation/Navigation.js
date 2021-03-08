import './Navigation.css';

const Navigation = (props) => {
  return (
    <nav>
      <p onClick={() => props.onRouteChange('homepage') }>Home</p>
      <p onClick={() => props.onRouteChange('about') }>About</p>
      {
        (props.isSignedIn)
        ? (
          <>
            <p onClick={() => props.onRouteChange('profile') }>Profile</p>
            <p onClick={() => props.onRouteChange('signout') }>Sign Out</p>
          </>
        )
        : (
          <>
            <p onClick={() => props.onRouteChange('signin') }>Sign In</p>
            <p onClick={() => props.onRouteChange('register') }>Register</p>
          </>
        )
      }
    </nav>
  );
}

export default Navigation;
