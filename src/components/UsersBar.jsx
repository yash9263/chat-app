export default function UsersBar({ currentRoomDocs, docs }) {
  return (
    <div>
      <hr />
      <ul>
        {currentRoomDocs &&
          currentRoomDocs.users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
      </ul>
    </div>
  );
}
