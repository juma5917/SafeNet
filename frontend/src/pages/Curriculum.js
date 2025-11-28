import React, { useEffect, useState } from 'react';
import curriculumService from '../services';
import CurriculumList from '../components/CurriculumList';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import styled from 'styled-components';

const PageContainer = styled.div`
  background: linear-gradient(135deg, #f5f7ff 0%, #faf9ff 100%);
  min-height: 100vh;
  padding: 2rem 1rem;
`;

const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Hero = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 32px 28px;
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(102, 126, 234, 0.2);
  margin-bottom: 28px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    border-radius: 50%;
  }

  h1 {
    margin: 0 0 10px;
    font-size: 2.2rem;
    position: relative;
    z-index: 1;
  }

  p {
    margin: 0;
    opacity: 0.95;
    font-size: 1.05rem;
    position: relative;
    z-index: 1;
    line-height: 1.6;
  }
`;

export default function Curriculum() {
  const { t } = useTranslation();
  const [curriculum, setCurriculum] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await curriculumService.getCurriculum(i18n.language || 'en');
      setCurriculum(res.data);
    }
    load();

    // Reload curriculum when language changes
    const handleLanguageChange = () => {
      load();
    };
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return (
    <PageContainer>
      <Page>
        {curriculum ? (
          <>
            <Hero>
              <h1>🎓 {curriculum.title}</h1>
              {curriculum.description && <p>{curriculum.description}</p>}
            </Hero>

            <CurriculumList curriculum={curriculum} />
          </>
        ) : (
          <div style={{ textAlign: 'center', color: '#667eea', fontSize: '1.1rem' }}>{t('curriculum.loading')}</div>
        )}
      </Page>
    </PageContainer>
  );
}
