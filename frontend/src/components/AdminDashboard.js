import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaChartBar, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { reportService } from '../services/index';

const DashboardContainer = styled.div`
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-left: 5px solid ${props => props.color || '#667eea'};
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${props => props.color || '#667eea'};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.p`
  color: #666;
  margin: 0;
  font-weight: 500;
`;

const ChartsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ChartCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ChartTitle = styled.h3`
  color: #333;
  margin-top: 0;
  margin-bottom: 1.5rem;
`;

const AdminDashboard = ({ isAdmin }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);

  const fetchStats = async () => {
    try {
      const response = await reportService.getReportStats();
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return <div>Access denied. Admin only.</div>;
  }

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (!stats) {
    return <div>No data available</div>;
  }

  return (
    <DashboardContainer>
      <Title>
        <FaChartBar /> Admin Dashboard
      </Title>

      <StatsGrid>
        <StatCard color="#667eea">
          <StatValue>{stats.total}</StatValue>
          <StatLabel>Total Reports</StatLabel>
        </StatCard>

        <StatCard color="#28a745">
          <StatValue>{stats.byStatus?.find(s => s._id === 'resolved')?.count || 0}</StatValue>
          <StatLabel>Resolved Cases</StatLabel>
        </StatCard>

        <StatCard color="#dc3545">
          <StatValue>{stats.bySeverity?.find(s => s._id === 'critical')?.count || 0}</StatValue>
          <StatLabel>Critical Cases</StatLabel>
        </StatCard>

        <StatCard color="#ffc107">
          <StatValue>{stats.byStatus?.find(s => s._id === 'under_review')?.count || 0}</StatValue>
          <StatLabel>Under Review</StatLabel>
        </StatCard>
      </StatsGrid>

      <ChartsSection>
        <ChartCard>
          <ChartTitle>Reports by Type</ChartTitle>
          {stats.byType && stats.byType.length > 0 ? (
            <div>
              {stats.byType.map(item => (
                <div key={item._id} style={{ marginBottom: '1rem' }}>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    {item._id.replace(/_/g, ' ').toUpperCase()}
                  </div>
                  <div style={{
                    background: '#eee',
                    height: '20px',
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      background: '#667eea',
                      height: '100%',
                      width: `${(item.count / stats.total) * 100}%`,
                      transition: 'width 0.3s'
                    }} />
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                    {item.count} reports
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No data</p>
          )}
        </ChartCard>

        <ChartCard>
          <ChartTitle>Reports by Severity</ChartTitle>
          {stats.bySeverity && stats.bySeverity.length > 0 ? (
            <div>
              {stats.bySeverity.map(item => (
                <div key={item._id} style={{ marginBottom: '1rem' }}>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    {item._id.toUpperCase()}
                  </div>
                  <div style={{
                    background: '#eee',
                    height: '20px',
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      background: item._id === 'critical' ? '#dc3545' : 
                                 item._id === 'high' ? '#ffc107' :
                                 item._id === 'medium' ? '#ffc107' : '#28a745',
                      height: '100%',
                      width: `${(item.count / stats.total) * 100}%`,
                      transition: 'width 0.3s'
                    }} />
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                    {item.count} reports
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No data</p>
          )}
        </ChartCard>

        <ChartCard>
          <ChartTitle>Reports by Status</ChartTitle>
          {stats.byStatus && stats.byStatus.length > 0 ? (
            <div>
              {stats.byStatus.map(item => (
                <div key={item._id} style={{ marginBottom: '1rem' }}>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    {item._id.replace(/_/g, ' ').toUpperCase()}
                  </div>
                  <div style={{
                    background: '#eee',
                    height: '20px',
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      background: item._id === 'resolved' ? '#28a745' : '#667eea',
                      height: '100%',
                      width: `${(item.count / stats.total) * 100}%`,
                      transition: 'width 0.3s'
                    }} />
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                    {item.count} reports
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No data</p>
          )}
        </ChartCard>
      </ChartsSection>
    </DashboardContainer>
  );
};

export default AdminDashboard;
