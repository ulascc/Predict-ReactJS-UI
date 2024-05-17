import React, { useState, useEffect } from 'react';
import { useFetchLogsQuery, useFetchAllLogsQuery } from '../store/store.jsx';

function PredictionLogs({ user_id }) {
  const [logs, setLogs] = useState([]);
  const { data, isError, isFetching } = user_id ? useFetchLogsQuery(user_id) : useFetchAllLogsQuery();

  useEffect(() => {
    if (data) {
      setLogs(data);
    }
  }, [data]);

  return (
    <div className="table-container">
      {isError && <div>Error fetching logs.</div>}
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Request At</th>
              <th>Response(ms)</th>
              <th>View</th>
              <th>Path</th>
              <th>Method</th>
              <th>Status Code</th>
              <th>Payload</th>
              <th>Response</th>
              <th>Response ID</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.request_at}</td>
                <td>{log.response_ms}</td>
                <td>{log.view}</td>
                <td>{log.path}</td>
                <td>{log.method}</td>
                <td>{log.status_code}</td>
                <td>{log.payload}</td>
                <td>{log.response}</td>
                <td>{log.class_id}</td>
                <td>{log.user_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PredictionLogs;
