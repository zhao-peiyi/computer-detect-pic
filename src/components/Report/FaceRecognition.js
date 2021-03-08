import './FaceRecognition.css';

const FaceRecognition = ({link, box}) => {
  if (link) {
    return (
      <div className="area">
        <div className="container">
          <img id="faceImage" className="face" src={link} />
          <div className="boundingBox" style={{ top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right: box.rightCol}}></div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default FaceRecognition;
