// DetailModal.jsx
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function DetailModal({ open, handleClose, log }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: 'black' }}>
          Log Details
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, color: 'black' }}>
          {log ? (
            <div>
              {Object.keys(log).map(key => (
                <p key={key}><strong>{key}:</strong> {log[key]}</p>
              ))}
            </div>
          ) : (
            'No log details available.'
          )}
        </Typography>
        <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default DetailModal;
