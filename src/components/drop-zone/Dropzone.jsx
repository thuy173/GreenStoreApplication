import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDropzone } from 'react-dropzone';

import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Stack, IconButton } from '@mui/material';

import Iconify from '../iconify';

const Dropzone = ({ onDrop, imagePreview, setImagePreview, onDropzoneClose }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
          onDrop(file);
        };
        reader.readAsDataURL(file);
      }
    },
  });

  const handleClose = () => {
    setImagePreview(null);
    onDropzoneClose();
  };
  return (
    <Box
      {...getRootProps({ className: 'dropzone' })}
      sx={{
        border: '1px dashed gray',
        borderRadius: '8px',
        p: 2,
        textAlign: 'center',
        cursor: 'pointer',
        bgcolor: isDragActive ? 'rgba(0,0,0,0.1)' : 'transparent',
      }}
    >
      <input {...getInputProps()} />
      {imagePreview ? (
        <div style={{ position: 'relative' }}>
          <img
            src={imagePreview}
            alt="Hi"
            style={{ width: 200, borderRadius: 4, objectFit: 'fit' }}
          />
          <IconButton
            style={{
              borderRadius: '2%',
              backgroundColor: '#edeff1',
              color: '#808080',
              width: '28px',
              height: '28px',
            }}
            onClick={handleClose}
          >
            <RemoveIcon />
          </IconButton>
        </div>
      ) : (
        <Stack direction="column" spacing={2} justifyItems="center" alignItems="center">
          <Iconify icon="humbleicons:upload" width={22} />
          Drag and drop upload photos
        </Stack>
      )}
    </Box>
  );
};

Dropzone.propTypes = {
  onDrop: PropTypes.func,
  imagePreview: PropTypes.string,
  setImagePreview: PropTypes.func,
  onDropzoneClose: PropTypes.any,
};

export default Dropzone;
