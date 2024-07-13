/* eslint-disable import/no-extraneous-dependencies */
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate } from 'react-router-dom';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Grid,
  Stack,
  Button,
  Backdrop,
  TextField,
  Typography,
  FormControl,
  Breadcrumbs,
  OutlinedInput,
  CircularProgress,
} from '@mui/material';

import BlogServices from 'src/services/BlogServices';

import DropZone from 'src/components/drop-zone';
import CustomSnackbar from 'src/components/snackbar/snackbar';

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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CreateBlog = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    message: null,
    severity: 'success',
    isOpen: false,
  });

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const handleDropzoneClose = () => {
    setImage(null);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('thumbnail', image);
        formData.append('content', content);

        const response = await BlogServices.addData(formData);

        if (response.status === 200) {
          localStorage.setItem('addPost', 'true');
          navigate('/blog');
        } else {
          showAlert(
            'error',
            response?.response?.data?.message || 'An error occurred. Please check again!'
          );
        }
      } catch (error) {
        showAlert('error', error.message || 'An error occurred.');
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack>
        <Grid item xs={12} md={9} ml={4}>
          <Breadcrumbs
            ml={0.5}
            separator={<NavigateNextIcon fontSize="large" />}
            aria-label="breadcrumb"
          >
            <StyledLink to="/blog">
              <Stack direction="row" alignItems="center">
                <Typography sx={{ color: '#596269' }} variant="body1">
                  Blog
                </Typography>
              </Stack>
            </StyledLink>
            <Typography variant="body1" color="text.primary">
              Create post
            </Typography>
          </Breadcrumbs>
          <Typography variant="h3" color="#377c49">
            Create new post
          </Typography>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={9} ml={3}>
            <Stack direction="row">
              <FormControl sx={{ my: 2 }} variant="outlined" fullWidth>
                <OutlinedInput
                  id="title"
                  name="title"
                  aria-describedby="outlined-weight-helper-text"
                  size="small"
                  color="success"
                  placeholder="Please enter title"
                  inputProps={{ 'aria-label': 'weight' }}
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                />
                {formik.touched.title && formik.errors.title && (
                  <div style={{ color: 'red' }}>{formik.errors.title}</div>
                )}
              </FormControl>
            </Stack>

            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={content}
              onChange={setContent}
              style={{ minHeight: '400px' }}
            />
          </Grid>
          <Grid item xs={12} md={2.5} ml={1} sx={{ my: 2 }}>
            <Stack direction="row">
              <FormControl fullWidth>
                <DropZone
                  onDrop={setImage}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                  onDropzoneClose={handleDropzoneClose}
                />
              </FormControl>
            </Stack>
            <Stack my={2}>
              <TextField
                label="Description"
                id="outlined-basic"
                style={{ borderRadius: '2%' }}
                variant="outlined"
                name="description"
                multiline
                rows={4}
                fullWidth
                color="success"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
              />
              {formik.touched.description && formik.errors.description && (
                <div style={{ color: 'red' }}>{formik.errors.description}</div>
              )}
            </Stack>
            <Stack>
              <Button
                variant="outlined"
                sx={{
                  marginTop: 4,
                  bgcolor: '#507c5c',
                  borderColor: '#507c5c',
                  color: '#d6e5d8',
                  '&:hover': {
                    backgroundColor: '#26643b',
                    color: '#fff',
                    borderColor: '#507c5c',
                  },
                }}
                type="submit"
                disabled={formik.isSubmitting}
              >
                Post
              </Button>
            </Stack>
          </Grid>
        </Grid>
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
    </form>
  );
};

export default CreateBlog;
