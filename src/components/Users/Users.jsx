import "./styles.css";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { useNavigate, useLocation } from "react-router-dom";

import Edit from "./Edit";

const USER_URL = "/userslist";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [updateState, setUpdateState] = useState(-1);

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  async function refreshUserList() {
    const response = await axiosPrivate.get(USER_URL);
    setUsers(response.data);
  }

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

  const handleEdit = (id) => {
    setUpdateState(id);
  };

  const onDeleteUser = async (e, id) => {
    e.stopPropagation();
    await axiosPrivate.delete(`${USER_URL}/${id}`);
    refreshUserList();
  };

  return (
    <div>
      <h2>Список пользователей</h2>
      <div className="users__table">
        {users?.length ? (
          <table>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Роль</th>
                <th>Изменить</th>
                <th>Удалить</th>
              </tr>
            </thead>
            <tbody>
              {users.map((userObj, index) => {
                return updateState === userObj.user.id ? (
                  <Edit
                    key={index}
                    setUpdateState={setUpdateState}
                    refreshUserList={refreshUserList}
                    userObj={userObj}
                  />
                ) : (
                  <tr key={index}>
                    <td>{userObj.user.firstName}</td>
                    <td>{userObj.user.lastName}</td>
                    <td>
                      {userObj.roles.map((role, index) => (
                        <span key={index}>{role}</span>
                      ))}
                    </td>
                    <td>
                      <button
                        className="update__btn"
                        onClick={() => handleEdit(userObj.user.id)}
                      >
                        Изменить
                      </button>
                    </td>
                    <td>
                      <button
                        className="delete__btn"
                        onClick={(e) => onDeleteUser(e, userObj.user.id)}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>Пользователей нет</p>
        )}
      </div>
    </div>
  );
};

export default Users;
