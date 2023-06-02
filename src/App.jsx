import { useState, useEffect } from "react";
import "./App.css";
const App = () => {
  const [users, setUsers] = useState([]);
  const [loginUser, setLoginUser] = useState("");
  const [loginUserDetails, setLoginUserDetails] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users${loginUser}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(`User details API failed status: ${response.status}`);
        }

        if (!loginUser) {
          setUsers(data);
          setLoginUser(`/${data[0].login}`);
        } else {
          const { location, twitter_username } = data;
          setLoginUserDetails({ location, twitter_username });
        }
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, [loginUser]);

  function handleLoginUserClick(event) {
    setLoginUser(`/${event.target.textContent}`);
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
