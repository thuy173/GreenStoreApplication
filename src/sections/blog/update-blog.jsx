import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import {
  Stack,
  Button,
  Backdrop,
  TextField,
  IconButton,
  Typography,
  CircularProgress,
} from '@mui/material';

import BlogServices from 'src/services/BlogServices';

import CustomSnackbar from 'src/components/snackbar/snackbar';

// ----------------------------------------------------------------------

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ script: 'sub' }, { script: 'super' }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'font',
  'list',
  'bullet',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'script',
  'color',
  'background',
  'align',
  'link',
  'image',
  'video',
];

export default function UpdateBlog({ initialValues }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(initialValues.title || '');
  const [content, setContent] = useState(initialValues.content || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialValues.thumbnail || null);

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(imageFile);
      setImage(imageFile);
    } else {
      setImagePreview(null);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);

    if (image !== null) {
      formData.append('thumbnail', image);
    }

    try {
      setLoading(true);
      const response = await BlogServices.updateData(initialValues.blogId, formData);
      if (response && response.status === 200) {
        localStorage.setItem('updatePost', 'true');
        navigate('/blog');
      } else {
        setAlert({
          message: response?.response?.data?.message || 'An error occurred. Please check again!',
          severity: 'error',
          isOpen: true,
        });
      }
    } catch (error) {
      setAlert({
        message: error.message || 'An error occurred.',
        severity: 'error',
        isOpen: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack pt={1}>
      <Stack direction="column" justifyContent="center" alignItems="center" py={2}>
        <Typography variant="subtitle1" color="textSecondary" component="div">
          Author: {initialValues.author}
        </Typography>
        <Typography variant="caption" color="textSecondary" component="div">
          Create at: {initialValues.createdAt}
        </Typography>
        {initialValues.updatedAt && (
          <Typography variant="caption" color="textSecondary" component="div">
            Update at: {initialValues.updatedAt}
          </Typography>
        )}
      </Stack>

      <Stack
        direction="column"
        spacing={2}
        sx={{ margin: 'auto', display: 'block', position: 'relative', width: '60%', px: 15 }}
      >
        <img
          src={imagePreview ?? initialValues.thumbnail}
          alt=""
          style={{
            width: '60%',
            height: '60%',
            objectFit: 'contain',
            borderRadius: '5%',
          }}
        />
        <IconButton
          sx={{
            position: 'absolute',
            bottom: -10,
            left: 100,
            background: 'transparent',
            '& .MuiButton-startIcon': {
              color: 'black',
              fontSize: '5.5rem',
            },
          }}
          component="label"
        >
          <FlipCameraIosIcon />
          <input type="file" hidden onChange={handleFileChange} accept="image/*" />
        </IconButton>
      </Stack>
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        p={3}
      >
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          color="success"
          fullWidth
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          fullWidth
          multiline
          rows={4}
          color="success"
        />
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={content}
          onChange={setContent}
          style={{ minHeight: '400px', width: '100%' }}
        />
      </Stack>

      <Stack direction="column" justifyContent="center" alignItems="center" margin={3}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#d6e5d8',
            width: '150px',
            color: '#26643b',
            borderRadius: 1.4,
            '&:hover': {
              backgroundColor: '#26643b',
              color: '#d6e5d8',
            },
          }}
          onClick={handleUpdate}
        >
          Update
        </Button>
      </Stack>
      <Backdrop open={loading} style={{ color: '#fff', zIndex: 1400 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
    </Stack>
  );
}

UpdateBlog.propTypes = {
  initialValues: PropTypes.shape({
    blogId: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.string,
    thumbnail: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
};
