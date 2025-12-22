import styled from "styled-components";

export const ProductsWrapper = styled.div`
  width: 100%;
  overflow-y: scroll;
  table {
    width: 90%;
    margin: 30px auto;
    text-align: left;
    overflow-x: scroll;
    min-width: 786px;
    th {
      font-size: 18px;
      font-weight: 600;
    }
    th,
    td {
      border: #000 1px solid;
      border-collapse: collapse;
      padding: 5px 10px;
      .icons {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      .delete-icon,
      .edit-icon {
        cursor: pointer;
      }
      .delete-icon svg {
        height: 28px;
        margin-right: 5px;
        width: 28px;
      }
      .edit-icon svg {
        height: 24px;
        width: 24px;
      }
    }
  }
`;
