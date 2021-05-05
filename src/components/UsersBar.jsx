import useFirestore from "./hooks/useFirestore";

export default function UsersBar({ currentRoomDocs, docs, users }) {
  console.log(users);
  return (
    <div>
      <ul>{users && users.map((user) => <li>{user.name}</li>)}</ul>
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
