import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAtom } from "jotai";
import { DeleteIcon, EditIcon } from "../../assets";
import { Header, Wrapper } from "../../commonStyles";
import { selectedProductAtom } from "../../store/product";
import Links from "../Links";
import { ProductsWrapper } from "./style";
import { apiRequest } from "../../utils/apiRequest";

export const ViewProducts = () => {
  const history = useHistory();
  let [products, setProducts] = useState([]);
  const [, setSelectedProduct] = useAtom(selectedProductAtom);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const data = await apiRequest("/getproducts");
      setProducts(data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onEditClick = (product) => {
    setSelectedProduct(product);
    history.push("/addproduct");
  };

  const onDelete = async (id) => {
    try {
      setIsLoading(true);
      const data = await apiRequest(`/deleteproduct/${id}`, {
        method: "DELETE",
      });
      await getProducts();
      setIsLoading(false);
      window.alert("Product deleted successfully");
    } catch (err) {
      setIsLoading(false);
      window.alert(err.error || err.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Wrapper>
      <Header>
        <Links />
      </Header>
      {products && products.length ? (
        <ProductsWrapper>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr>
                    <th>{product.name}</th>
                    <th>{product.price}</th>
                    <th>{product.description}</th>
                    <th>
                      <div className="icons">
                        <div
                          className="delete-icon"
                          onClick={() => {
                            onDelete(product._id);
                          }}
                        >
                          <DeleteIcon />
                        </div>
                        <div
                          className="edit-icon"
                          onClick={() => onEditClick(product)}
                        >
                          <EditIcon />
                        </div>
                      </div>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ProductsWrapper>
      ) : (
        <div className="loading-text">
          {isLoading ? "Loading products..." : "No products found"}
        </div>
      )}
    </Wrapper>
  );
};
