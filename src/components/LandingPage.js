import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LandingContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 0 2rem;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 2.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
`;

const StyledLink = styled(Link)`
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: ${({ theme }) => theme.transition};
  
  &.primary {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    &:hover {
      background: ${({ theme }) => theme.colors.primaryHover};
      transform: translateY(-3px);
      box-shadow: ${({ theme }) => theme.boxShadow};
    }
  }

  &.secondary {
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    &:hover {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
      transform: translateY(-3px);
      box-shadow: ${({ theme }) => theme.boxShadow};
    }
  }
`;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const LandingPage = () => {
  return (
    <LandingContainer
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Welcome to CrimeLens
      </Title>
      <Subtitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        AI-Powered Image Caption Generation. Transform your images into compelling stories.
      </Subtitle>
      <ButtonContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <StyledLink to="/login" className="primary">Login</StyledLink>
        <StyledLink to="/signup" className="secondary">Sign Up</StyledLink>
      </ButtonContainer>
    </LandingContainer>
  );
};

export default LandingPage;
