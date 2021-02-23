import './Logo.css';
import love from './heart-rate.png';
import Tilt from 'react-tilt';

const Logo = () => {
  return (
    <Tilt className="Tilt logo" options={{ max : 60 }} style={{ height: 150, width: 150 }} >
        <img className="Tilt-inner" src={love} />
    </Tilt>
  );
}

export default Logo;
