import './Rank.css';

const Rank = (props) => {
  return (
    <div className="Rank">
      <div>{`${props.profile.name}, your current entry count is... `}</div>
      <div className="number">{`#${props.profile.sum}`}</div>
    </div>
  );
}

export default Rank;
