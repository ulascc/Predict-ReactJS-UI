import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function ConfirmationModal({ open, handleClose, handleConfirmDelete }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        width: 400,
        maxWidth: '90%',
      }}>
        <Typography variant="body1" sx={{ color: 'black' }}>Are you sure you want to delete the selected logs?</Typography>
        <Button onClick={handleConfirmDelete}>Yes</Button>
        <Button onClick={handleClose}>No</Button>
      </Box>
    </Modal>
  );
}

export default ConfirmationModal;
