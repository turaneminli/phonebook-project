import axios from "axios";
import React, { useEffect, useState } from "react";
import os from "os";

export default function HomeScreen() {
  const url = process.env.REACT_APP_API_URL + "/user/list";
  console.log(url);

  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios
      .get(url)
      .then((response) => {
        const usersData = response.data.users;
        console.log(response.data);
        setUsers(usersData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => getUsers(), []);

  return (
    <div>
      <header className="container">Node's Hostname: {os.hostname()}</header>
      <div className="container table-overflow">
        <table>
          <tr>
            <th>Name</th>
            <th>Phone</th>
          </tr>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.name}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
