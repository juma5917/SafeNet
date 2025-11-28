import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaBook, FaFilter } from 'react-icons/fa';
import { resourceService } from '../services/index';

const ResourcesContainer = styled.div`
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 5px;

  select {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: white;
    cursor: pointer;
    font-size: 0.95rem;
  }
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
`;

const ResourceCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ThumbnailPlaceholder = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const ResourceTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
`;

const ResourceMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
  font-size: 0.85rem;
`;

const Badge = styled.span`
  background: ${props => props.color || '#667eea'};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.75rem;
`;

const ViewsCount = styled.p`
  color: #999;
  font-size: 0.9rem;
  margin: 0.5rem 0;
`;

const ReadMoreButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    difficulty_level: '',
    resource_type: ''
  });

  useEffect(() => {
    fetchResources();
  }, [filters]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await resourceService.getResources(
        Object.fromEntries(Object.entries(filters).filter(([_, v]) => v))
      );
      setResources(response.data);
    } catch (err) {
      console.error('Error fetching resources:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleViewResource = (resourceId) => {
    window.location.href = `/resource/${resourceId}`;
  };

  if (loading) return <div>Loading resources...</div>;

  return (
    <ResourcesContainer>
      <Title>
        <FaBook /> Learning Resources
      </Title>

      <FilterSection>
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="safety_tips">Safety Tips</option>
          <option value="privacy_guide">Privacy Guide</option>
          <option value="mental_health">Mental Health</option>
          <option value="legal_info">Legal Information</option>
          <option value="support_services">Support Services</option>
          <option value="parent_guide">Parent Guide</option>
          <option value="educator_guide">Educator Guide</option>
        </select>

        <select name="difficulty_level" value={filters.difficulty_level} onChange={handleFilterChange}>
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <select name="resource_type" value={filters.resource_type} onChange={handleFilterChange}>
          <option value="">All Types</option>
          <option value="article">Article</option>
          <option value="video">Video</option>
          <option value="infographic">Infographic</option>
          <option value="podcast">Podcast</option>
          <option value="tool">Tool</option>
        </select>
      </FilterSection>

      <ResourceGrid>
        {resources.map(resource => (
          <ResourceCard key={resource._id}>
            <ThumbnailPlaceholder>
              <FaBook />
            </ThumbnailPlaceholder>
            <CardContent>
              <ResourceTitle>{resource.title}</ResourceTitle>
              
              <ResourceMeta>
                <Badge color="#667eea">{resource.category}</Badge>
                <Badge color="#764ba2">{resource.resource_type}</Badge>
                <Badge color="#764ba2">{resource.difficulty_level}</Badge>
              </ResourceMeta>

              {resource.estimated_time && (
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  ⏱ {resource.estimated_time} min read
                </p>
              )}
              
              <ViewsCount>👁 {resource.views} views</ViewsCount>

              <ReadMoreButton onClick={() => handleViewResource(resource._id)}>
                Read More
              </ReadMoreButton>
            </CardContent>
          </ResourceCard>
        ))}
      </ResourceGrid>

      {resources.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
          <p>No resources found. Try adjusting your filters.</p>
        </div>
      )}
    </ResourcesContainer>
  );
};

export default Resources;
