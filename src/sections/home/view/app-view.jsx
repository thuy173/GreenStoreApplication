import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useInView } from 'react-intersection-observer';

import { Stack } from '@mui/material';

import Banner from '../banner';
import AboutHome from '../about';
import ProductList from '../product';
import CategoryHome from '../category';

const AnimatedSection = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function AppView() {
  return (
    <Stack sx={{ marginBottom: -10 }}>
      <AnimatedSection>
        <Banner />
      </AnimatedSection>
      <AnimatedSection>
        <CategoryHome />
      </AnimatedSection>
      <AnimatedSection>
        <ProductList />
      </AnimatedSection>
      <AnimatedSection>
        <AboutHome />
      </AnimatedSection>
    </Stack>
  );
}
