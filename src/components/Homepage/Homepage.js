import './Homepage.css';
import myImage from'./box1.PNG';

const Homepage = (props) => {
  return (
    <div className="Homepage" id="container">
      <div id="box1" className="column">
        <img src={myImage} id="image"/>
      </div>

      <div id="box2" className="column">
        <h1>What does<br/>a computer think about?</h1>
        <p>We always heard some technical words like AI, suanffa and so on, but what that kind of things are really are. If you image in the computer world, how the world looks like, then maybe you could have a try.</p>
        <div className="form">
          <input type="text" onInput={props.onInputChange} placeholder="Paste the image URL here. Have a try."/>
        </div>
        <button onClick={props.onClickMouse}>Detect</button>
        <p className="notation">Tips:<br/>1. The image format supports jpeg, png, ...<br/>2. Please do not patste the URL whose length is too long.<br/>3. The try</p>
      </div>
    </div>
  );
}

export default Homepage;
