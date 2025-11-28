import React from 'react';
import styled from 'styled-components';
import { FaLightbulb, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const TipsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const TipCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-left: 5px solid ${props => {
    if (props.severity === 'critical') return '#dc3545';
    if (props.severity === 'important') return '#ffc107';
    return '#28a745';
  }};
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-3px);
  }
`;

const TipTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TipContent = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const Badge = styled.span`
  display: inline-block;
  background: ${props => {
    if (props.risk === 'high') return '#dc3545';
    if (props.risk === 'medium') return '#ffc107';
    return '#28a745';
  }};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const SecurityTipsWidget = ({ tips }) => {
  const getSeverityIcon = (severity) => {
    if (severity === 'critical') return <FaExclamationTriangle />;
    return <FaLightbulb />;
  };

  return (
    <TipsContainer>
      {tips.map((tip) => (
        <TipCard key={tip._id} severity={tip.severity}>
          <TipTitle>
            {getSeverityIcon(tip.severity)}
            {tip.title}
          </TipTitle>
          <TipContent>{tip.tip}</TipContent>
          <Badge risk={tip.risk_level}>
            {tip.risk_level.toUpperCase()}
          </Badge>
        </TipCard>
      ))}
    </TipsContainer>
  );
};

export default SecurityTipsWidget;
