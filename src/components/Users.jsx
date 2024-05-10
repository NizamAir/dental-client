import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import { useNavigate, useLocation } from "react-router-dom";

const USER_URL = "/authentication";

export const Users = () => {
  const [users, setUsers] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(USER_URL, {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.log(err.message);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getUsers();
    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  return (
    <article className="text-light">
      <h2>Users</h2>
      {users?.length ? (
        <ul>
          {users.map((userObj, index) => (
            <li key={index}>
              <h3>{userObj.user.username}</h3>
              <p>
                {userObj.user.firstName} {userObj.user.lastName}
              </p>
              <p>
                {userObj.roles.map((role, index) => (
                  <span key={index}>{role}</span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p> No users to display</p>
      )}
    </article>
  );
};

export default Users;
