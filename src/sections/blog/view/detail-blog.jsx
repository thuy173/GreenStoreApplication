/* eslint-disable import/no-extraneous-dependencies */
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import React, { useState, useEffect } from 'react';

import { styled } from '@mui/system';
import { Box, Link, Avatar, Skeleton, Container, Typography } from '@mui/material';

import { fDateTime } from 'src/utils/format-time';

import BlogServices from 'src/services/BlogServices';

const StyledContainer = styled(Container)({
  marginTop: '20px',
  maxWidth: '800px',
});

const Title = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '2.5rem',
  textAlign: 'center',
  marginBottom: '20px',
});

const DateText = styled(Typography)({
  color: '#888',
  textAlign: 'center',
  marginBottom: '20px',
});

const Content = styled('div')({
  textAlign: 'left',
  marginBottom: '20px',
});

const AuthorSection = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '20px',
});

const AuthorInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginLeft: '10px',
});

const ImageSection = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
});

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

  const fetchBlogDetail = async () => {
    try {
      const response = await BlogServices.getDataById(id);
      if (response?.data && response?.status === 200) {
        setBlog(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error.message);
      setAlert({ message: 'Failed to fetch blog details', severity: 'error', isOpen: true });
    }
  };

  useEffect(() => {
    fetchBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <StyledContainer>
      {blog ? (
        <>
          <Title>{blog.title}</Title>
          {blog.updatedDate ? (
            <DateText>{fDateTime(blog.updatedDate)}</DateText>
          ) : (
            blog.createdAt && <DateText>{fDateTime(blog.createdAt)}</DateText>
          )}
          <Content>{ReactHtmlParser(blog.content)}</Content>
          <AuthorSection>
            <Avatar src="https://via.placeholder.com/150" alt="Emily Breaux" />
            <AuthorInfo>
              <Typography>
                By: <Link href="#">{blog.author}</Link>
              </Typography>
              <Typography variant="caption">Writer</Typography>
            </AuthorInfo>
          </AuthorSection>
          <ImageSection>
            <img
              src={blog.thumbnail}
              alt="Elderly Woman with Caregiver"
              style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
          </ImageSection>
        </>
      ) : (
        <>
          <Skeleton variant="text" width={300} height={40} style={{ margin: '0 auto' }} />
          <Skeleton variant="text" width={200} height={30} style={{ margin: '20px auto' }} />
          <Skeleton variant="rectangular" width="100%" height={400} />
          <AuthorSection>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ ml: 1 }}>
              <Skeleton variant="text" width={100} height={30} />
              <Skeleton variant="text" width={60} height={20} />
            </Box>
          </AuthorSection>
          <Skeleton variant="rectangular" width="100%" height={300} />
        </>
      )}
    </StyledContainer>
  );
};

export default BlogDetail;
