import React, { useState } from 'react';
import AIChat from '../components/AIChat';
import AIVoiceChat from '../components/AIVoiceChat';
import AIAvatar from '../components/AIAvatar';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaRobot, FaMicrophone, FaBrain, FaShieldAlt, FaLightbulb, FaPhone } from 'react-icons/fa';

const PageWrapper = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Hero = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 3rem;
  animation: fadeInDown 0.6s ease-out;

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.95;
    max-width: 600px;
    margin: 0 auto 1.5rem;
    line-height: 1.6;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem;
  color: white;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-5px);
  }

  svg {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  h3 {
    font-size: 0.95rem;
    margin-bottom: 0.3rem;
  }

  p {
    font-size: 0.85rem;
    opacity: 0.9;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const AvatarSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 2rem;

  h3 {
    color: #667eea;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      font-size: 1.3rem;
    }
  }
`;

const ChatSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #f0f0f0;
`;

const Tab = styled.button`
  background: none;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: ${props => props.active ? '#667eea' : '#999'};
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  border-bottom: ${props => props.active ? '3px solid #667eea' : 'none'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    font-size: 1.2rem;
  }

  &:hover {
    color: #667eea;
  }
`;

const InfoBox = styled.div`
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border-left: 4px solid #667eea;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  color: #333;
  font-size: 0.95rem;
  line-height: 1.5;

  strong {
    color: #667eea;
  }
`;

export default function AI() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('text');

  return (
    <PageWrapper>
      <Container>
        <Hero>
          <h1>
            <FaRobot /> SafeNet AI
          </h1>
          <p>{t('ai.description')}</p>
          <FeatureGrid>
            <FeatureCard>
              <FaBrain />
              <h3>Smart Learning</h3>
              <p>Get personalized education & guidance</p>
            </FeatureCard>
            <FeatureCard>
              <FaShieldAlt />
              <h3>24/7 Support</h3>
              <p>Access help whenever you need it</p>
            </FeatureCard>
            <FeatureCard>
              <FaLightbulb />
              <h3>Quick Insights</h3>
              <p>Get instant answers to your questions</p>
            </FeatureCard>
            <FeatureCard>
              <FaPhone />
              <h3>Multilingual</h3>
              <p>Chat in English or Swahili</p>
            </FeatureCard>
          </FeatureGrid>
        </Hero>

        <MainContent>
          <AvatarSection>
            <h3><FaRobot /> Your AI Assistant</h3>
            <AIAvatar />
            <InfoBox>
              <strong>💡 Tip:</strong> {t('ai.training_help')}
            </InfoBox>
          </AvatarSection>

          <ChatSection>
            <TabContainer>
              <Tab active={activeTab === 'text'} onClick={() => setActiveTab('text')}>
                <FaRobot /> {t('ai.chat')}
              </Tab>
              <Tab active={activeTab === 'voice'} onClick={() => setActiveTab('voice')}>
                <FaMicrophone /> {t('ai.voice')}
              </Tab>
            </TabContainer>

            {activeTab === 'text' && (
              <div>
                <InfoBox>
                  <strong>Welcome!</strong> Ask questions about digital safety, GBV prevention, healthy relationships, and more. Type or use Support Mode for crisis situations.
                </InfoBox>
                <AIChat />
              </div>
            )}

            {activeTab === 'voice' && (
              <div>
                <InfoBox>
                  <strong>Voice Mode:</strong> {t('ai.voice_help')}
                </InfoBox>
                <AIVoiceChat />
              </div>
            )}
          </ChatSection>
        </MainContent>
      </Container>
    </PageWrapper>
  );
}
