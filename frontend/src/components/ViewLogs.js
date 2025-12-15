import { useEffect, useState } from "react";
import Links from "./Links";
import "./style.css";

function ViewLogs() {
  let [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getLogs = () => {
    setIsLoading(true);
    fetch("http://localhost:8000/api/getlogs")
      .then((result) => result.json())
      .then((json) => {
        setLogs(json.logs);
        setIsLoading(false);
      });
  };

  const onDelete = () => {
    fetch(`http://localhost:8000/api/clearlogs`, {
      method: "DELETE",
    }).then(() => {
      window.alert("Logs cleared successfully");
    });
  };
  useEffect(() => {
    getLogs();
    // onDelete();
  }, []);
  return (
    <div className="main">
      <header className="header">
        <div className="user-pages">
          <Links />
        </div>
      </header>
      {logs && logs.length ? (
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Method</th>
                <th>End Point</th>
                <th>Status Code</th>
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
                    <th>{new Date(log.loggedAt).toLocaleString()}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="loading-text">
          {isLoading ? "Loading logs..." : "No logs found"}
        </div>
      )}
    </div>
  );
}

export default ViewLogs;
