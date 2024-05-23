import { Link } from "react-router-dom";

import Users from "./Users/Users";

export const Admin = () => {
  return (
    <section>
      <h1>Admin Page</h1>
      <br />
      <Users />
      <br />
      <p>You must have been assigned an Admin Role</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};
