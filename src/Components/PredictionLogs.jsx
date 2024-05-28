import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useFetchLogsQuery, useFetchAllLogsQuery, useDeletePredictionLogsMutation } from '../store/store.jsx';
import Button from '@mui/material/Button';
import ConfirmationModal from './ConfirmationModal'; 
import '../styles/Predict.css';

function PredictionLogs({ user_id }) {
  const [logs, setLogs] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const { data, isError, isFetching } = user_id ? useFetchLogsQuery(user_id) : useFetchAllLogsQuery();
  const [deletePredictionLogs, results] = useDeletePredictionLogsMutation();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const handleSelectionChange = (newSelectionModel) => {
    setSelectedIds(newSelectionModel);
    console.log('Selected IDs:', newSelectionModel);
  };

  const handleDeleteLogs = () => {
    setOpenConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    deletePredictionLogs(selectedIds);
    setOpenConfirmationModal(false);
  };

  const handleCancelDelete = () => {
    setOpenConfirmationModal(false);
  };

  useEffect(() => {
    if (data) {
      setLogs(data);
    }
  }, [data]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'request_at', headerName: 'Request At', width: 130 },
    { field: 'response_ms', headerName: 'Response(ms)', width: 130 },
    { field: 'view', headerName: 'View', width: 90 },
    { field: 'path', headerName: 'Path', width: 160 },
    { field: 'method', headerName: 'Method', width: 90 },
    { field: 'status_code', headerName: 'Status Code', width: 90 },
    { field: 'payload', headerName: 'Payload', width: 160 },
    { field: 'response', headerName: 'Response', width: 160 },
    { field: 'class_id', headerName: 'Class ID', width: 90 },
    { field: 'user_id', headerName: 'User ID', width: 90 },
  ];

  return (
    <div className="table-container">
      {isError && <div>Error fetching logs.</div>}
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Button className='delete-button' style={{ textAlign: 'right', color: 'red' }} onClick={handleDeleteLogs}>Delete Log</Button>
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={logs}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              onRowSelectionModelChange={(newSelectionModel) => handleSelectionChange(newSelectionModel)}
            />
          </div>
          <ConfirmationModal
            open={openConfirmationModal}
            handleClose={handleCancelDelete}
            handleConfirmDelete={handleConfirmDelete}
          />
        </div>
      )}
    </div>
  );
}

export default PredictionLogs;
