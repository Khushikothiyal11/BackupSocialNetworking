const GroupCard = ({ name, description }) => (
    <div className="card mb-2">
      <div className="card-body">
        <h6 className="card-title">{name}</h6>
        <p className="card-text">{description}</p>
        <button className="btn btn-sm btn-outline-primary">Join Group</button>
      </div>
    </div>
  );
  
  export default GroupCard;
  