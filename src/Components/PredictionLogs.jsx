import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PredictionLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/get_prediction_logs')
      .then(response => {
        setLogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching prediction logs:', error);
      });
  }, []);

  return (
    <div>
      <h2>Prediction Logs</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>View</th>
            <th>Payload</th>
            <th>Status Code</th>
            <th>Request At</th>
            <th>Response Time (ms)</th>
            <th>Path</th>
            <th>Method</th>
            <th>Response</th>
            <th>User ID</th>
            <th>Class ID</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.view}</td>
              <td>{log.payload}</td>
              <td>{log.status_code}</td>
              <td>{log.request_at}</td>
              <td>{log.response_ms}</td>
              <td>{log.path}</td>
              <td>{log.method}</td>
              <td>{log.response}</td>
              <td>{log.user_id}</td>
              <td>{log.class_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PredictionLogs;
