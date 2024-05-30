import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useFetchLogsQuery, useFetchAllLogsQuery, useDeletePredictionLogsMutation } from '../store/store.jsx';
import Button from '@mui/material/Button';
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import ConfirmationModal from './ConfirmationModal';
import DetailModal from './DetailModal'; 

function PredictionLogs({ user_id }) {
  const [logs, setLogs] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deletePredictionLogs, results] = useDeletePredictionLogsMutation();
  const { data, isError, isFetching } = user_id ? useFetchLogsQuery(user_id) : useFetchAllLogsQuery();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [logToDelete, setLogToDelete] = useState(null);

  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [logDetail, setLogDetail] = useState(null); 

  useEffect(() => {
    if (data) {
      setLogs(data);
      console.log(data)
    }
  }, [data]);

  const handleDetailButtonClick = (event, id) => {
    event.stopPropagation();
    const log = logs.find((log) => log.id === id);
    setLogDetail(log);
    setOpenDetailModal(true);
    console.log(`Detail butonuna basıldı. ID: ${id}`);
  };

  const handleDeleteButtonClick = (event, id) => {
    event.stopPropagation();
    setLogToDelete(id);
    setOpenConfirmationModal(true);
    console.log(`Delete butonuna basıldı. ID: ${id}`);
  };

  const handleConfirmDelete = () => {
    if (logToDelete) {
      deletePredictionLogs([logToDelete]);
    }
    setOpenConfirmationModal(false);
  };

  const handleCancelDelete = () => {
    setOpenConfirmationModal(false);
    setLogToDelete(null);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
    setLogDetail(null);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'request_at', headerName: 'Request At', width: 130 },
    { field: 'status_code', headerName: 'Status Code', width: 90 },
    { field: 'payload', headerName: 'Payload', width: 160 },
    {
      field: 'details',
      headerName: 'Details',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={(event) => handleDetailButtonClick(event, params.row.id)}
        >
          <span style={{ marginRight: '8px' }}><TbListDetails /></span> Detail
        </Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={(event) => handleDeleteButtonClick(event, params.row.id)}
        >
          <span style={{ marginRight: '8px' }}><RiDeleteBin5Line /></span> Delete
        </Button>
      ),
    },
  ];

  const handleSelectionChange = (newSelectionModel) => {
    setSelectedIds(newSelectionModel);
    console.log('Selected IDs:', newSelectionModel);
  };

  return (
    <div className="table-container">
      {isError && <div>Error fetching logs.</div>}
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <div style={{ height: 400, width: '100%' }}>
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
          <ConfirmationModal
            open={openConfirmationModal}
            handleClose={handleCancelDelete}
            handleConfirmDelete={handleConfirmDelete}
          />
          <DetailModal
            open={openDetailModal}
            handleClose={handleCloseDetailModal}
            log={logDetail}
          />
        </div> 
      )}
    </div>
  );
}

export default PredictionLogs;
