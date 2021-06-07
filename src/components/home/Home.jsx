import { Link } from "react-router-dom";
import "./Home.css";
export default function Home() {
  return (
    <div className="home-container">
      <div className="details-cont">
        <h1>Welcome to Let's Chat app.</h1>
        <p>
          Here you can create rooms about topics that you like to talk about
          with others in which interested people can hop in and share thier
          interest.
        </p>
        <p>
          You can also personally message if you don't want it to share in the
          room.
        </p>
        <h3>Features</h3>
        <ul>
          <li>Create rooms</li>
          <li>Direct Messages</li>
          <li>Show all the users in the current room</li>
          <li>Right side upper section can select any user to DM</li>
        </ul>
        <Link className="home-links" to="/signin">
          Sign In
        </Link>
        <Link className="home-links" to="/protected">
          Chats
        </Link>
      </div>
      <div className="illust-cont">
        <img
          src="https://raw.githubusercontent.com/yash9263/chat-app/master/src/components/home/undraw_online_chat.svg"
          alt="chat-illustartion"
        />
      </div>
    </div>
  );
}
