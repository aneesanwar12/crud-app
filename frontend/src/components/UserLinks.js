import { Link } from "react-router-dom"

function UserLinks() {
    return (
        <>
            <Link to="/adduser">
                <div className="add_user">
                    Add User
                </div>
            </Link>
            <Link to="/viewusers">
                <div className="view_user">
                    View Users
                </div>
            </Link>
        </>
    )
}

export default UserLinks