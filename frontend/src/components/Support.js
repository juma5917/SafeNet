import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaHandsHelping, FaPhone, FaEnvelope, FaGlobe } from 'react-icons/fa';
import { supportService } from '../services/index';

const SupportContainer = styled.div`
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
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: white;
    cursor: pointer;
  }
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

const ResourceCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-left: 5px solid ${props => props.color || '#667eea'};
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ResourceName = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
`;

const ResourceType = styled.span`
  background: #f0f0f0;
  color: #667eea;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const ContactInfo = styled.div`
  margin: 1rem 0;
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    color: #555;
    font-size: 0.95rem;
    
    a {
      color: #667eea;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Badge = styled.span`
  display: inline-block;
  background: ${props => {
    if (props.availability === '24/7') return '#28a745';
    if (props.availability === 'business_hours') return '#ffc107';
    return '#6c757d';
  }};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const Support = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    availability: ''
  });

  useEffect(() => {
    fetchResources();
  }, [filters]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await supportService.getSupportResources(
        Object.fromEntries(Object.entries(filters).filter(([_, v]) => v))
      );
      setResources(response.data);
    } catch (err) {
      console.error('Error fetching support resources:', err);
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

  const getTypeColor = (type) => {
    const colors = {
      helpline: '#667eea',
      counseling: '#764ba2',
      legal_aid: '#28a745',
      shelter: '#dc3545',
      online_support: '#0dcaf0'
    };
    return colors[type] || '#667eea';
  };

  if (loading) return <div>Loading support resources...</div>;

  return (
    <SupportContainer>
      <Title>
        <FaHandsHelping /> Support Services & Resources
      </Title>

      <FilterSection>
        <select name="type" value={filters.type} onChange={handleFilterChange}>
          <option value="">All Types</option>
          <option value="helpline">Helpline</option>
          <option value="counseling">Counseling</option>
          <option value="legal_aid">Legal Aid</option>
          <option value="shelter">Shelter</option>
          <option value="online_support">Online Support</option>
        </select>

        <select name="availability" value={filters.availability} onChange={handleFilterChange}>
          <option value="">All Hours</option>
          <option value="24/7">24/7 Available</option>
          <option value="business_hours">Business Hours</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </FilterSection>

      <ResourceGrid>
        {resources.map(resource => (
          <ResourceCard key={resource._id} color={getTypeColor(resource.type)}>
            <ResourceType>{resource.type.replace(/_/g, ' ').toUpperCase()}</ResourceType>
            <ResourceName>{resource.name}</ResourceName>
            <Description>{resource.description}</Description>
            
            <ContactInfo>
              {resource.contact_info?.phone && (
                <div className="contact-item">
                  <FaPhone /> 
                  <a href={`tel:${resource.contact_info.phone}`}>
                    {resource.contact_info.phone}
                  </a>
                </div>
              )}
              {resource.contact_info?.email && (
                <div className="contact-item">
                  <FaEnvelope /> 
                  <a href={`mailto:${resource.contact_info.email}`}>
                    {resource.contact_info.email}
                  </a>
                </div>
              )}
              {resource.contact_info?.website && (
                <div className="contact-item">
                  <FaGlobe /> 
                  <a href={resource.contact_info.website} target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </a>
                </div>
              )}
            </ContactInfo>

            {resource.languages && resource.languages.length > 0 && (
              <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '1rem' }}>
                Languages: {resource.languages.join(', ')}
              </p>
            )}

            <Badge availability={resource.availability}>
              {resource.availability.replace(/_/g, ' ').toUpperCase()}
            </Badge>
          </ResourceCard>
        ))}
      </ResourceGrid>

      {resources.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
          <p>No support resources found. Please try different filters.</p>
        </div>
      )}
    </SupportContainer>
  );
};

export default Support;
