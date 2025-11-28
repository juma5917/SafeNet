import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaShieldAlt, FaBullseye, FaHeart, FaUsers, FaArrowRight } from 'react-icons/fa';

const HeroSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  margin-bottom: 3rem;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.95;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const PrimaryButton = styled(Button)`
  background: white;
  color: #667eea;
`;

const SecondaryButton = styled(Button)`
  border: 2px solid white;
  color: white;
`;

const FeaturesSection = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: #667eea;
  margin-bottom: 3rem;
  font-size: 2rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #667eea;
`;

const FeatureTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const StatsSection = styled.div`
  background: #f8f9fa;
  padding: 3rem 2rem;
  margin: 3rem 0;
`;

const StatsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatCard = styled.div`
  padding: 1.5rem;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.p`
  color: #666;
  font-weight: 500;
`;

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            <FaShieldAlt /> {t('home.title')}
          </HeroTitle>
          <HeroSubtitle>
            {t('home.subtitle')}
          </HeroSubtitle>
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
            {t('home.tagline')}
          </p>
          <HeroButtons>
            <PrimaryButton href="/courses">
              {t('home.start_learning')} <FaArrowRight />
            </PrimaryButton>
            <SecondaryButton href="/resources">
              {t('home.explore_resources')}
            </SecondaryButton>
          </HeroButtons>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>{t('home.mission_title')}</SectionTitle>
        <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem', fontSize: '1.1rem', color: '#666' }}>
          {t('home.mission_description')}
        </p>

        <SectionTitle style={{ marginTop: '3rem' }}>{t('home.key_features')}</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon><FaBullseye /></FeatureIcon>
            <FeatureTitle>{t('home.detect_report')}</FeatureTitle>
            <FeatureDescription>
              {t('home.detect_report_desc')}
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon><FaHeart /></FeatureIcon>
            <FeatureTitle>{t('home.support_care')}</FeatureTitle>
            <FeatureDescription>
              {t('home.support_care_desc')}
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon><FaUsers /></FeatureIcon>
            <FeatureTitle>{t('home.community_focus')}</FeatureTitle>
            <FeatureDescription>
              {t('home.community_focus_desc')}
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon><FaShieldAlt /></FeatureIcon>
            <FeatureTitle>{t('home.digital_rights')}</FeatureTitle>
            <FeatureDescription>
              {t('home.digital_rights_desc')}
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <StatsSection>
        <StatsGrid>
          <StatCard>
            <StatNumber>1000+</StatNumber>
            <StatLabel>{t('home.users_protected')}</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>50+</StatNumber>
            <StatLabel>{t('home.learning_courses')}</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>24/7</StatNumber>
            <StatLabel>{t('home.support_available')}</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>95%</StatNumber>
            <StatLabel>{t('home.user_satisfaction')}</StatLabel>
          </StatCard>
        </StatsGrid>
      </StatsSection>

      <FeaturesSection>
        <SectionTitle>{t('home.approach_title')}</SectionTitle>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>🛡️ {t('home.prevention_first')}</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              {t('home.prevention_desc')}
            </p>
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>🎓 {t('home.education_empowerment')}</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              {t('home.education_desc')}
            </p>
          </div>
          <div>
            <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>🤝 {t('home.community_support')}</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              {t('home.community_support_desc')}
            </p>
          </div>
        </div>
      </FeaturesSection>

      <div style={{ background: '#f8f9fa', padding: '3rem 2rem', marginTop: '3rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ color: '#667eea', marginBottom: '1rem' }}>{t('home.ready_to_stay_safe')}</h2>
          <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.1rem' }}>
            {t('home.ready_description')}
          </p>
          <PrimaryButton href="/register" style={{ fontSize: '1rem' }}>
            {t('home.get_started')} <FaArrowRight />
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default Home;
