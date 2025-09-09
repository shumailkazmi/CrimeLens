import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import './mainpage.css';
import { 
    FaCloudUploadAlt, FaHistory, FaSignOutAlt, FaLightbulb, FaLanguage, FaShieldAlt,
    FaSignInAlt, FaUserPlus, FaTwitter, FaLinkedin, FaGithub, FaImage, FaMagic, FaHashtag, FaFileExport
} from 'react-icons/fa';
import aboutBgImage from './Assets/Images/worldtech.jpg';

const HomepageContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Logo = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-size: 0.9rem;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavLink = styled(NavButton).attrs({ as: 'a' })`
    text-decoration: none;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
`;

const UploadSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  text-align: center;
  margin-bottom: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const UploadArea = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 3rem;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryHover};
    background: #2a2a2a;
  }
`;

const UploadIcon = styled(FaCloudUploadAlt)`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin-top: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ActionButton = styled.button`
  padding: 0.8rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: ${({ theme }) => theme.transition};
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`;

const ResultsSection = styled.div`
  margin-top: 2rem;
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Caption = styled.p`
  background: ${({ theme }) => theme.colors.background};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`;

const FeaturesSection = styled.section`
  padding: 2rem 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const FeatureCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transition};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  font-size: 0.9rem;
  color: #aaa;
`;

const AboutSection = styled.section`
  padding: 5rem 2rem;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const AboutWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutImageContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-image: url(${aboutBgImage});
  background-size: cover;
  background-position: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
`;

const AboutContent = styled.div`
  text-align: left;

  h2 {
    text-align: left;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.05rem;
    line-height: 1.8;
    color: #ccc;
    margin-bottom: 2rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 50%;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.2rem;
    transition: ${({ theme }) => theme.transition};

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
      border-color: ${({ theme }) => theme.colors.primary};
      transform: scale(1.1);
    }
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.9rem;
  color: #888;
`;

const pageVariants = {
    initial: { opacity: 0, scale: 0.9 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 0.9 },
};
  
const pageTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
};

const Homepage = ({ isLoggedIn, onLogout }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const navigate = useNavigate();

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setIsUploaded(false);
      setCaption('');
    }
  };

  const generateCaption = () => {
    // Array of sample news captions for demonstration
    const sampleCaptions = [
      "Breaking: Authorities investigate suspicious activity captured in surveillance footage, prompting increased security measures across the region.",
      "Exclusive: New evidence emerges in ongoing investigation, shedding light on previously undisclosed details of the incident.",
      "Alert: Law enforcement officials respond to reported disturbance, urging public to remain vigilant and report any suspicious behavior.",
      "Update: Investigation continues as detectives analyze crucial evidence that could lead to significant breakthrough in the case.",
      "Report: Community members express concern over recent events, calling for enhanced safety protocols and neighborhood watch programs.",
      "Development: Forensic experts examine key evidence, revealing new insights that may change the course of the investigation.",
      "Breaking News: Multiple agencies coordinate response to ensure public safety while maintaining transparency in ongoing proceedings.",
      "Exclusive Coverage: Eyewitness accounts provide crucial timeline of events, helping investigators piece together the sequence of activities.",
      "Public Safety Alert: Authorities issue guidelines for community members to stay informed and report relevant information.",
      "Investigation Update: New technology and analytical methods employed to process evidence and advance the case forward."
    ];

    return sampleCaptions[Math.floor(Math.random() * sampleCaptions.length)];
  };

  const handleUpload = async () => {
    if (!isLoggedIn) {
        alert('Please log in to generate a caption.');
        navigate('/login');
        return;
    }
    if (!selectedImage) {
      alert('Please select an image first');
      return;
    }
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const generatedCaption = generateCaption();
      setCaption(generatedCaption);
      setIsUploaded(true);
      setIsLoading(false);

      const historyItem = {
        id: Date.now(),
        imageUrl: imagePreview,
        caption: generatedCaption,
        uploadDate: new Date().toISOString().split('T')[0],
      };

      const existingHistory = JSON.parse(localStorage.getItem('crimeLensHistory') || '[]');
      const updatedHistory = [historyItem, ...existingHistory];
      localStorage.setItem('crimeLensHistory', JSON.stringify(updatedHistory));

    }, 2000);
  };

  const handleNavigateToHistory = () => {
    if (isLoggedIn) {
        navigate('/history');
    } else {
        alert('Please log in to view your history.');
        navigate('/login');
    }
  };

  const handleNavigateToLogin = () => navigate('/login');
  const handleNavigateToSignup = () => navigate('/signup');

  return (
    <HomepageContainer
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
    >
      <Header>
        <Logo>CrimeLens</Logo>
        <Nav>
            {isLoggedIn ? (
                <>
                    <NavButton onClick={handleNavigateToHistory}>
                        <FaHistory /> History
                    </NavButton>
                    <NavButton onClick={onLogout}>
                        <FaSignOutAlt /> Logout
                    </NavButton>
                </>
            ) : (
                <>
                    <NavButton onClick={handleNavigateToLogin}>
                        <FaSignInAlt /> Login
                    </NavButton>
                    <NavButton onClick={handleNavigateToSignup}>
                        <FaUserPlus /> Sign Up
                    </NavButton>
                </>
            )}
        </Nav>
      </Header>
      
      <MainContent>
        <UploadSection>
          <UploadArea onClick={() => document.getElementById('image-input').click()}>
            <input
              type="file"
              id="image-input"
              hidden
              accept="image/*"
              onChange={handleImageSelect}
            />
            <UploadIcon />
            <p>Click to upload or drag and drop</p>
            <p style={{ fontSize: '0.8rem', color: '#888' }}>PNG, JPG, GIF, HEIC (Max 5MB)</p>
          </UploadArea>
          {imagePreview && <ImagePreview src={imagePreview} alt="Preview" />}
        </UploadSection>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <ActionButton onClick={handleUpload} disabled={!selectedImage || isLoading}>
                {isLoading ? 'Generating...' : 'Generate Caption'}
            </ActionButton>
        </div>

        {isUploaded && (
          <ResultsSection>
            <SectionTitle style={{ fontSize: '1.5rem', textAlign: 'left', marginBottom: '1rem' }}>Generated Caption</SectionTitle>
            <Caption>{caption}</Caption>
          </ResultsSection>
        )}

        <FeaturesSection>
          <SectionTitle>Features</SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon><FaLightbulb /></FeatureIcon>
              <FeatureTitle>Smart Suggestions</FeatureTitle>
              <FeatureDescription>Get context-aware caption ideas.</FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon><FaLanguage /></FeatureIcon>
              <FeatureTitle>Multi-language</FeatureTitle>
              <FeatureDescription>Generate captions in multiple languages.</FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon><FaShieldAlt /></FeatureIcon>
              <FeatureTitle>Privacy Focused</FeatureTitle>
              <FeatureDescription>Your images are never stored on our servers.</FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon><FaImage /></FeatureIcon>
              <FeatureTitle>Image Analysis</FeatureTitle>
              <FeatureDescription>Deep understanding of your image content.</FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon><FaMagic /></FeatureIcon>
              <FeatureTitle>Tone Adjustment</FeatureTitle>
              <FeatureDescription>Customize the mood of your captions.</FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon><FaHashtag /></FeatureIcon>
              <FeatureTitle>Hashtag Suggestions</FeatureTitle>
              <FeatureDescription>Get relevant hashtags to increase reach.</FeatureDescription>
            </FeatureCard>
             <FeatureCard>
              <FeatureIcon><FaFileExport /></FeatureIcon>
              <FeatureTitle>Export Options</FeatureTitle>
              <FeatureDescription>Easily save and share your captions.</FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesSection>
      </MainContent>

      <AboutSection>
        <AboutWrapper>
            <AboutImageContainer />
            <AboutContent>
                <SectionTitle>About CrimeLens</SectionTitle>
                <p>
                    CrimeLens is a specialized AI platform designed for law enforcement, investigative journalists, and security professionals. By analyzing images from crime scenes or surveillance footage, our technology generates concise, factual news-style captions and reports. Our mission is to accelerate the process of evidence documentation and reporting, enabling faster response times and more informed decision-making.
                </p>
                <SocialLinks>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
                </SocialLinks>
            </AboutContent>
        </AboutWrapper>
      </AboutSection>

      <Footer>
        &copy; {new Date().getFullYear()} CrimeLens. All Rights Reserved.
      </Footer>

    </HomepageContainer>
  );
};

export default Homepage;
