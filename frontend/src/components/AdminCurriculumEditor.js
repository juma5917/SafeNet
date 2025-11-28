import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import curriculumService from '../services';
import i18n from '../i18n';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  background: white;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #667eea;
  margin-bottom: 1.5rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 5px rgba(102, 126, 234, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
  min-height: 100px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 5px rgba(102, 126, 234, 0.2);
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled(Button)`
  background: #999;

  &:hover {
    background: #777;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Warning = styled.div`
  background: #fff3cd;
  color: #856404;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
`;

const AdminCurriculumEditor = ({ user }) => {
  const { t } = useTranslation();
  const [curriculum, setCurriculum] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.role === 'admin' || user?.role === 'educator') {
      curriculumService.getCurriculum(i18n.language || 'en').then(res => {
        setCurriculum(res.data);
      });
    }
  }, [user]);

  function selectLesson(module, lesson) {
    setSelectedLesson({ module, lesson });
    setEditData({
      title: lesson.title,
      overview: lesson.overview || '',
      objectives: (lesson.objectives || []).join('\n'),
      activities: (lesson.activities || []).join('\n'),
      estimated_time: lesson.estimated_time || '',
      facilitator_tips: lesson.facilitator_tips || '',
      resources: (lesson.resources || []).map(r => `${r.label} | ${r.url}`).join('\n'),
      video_url: lesson.video_url || ''
    });
  }

  function updateField(field, value) {
    setEditData(prev => ({ ...prev, [field]: value }));
  }

  async function saveLessonChanges() {
    if (!selectedLesson) return;
    setSaving(true);
    
    // Parse multi-line fields back to arrays
    const updated = {
      ...selectedLesson.lesson,
      title: editData.title,
      overview: editData.overview,
      objectives: editData.objectives.split('\n').filter(o => o.trim()),
      activities: editData.activities.split('\n').filter(a => a.trim()),
      estimated_time: editData.estimated_time,
      facilitator_tips: editData.facilitator_tips,
      resources: editData.resources.split('\n').filter(r => r.trim()).map(r => {
        const [label, url] = r.split('|').map(x => x.trim());
        return { label, url };
      }),
      video_url: editData.video_url
    };

    // For now, just update local state and alert; real implementation would call a backend endpoint
    alert(`Lesson "${updated.title}" updated locally. Backend persistence coming soon.`);
    setSelectedLesson(null);
    setSaving(false);
  }

  if (!user || (user.role !== 'admin' && user.role !== 'educator')) {
    return (
      <Container>
        <Warning>Access denied. Only admins and educators can edit curriculum.</Warning>
      </Container>
    );
  }

  if (!curriculum) {
    return <Container><div>Loading curriculum…</div></Container>;
  }

  return (
    <Container>
      <Title>Curriculum Editor</Title>
      <Warning>This is a beta editor for curriculum admins. Changes are saved locally only; backend persistence is a future feature.</Warning>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
        <aside style={{ borderRight: '1px solid #ddd', paddingRight: '1rem' }}>
          <h3>Lessons</h3>
          {curriculum.modules.map(module => (
            <div key={module.id} style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#667eea' }}>{module.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {module.lessons.map(lesson => (
                  <li key={lesson.id} style={{ marginBottom: '0.5rem' }}>
                    <button
                      onClick={() => selectLesson(module, lesson)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.5rem',
                        background: selectedLesson?.lesson.id === lesson.id ? '#667eea' : '#f5f5f5',
                        color: selectedLesson?.lesson.id === lesson.id ? 'white' : '#333',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      {lesson.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <main>
          {selectedLesson ? (
            <>
              <h2>{selectedLesson.lesson.title}</h2>
              <Section>
                <Label>Lesson Title</Label>
                <Input
                  value={editData.title}
                  onChange={e => updateField('title', e.target.value)}
                  placeholder="Enter lesson title"
                />
              </Section>

              <Section>
                <Label>Overview / Description</Label>
                <TextArea
                  value={editData.overview}
                  onChange={e => updateField('overview', e.target.value)}
                  placeholder="Brief description of the lesson"
                />
              </Section>

              <Section>
                <Label>Learning Objectives (one per line)</Label>
                <TextArea
                  value={editData.objectives}
                  onChange={e => updateField('objectives', e.target.value)}
                  placeholder="By the end of this lesson, learners will be able to...&#10;- Objective 1&#10;- Objective 2"
                />
              </Section>

              <Section>
                <Label>Activities (one per line)</Label>
                <TextArea
                  value={editData.activities}
                  onChange={e => updateField('activities', e.target.value)}
                  placeholder="- Role-play scenario&#10;- Group discussion&#10;- Worksheet activity"
                />
              </Section>

              <Section>
                <Label>Estimated Time</Label>
                <Input
                  value={editData.estimated_time}
                  onChange={e => updateField('estimated_time', e.target.value)}
                  placeholder="e.g., 20 minutes"
                />
              </Section>

              <Section>
                <Label>Video URL</Label>
                <Input
                  value={editData.video_url}
                  onChange={e => updateField('video_url', e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  type="url"
                />
              </Section>

              <Section>
                <Label>Resources (format: label | url, one per line)</Label>
                <TextArea
                  value={editData.resources}
                  onChange={e => updateField('resources', e.target.value)}
                  placeholder="PDF guide | https://example.org/guide.pdf&#10;External article | https://example.org/article"
                />
              </Section>

              <Section>
                <Label>Facilitator Tips</Label>
                <TextArea
                  value={editData.facilitator_tips}
                  onChange={e => updateField('facilitator_tips', e.target.value)}
                  placeholder="Guidance for instructors facilitating this lesson"
                />
              </Section>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Button onClick={saveLessonChanges} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
                <SecondaryButton onClick={() => setSelectedLesson(null)}>Cancel</SecondaryButton>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', color: '#999' }}>Select a lesson to edit</div>
          )}
        </main>
      </div>
    </Container>
  );
};

export default AdminCurriculumEditor;
