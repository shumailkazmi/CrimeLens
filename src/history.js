import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaSearch, FaTrash } from 'react-icons/fa';

const HistoryContainer = styled(motion.div)`
  padding: 2rem;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  width: 100%;
  max-width: 400px;

  input {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.text};
    margin-left: 0.5rem;
    width: 100%;
  }
`;

const SortSelect = styled.select`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const HistoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const HistoryCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow};
  position: relative;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;

  ${HistoryCard}:hover & {
    opacity: 1;
  }
`;

const HistoryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const HistoryContent = styled.div`
  padding: 1rem;
`;

const HistoryCaption = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const HistoryDate = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const ModalButton = styled.button`
  padding: 0.8rem 1.5rem;
  margin: 0 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-weight: 600;
  transition: ${({ theme }) => theme.transition};
  
  &.confirm {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    &:hover {
      background: ${({ theme }) => theme.colors.primaryHover};
    }
  }

  &.cancel {
    background: #555;
    color: white;
    &:hover {
      background: #777;
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

const History = () => {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('crimeLensHistory') || '[]');
    setHistory(storedHistory);
  }, []);

  const filteredAndSortedHistory = useMemo(() => {
    return history
      .filter(item => item.caption.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        } else {
          return new Date(a.uploadDate) - new Date(b.uploadDate);
        }
      });
  }, [history, searchTerm, sortBy]);

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
  };

  const confirmDelete = () => {
    const updatedHistory = history.filter(item => item.id !== itemToDelete);
    setHistory(updatedHistory);
    localStorage.setItem('crimeLensHistory', JSON.stringify(updatedHistory));
    setItemToDelete(null);
  };

  return (
    <HistoryContainer
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
    >
      <Header>
        <Title>Caption History</Title>
        <BackLink to="/home"><FaArrowLeft /> Back to Home</BackLink>
      </Header>

      <Controls>
        <SearchInput>
          <FaSearch color="#888" />
          <input 
            type="text"
            placeholder="Search captions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
        <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Sort by Newest</option>
          <option value="oldest">Sort by Oldest</option>
        </SortSelect>
      </Controls>

      {filteredAndSortedHistory.length > 0 ? (
        <HistoryGrid>
          {filteredAndSortedHistory.map((item) => (
            <HistoryCard key={item.id} whileHover={{ y: -5 }} layout>
              <HistoryImage src={item.imageUrl} alt="Generated caption" />
              <HistoryContent>
                <HistoryCaption>{item.caption}</HistoryCaption>
                <HistoryDate>{new Date(item.uploadDate).toLocaleDateString()}</HistoryDate>
              </HistoryContent>
              <DeleteButton onClick={() => handleDeleteClick(item.id)}>
                <FaTrash size={14} />
              </DeleteButton>
            </HistoryCard>
          ))}
        </HistoryGrid>
      ) : (
        <p>No history found matching your criteria.</p>
      )}

      <AnimatePresence>
        {itemToDelete && (
          <ModalBackdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
            >
              <h2>Confirm Deletion</h2>
              <p>Are you sure you want to delete this item?</p>
              <div style={{ marginTop: '1.5rem' }}>
                <ModalButton className="confirm" onClick={confirmDelete}>Confirm</ModalButton>
                <ModalButton className="cancel" onClick={() => setItemToDelete(null)}>Cancel</ModalButton>
              </div>
            </ModalContent>
          </ModalBackdrop>
        )}
      </AnimatePresence>

    </HistoryContainer>
  );
};

export default History;
