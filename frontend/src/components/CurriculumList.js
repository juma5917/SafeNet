import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import QuizModal from './QuizModal';
import { FaPlayCircle, FaBook, FaClock, FaClipboardList, FaSearch } from 'react-icons/fa';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 28px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  background: linear-gradient(135deg, #fff 0%, #f9faff 100%);
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.08);
  border: 1px solid rgba(102, 126, 234, 0.1);
  height: fit-content;
  position: sticky;
  top: 20px;

  h4 {
    color: #667eea;
    margin: 0 0 12px;
    font-size: 1.1rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 16px;

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    font-size: 0.9rem;
  }
`;

const Search = styled.input`
  width: 100%;
  padding: 10px 12px 10px 36px;
  border-radius: 12px;
  border: 1.5px solid #e0e8ff;
  background: white;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ModuleButton = styled.button`
  width: 100%;
  text-align: left;
  background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  border: none;
  padding: 12px 14px;
  margin-bottom: 8px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: ${props => props.active ? 700 : 600};
  color: ${props => props.active ? 'white' : '#333'};
  transition: all 0.3s ease;
  border: ${props => props.active ? 'none' : '1px solid #e0e8ff'};
  box-shadow: ${props => props.active ? '0 4px 15px rgba(102, 126, 234, 0.3)' : 'none'};

  &:hover {
    transform: translateX(4px);
    background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f5f7ff'};
  }
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.15);
  margin-bottom: 12px;

  h3 {
    margin: 0 0 8px;
    font-size: 1.8rem;
  }

  p {
    margin: 0;
    opacity: 0.95;
    font-size: 1rem;
  }
`;

const LessonCard = styled.article`
  background: white;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 10px 40px rgba(20,20,40,0.05);
  border: 1px solid #f0f2ff;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 15px 50px rgba(102, 126, 234, 0.12);
    transform: translateY(-4px);
    border-color: #e0e8ff;
  }
`;

const LessonMeta = styled.div`
  min-width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: #667eea;
  font-weight: 700;
  background: #f5f7ff;
  padding: 12px 10px;
  border-radius: 12px;
  text-align: center;

  svg {
    font-size: 20px;
  }
`;

const LessonBody = styled.div`
  flex: 1;

  h4 {
    margin: 0 0 6px;
    color: #333;
    font-size: 1.1rem;
  }

  ul {
    margin: 6px 0;
    padding-left: 18px;
    font-size: 0.95rem;
    color: #555;
  }

  li {
    margin-bottom: 4px;
  }

  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LessonActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
`;

const ActionButton = styled.button`
  padding: 10px 14px;
  border-radius: 10px;
  border: ${props => props.primary ? 'none' : '1.5px solid #e0e8ff'};
  background: ${props => props.primary ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.primary ? 'white' : '#667eea'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.primary ? '0 4px 15px rgba(102, 126, 234, 0.3)' : '0 4px 10px rgba(102, 126, 234, 0.1)'};
  }
`;

const Small = styled.div`
  color: #777;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const Tag = styled.span`
  background: linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%);
  color: #667eea;
  padding: 8px 12px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const EmptyState = styled.div`
  padding: 30px 20px;
  background: linear-gradient(135deg, #f5f7ff 0%, #faf9ff 100%);
  border-radius: 12px;
  text-align: center;
  color: #999;
  font-style: italic;
`;

export default function CurriculumList({ curriculum }) {
  const { t } = useTranslation();
  const [moduleIndex, setModuleIndex] = useState(0);
  const [openLesson, setOpenLesson] = useState(null);
  const [quizLesson, setQuizLesson] = useState(null);
  const [query, setQuery] = useState('');

  const modules = curriculum.modules || [];
  const activeModule = modules[moduleIndex] || { lessons: [] };

  const filteredLessons = useMemo(() => {
    if (!query.trim()) return activeModule.lessons || [];
    const q = query.toLowerCase();
    return (activeModule.lessons || []).filter(l => (
      (l.title || '').toLowerCase().includes(q) ||
      (l.overview || '').toLowerCase().includes(q) ||
      (l.objectives || []).join(' ').toLowerCase().includes(q)
    ));
  }, [query, activeModule]);

  return (
    <Wrapper>
      <Sidebar>
        <h4>{t('curriculum.modules')}</h4>
        <SearchContainer>
          <FaSearch />
          <Search placeholder="Search lessons..." value={query} onChange={e => setQuery(e.target.value)} />
        </SearchContainer>
        {modules.map((m, idx) => (
          <ModuleButton key={m.id} onClick={() => { setModuleIndex(idx); setQuery(''); }} active={idx === moduleIndex}>{m.title}</ModuleButton>
        ))}
      </Sidebar>

      <Content>
        <Header>
          <h3>{activeModule.title}</h3>
          {activeModule.summary && <p>{activeModule.summary}</p>}
        </Header>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div></div>
          <Tag><FaBook /> {activeModule.lessons ? activeModule.lessons.length : 0} lessons</Tag>
        </div>

        {filteredLessons.length === 0 && (
          <EmptyState>No lessons match your search. Try different keywords!</EmptyState>
        )}

        {filteredLessons.map(lesson => (
          <LessonCard key={lesson.id}>
            <LessonMeta>
              <FaClipboardList />
              <Small>{lesson.estimated_time || 'N/A'}</Small>
            </LessonMeta>

            <LessonBody>
              <h4>{lesson.title}</h4>
              <Small style={{ marginBottom: 10 }}>{lesson.overview}</Small>

              {lesson.objectives && lesson.objectives.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  <strong style={{ color: '#667eea' }}>📌 {t('curriculum.objectives')}</strong>
                  <ul>
                    {lesson.objectives.map((o, i) => <li key={i}>{o}</li>)}
                  </ul>
                </div>
              )}

              {lesson.activities && lesson.activities.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  <strong style={{ color: '#667eea' }}>✅ {t('curriculum.activities')}</strong>
                  <ul>
                    {lesson.activities.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                </div>
              )}

              {lesson.video_url && (
                <div style={{ marginTop: 10 }}>
                  <a href={lesson.video_url} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <FaPlayCircle /> {t('curriculum.watch_video')}
                  </a>
                </div>
              )}

              {lesson.resources && lesson.resources.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  <strong style={{ color: '#667eea' }}>📚 {t('curriculum.resources')}</strong>
                  <ul>
                    {lesson.resources.map((r, i) => (
                      <li key={i}><a href={r.url} target="_blank" rel="noreferrer">{r.label || r.url}</a></li>
                    ))}
                  </ul>
                </div>
              )}
            </LessonBody>

            <LessonActions>
              {lesson.facilitator_tips && (
                <ActionButton onClick={() => setOpenLesson(lesson)}>💡 Tips</ActionButton>
              )}

              {lesson.quiz && lesson.quiz.length > 0 && (
                <ActionButton primary onClick={() => setQuizLesson(lesson)}>🎯 Quiz</ActionButton>
              )}
            </LessonActions>
          </LessonCard>
        ))}

        {openLesson && (
          <div style={{ position: 'fixed', left: 0, right: 0, top: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setOpenLesson(null)}>
            <div style={{ width: '90%', maxWidth: 640, background: 'white', padding: 24, borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
              <h3 style={{ color: '#667eea', marginBottom: 12 }}>💡 {t('curriculum.facilitator_tips')} — {openLesson.title}</h3>
              <p style={{ color: '#555', lineHeight: 1.6 }}>{openLesson.facilitator_tips}</p>
              <div style={{ textAlign: 'right', marginTop: 16 }}>
                <button onClick={() => setOpenLesson(null)} style={{ padding: '10px 20px', borderRadius: 10, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer' }}>{t('curriculum.close')}</button>
              </div>
            </div>
          </div>
        )}

        {quizLesson && (
          <QuizModal lesson={quizLesson} onClose={() => setQuizLesson(null)} />
        )}
      </Content>
    </Wrapper>
  );
}
