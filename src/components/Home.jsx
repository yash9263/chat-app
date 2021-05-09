import { Link } from "react-router-dom";
import "./Home.css";
export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Let's Chat app.</h1>
      <p>
        Here you can create rooms about topics that you like to talk about with
        others in which interested people can hop in and share thier interest.
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
      <h3>Bugs</h3>
      <p>
        After logging in if you are redirected to the signin page but your name
        is showing in the nav bar. Then you can click on the chats link it will
        direct you to the chats. This only happens if you refresh the page.
      </p>
      <h3>Responsive UI is not completed.</h3>
      <p>
        So If you will open it on a phone it will not look or work as expected
      </p>
    </div>
  );
}
