import './Rank.css';

const Rank = (props) => {
  // return (
  //   <div className="Rank">
  //     <div>{`${props.profile.name}, your current entry count is... `}</div>
  //     <div className="number">{`#${props.profile.sum}`}</div>
  //   </div>
  // );

  return (
    <div id="container">
      <div id="box1" className="column">
        <div id="image">
        </div>
      </div>
      <div id="box2" className="column">
        <h1>Hello world!!!</h1>
      </div>
    </div>
  );
}

export default Rank;
