import './ImageLinkForm.css';

const ImageLinkForm = (props) => {
  return (
    <div className="ImageLinkForm">
      <p>This Magic Brain will detect faces in your pictures. Give it a try.</p>
      <div className="form">
        <input type="text" onInput={props.onInputChange}/>
        <button onClick={props.onClickMouse}>Detect</button>
      </div>
    </div>
  );
}

export default ImageLinkForm;
