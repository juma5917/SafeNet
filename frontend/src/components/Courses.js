import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaBookOpen, FaPlayCircle, FaCheckCircle } from 'react-icons/fa';
import { courseService } from '../services/index';

const CoursesContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #667eea;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  select {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: white;
    cursor: pointer;
  }
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const CourseCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CourseHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CourseBody = styled.div`
  padding: 1.5rem;
`;

const CourseTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: white;
`;

const CourseMeta = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const CourseDescription = styled.p`
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const ProgressBar = styled.div`
  background: #eee;
  height: 8px;
  border-radius: 4px;
  margin: 1rem 0;
  overflow: hidden;
  
  .progress {
    background: linear-gradient(90deg, #667eea, #764ba2);
    height: 100%;
    width: ${props => props.progress}%;
    transition: width 0.3s;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LevelBadge = styled.span`
  background: rgba(255, 255, 255, 0.3);
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.85rem;
  display: inline-block;
`;

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchCourses();
    fetchUserProgress();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await courseService.getCourses(filter ? { level: filter } : {});
      setCourses(response.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProgress = async () => {
    try {
      const response = await courseService.getUserProgress();
      const progressMap = {};
      response.data.forEach(prog => {
        progressMap[prog.course_id] = prog;
      });
      setUserProgress(progressMap);
    } catch (err) {
      console.error('Error fetching progress:', err);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await courseService.enrollCourse(courseId);
      fetchUserProgress();
      alert('Successfully enrolled in course!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to enroll');
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  if (loading) return <div>Loading courses...</div>;

  return (
    <CoursesContainer>
      <Title>
        <FaBookOpen /> Digital Literacy Courses
      </Title>

      <FilterSection>
        <select value={filter} onChange={handleFilterChange}>
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </FilterSection>

      <CourseGrid>
        {courses.map(course => {
          const progress = userProgress[course._id];
          const isEnrolled = !!progress;

          return (
            <CourseCard key={course._id}>
              <CourseHeader>
                <div>
                  <CourseTitle>{course.title}</CourseTitle>
                  <CourseMeta>
                    <span>{course.duration_hours} hours</span>
                    <LevelBadge>{course.level}</LevelBadge>
                  </CourseMeta>
                </div>
              </CourseHeader>

              <CourseBody>
                <CourseDescription>{course.description}</CourseDescription>

                {isEnrolled && progress ? (
                  <>
                    <ProgressBar progress={progress.overall_progress}>
                      <div className="progress" />
                    </ProgressBar>
                    <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                      {Math.round(progress.overall_progress)}% Complete
                    </p>
                    {progress.certificate_earned && (
                      <div style={{ textAlign: 'center', color: '#28a745', marginTop: '0.5rem' }}>
                        <FaCheckCircle /> Certificate Earned
                      </div>
                    )}
                  </>
                ) : null}

                <Button onClick={() => handleEnroll(course._id)} disabled={isEnrolled}>
                  <FaPlayCircle style={{ marginRight: '0.5rem' }} />
                  {isEnrolled ? 'Already Enrolled' : 'Enroll Now'}
                </Button>
              </CourseBody>
            </CourseCard>
          );
        })}
      </CourseGrid>
    </CoursesContainer>
  );
};

export default Courses;
