import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { useNavigate, useLocation } from "react-router-dom";

import Edit from "./Edit";

import style from "./style.module.scss";
import "./styles.css";
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
      <h2 className={style.title}>Список пользователей</h2>
      <div className={style.users__table}>
        {users?.length ? (
          <Table className={style.table}>
            <Thead>
              <Tr>
                <Th>Имя</Th>
                <Th>Фамилия</Th>
                <Th>Роль</Th>
                <Th>Изменить роль</Th>
                <Th>
                  Удалить <br /> пользователя
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((userObj, index) => {
                return updateState === userObj.user.id ? (
                  <Edit
                    key={index}
                    setUpdateState={setUpdateState}
                    refreshUserList={refreshUserList}
                    userObj={userObj}
                  />
                ) : (
                  <Tr key={index}>
                    <Td>{userObj.user.firstName}</Td>
                    <Td>{userObj.user.lastName}</Td>
                    <Td>
                      {userObj.roles.map((role, index) => (
                        <span key={index}>{role}</span>
                      ))}
                    </Td>
                    <Td>
                      <button
                        className={style.update__btn}
                        onClick={() => handleEdit(userObj.user.id)}
                      >
                        Изменить
                      </button>
                    </Td>
                    <Td>
                      <button
                        className={style.delete__btn}
                        onClick={(e) => onDeleteUser(e, userObj.user.id)}
                      >
                        Удалить
                      </button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        ) : (
          <p>Пользователей нет</p>
        )}
      </div>
    </div>
  );
};

export default Users;
