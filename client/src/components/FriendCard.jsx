const FriendCard = ({ name }) => (
    <div className="text-center mb-3">
      <div className="bg-secondary rounded-circle mx-auto" style={{ width: '60px', height: '60px' }}></div>
      <p className="mt-2">{name}</p>
    </div>
  );
  
  export default FriendCard;
  