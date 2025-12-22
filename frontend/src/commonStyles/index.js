import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 80px auto;
  height: 100vh;
  width: 100%;
  .nav-link {
    margin-left: 30px;
    cursor: pointer;
    color: #000;
    text-decoration: none;
  }
  Link {
    text-decoration: none;
  }
  .nav-link .form {
    width: 100%;
    color: #000;
  }
  .loading-text {
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
  }
`;

export const Header = styled.div`
  border-bottom: #000 1px solid;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 600px;
  font-size: 20px;
  margin: auto;
  input {
    padding: 7px 20px;
    outline: none;
    border-radius: 40px;
    font-size: 18px;
    font-weight: 500;
    color: #000;
    margin: 10px 0;
  }
  .addproduct_btn {
    width: 250px;
    margin: 10px auto;
    border-radius: 40px;
    font-size: 18px;
    font-weight: 500;
    color: #000;
    border: 1px solid black;
    padding: 10px 20px;
    cursor: pointer;
  }
`;
