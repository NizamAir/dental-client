import "./styles.css";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const USER_URL = "/userslist";

const Edit = ({ userObj, refreshUserList, setUpdateState }) => {
  const [selectValue, setSelectValue] = useState("");

  const axiosPrivate = useAxiosPrivate();

  const handleEdit = async (e, id, removedRole) => {
    e.stopPropagation();
    console.log(
      "JSON.stringify({ addedRole: selectValue, removedRole: removedRole })",
      JSON.stringify({ addedRole: selectValue, removedRole: removedRole })
    );
    if (window.confirm("Are you sure you want to change the role?")) {
      await axiosPrivate.put(
        `${USER_URL}/${id}`,
        JSON.stringify({ addedRole: selectValue, removedRole: removedRole })
      );
      console.log("selectValue", selectValue);
      console.log("removedRole", removedRole);
      setUpdateState(-1);
      refreshUserList();
    }
  };

  return (
    <tr>
      <td>{userObj.user.firstName}</td>
      <td>{userObj.user.lastName}</td>
      <td>
        <select
          onChange={(e) => setSelectValue(e.target.value)}
          className="select-css"
          defaultValue={userObj.roles[0]}
        >
          <option value="Doctor">Doctor</option>
          <option value="User">User</option>
          <option value="Assistant">Assistant</option>
          <option value="Admin">Admin</option>
        </select>
      </td>
      <td colSpan={2}>
        <button
          className="renew__btn"
          onClick={(e) => handleEdit(e, userObj.user.id, userObj.roles[0])}
        >
          Обновить
        </button>
      </td>
    </tr>
  );
};

export default Edit;
