import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { styled } from '@mui/system';
import { Box, Link, Avatar, Container, Typography } from '@mui/material';

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

const Date = styled(Typography)({
  color: '#888',
  textAlign: 'center',
  marginBottom: '20px',
});

const Content = styled(Typography)({
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
      <Title>{blog?.title}</Title>
      <Date>Updated: {blog?.updatedDate}</Date>
      <Content>{blog?.content}</Content>
      <AuthorSection>
        <Avatar src="https://via.placeholder.com/150" alt="Emily Breaux" />
        <AuthorInfo>
          <Typography>
            By: <Link href="#">{blog?.authorName}</Link>
          </Typography>
          <Typography variant="caption">Writer</Typography>
        </AuthorInfo>
        <Avatar src="https://via.placeholder.com/150" alt="Lindsey DeSoto" sx={{ marginLeft: '20px' }} />
        <AuthorInfo>
          <Typography>
            Fact Checked by: <Link href="#">{blog?.factCheckerName}</Link>
          </Typography>
        </AuthorInfo>
      </AuthorSection>
      <ImageSection>
        <img src="https://via.placeholder.com/800x400" alt="Elderly Woman with Caregiver" style={{ maxWidth: '100%', borderRadius: '8px' }} />
      </ImageSection>
    </StyledContainer>
  );
};

export default BlogDetail;
