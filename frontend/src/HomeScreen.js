import axios from "axios";
import React, { useEffect, useState } from "react";

export default function HomeScreen() {
  const url = "http://localhost:8080/user/list";

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
