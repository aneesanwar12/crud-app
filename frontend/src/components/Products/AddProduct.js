import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAtom } from "jotai";
import { Header, Wrapper } from "../../commonStyles";
import { selectedProductAtom } from "../../store/product";
import { Form } from "../../commonStyles";
import Links from "../Links";
import { apiRequest } from "../../utils/apiRequest";

export const AddProduct = () => {
  const history = useHistory();
  const [selectedProduct, setSelectedProduct] = useAtom(selectedProductAtom);
  let [state, setState] = useState({
    name: "",
    price: null,
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  onchange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const addUpdateProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, price, description } = state;
    try {
      const data = await apiRequest(
        selectedProduct?._id
          ? `/updateproduct/${selectedProduct?._id}`
          : `/addnewproduct`,
        {
          method: selectedProduct?._id ? "PUT" : "POST",
          body: {
            name,
            price,
            description,
          },
        }
      );
      setIsLoading(false);
      setSelectedProduct(null);
      window.alert(
        `Product ${selectedProduct?._id ? "updated" : "added"} successfully`
      );
      history.push("/viewproducts");
    } catch (err) {
      setIsLoading(false);
      window.alert(err.error || err.message);
    }
  };

  useEffect(() => {
    if (selectedProduct?._id) {
      setState({
        price: selectedProduct?.price,
        name: selectedProduct?.name,
        description: selectedProduct?.description,
      });
    }
    return () => {
      setSelectedProduct(null);
    };
  }, [selectedProduct]);

  return (
    <Wrapper>
      <Header>
        <Links />
      </Header>
      <div className="form">
        <Form method="post">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={onchange}
            value={state?.name}
            minLength={3}
            required
          />
          <label htmlFor="price">Price:</label>
          <input
            name="price"
            id="price"
            type="number"
            onChange={onchange}
            value={state?.price}
            pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*"
            required
          />
          <label htmlFor="email">Description:</label>
          <input
            name="description"
            id="description"
            onChange={onchange}
            value={state?.description}
            required
          />
          <button
            type="submit"
            onClick={addUpdateProduct}
            className="addproduct_btn"
            disabled={isLoading}
          >
            {isLoading
              ? "Processing..."
              : selectedProduct?._id
              ? "Update Product"
              : "Add Product"}
          </button>
        </Form>
      </div>
    </Wrapper>
  );
};
