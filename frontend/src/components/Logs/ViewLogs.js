import { useEffect, useState } from "react";
import { Header, Wrapper } from "../../commonStyles";
import { apiRequest } from "../../utils/apiRequest";
import Links from "../Links";
import { ProductsWrapper } from "../Products/style";

export const ViewLogs = () => {
  let [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getLogs = async () => {
    try {
      setIsLoading(true);
      const data = await apiRequest("/getlogs");
      setLogs(data.logs);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      const data = await apiRequest("/clearlogs", { method: "DELETE" });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getLogs();
    // onDelete();
  }, []);
  return (
    <Wrapper>
      <Header>
        <Links />
      </Header>
      {logs && logs.length ? (
        <ProductsWrapper>
          <table>
            <thead>
              <tr>
                <th>Method</th>
                <th>End Point</th>
                <th>Status Code</th>
                <th>Logged By</th>
                <th>Logged At</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => {
                return (
                  <tr>
                    <th>{log.method}</th>
                    <th>{log.endpoint}</th>
                    <th>{log.statusCode}</th>
                    <th>{log.loggedBy}</th>
                    <th>{new Date(log.loggedAt).toLocaleString()}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ProductsWrapper>
      ) : (
        <div className="loading-text">
          {isLoading ? "Loading logs..." : "No logs found"}
        </div>
      )}
    </Wrapper>
  );
};
