import { useState, useEffect } from "react";
import "./App.css";
const App = () => {
  const [users, setUsers] = useState([]);
  const [loginUser, setLoginUser] = useState("mojombo");
  const [loginUserDetails, setLoginUserDetails] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://api.github.com/users");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`API failed status: ${response.status}`);
        }
        setUsers(data);
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${loginUser}`
        );
        if (!response.ok) {
          throw new Error(`API failed status: ${response.status}`);
        }
        const { location, twitter_username } = await response.json();
        setLoginUserDetails({ location, twitter_username });
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, [loginUser]);

  function handleLoginUserClick(event) {
    setLoginUser(event.target.textContent);
  }
  return (
    <main className="container">
      <div className="user">
        <ol onClick={handleLoginUserClick}>
          {users.map((user) => (
            <li>{user.login}</li>
          ))}
        </ol>
      </div>
      <div className="user-data">
        <p>{`Location: ${loginUserDetails.location}`}</p>
        <p>{`Twitter: ${loginUserDetails.twitter_username}`}</p>
      </div>
    </main>
  );
};
export default App;
