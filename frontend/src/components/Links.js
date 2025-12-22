import { Link } from "react-router-dom";

function Links() {
  return (
    <>
      <Link to="/addproduct">
        <div className="nav-link">Add Product</div>
      </Link>
      <Link to="/viewproducts">
        <div className="nav-link">View Products</div>
      </Link>
      <Link to="/viewlogs">
        <div className="nav-link">View Logs</div>
      </Link>
    </>
  );
}

export default Links;
