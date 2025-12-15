import { Link } from "react-router-dom";

function Links() {
  return (
    <>
      <Link to="/adduser">
        <div className="add_user">Add User</div>
      </Link>
      <Link to="/viewusers">
        <div className="view_user">View Users</div>
      </Link>
      <Link to="/viewlogs">
        <div className="view_logs">View Logs</div>
      </Link>
    </>
  );
}

export default Links;
