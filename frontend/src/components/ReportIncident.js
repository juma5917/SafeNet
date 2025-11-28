import React, { useState } from 'react';
import styled from 'styled-components';
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { reportService } from '../services/index';

const ReportContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #667eea;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 5px rgba(102, 126, 234, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  
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
  padding: 0.75rem 2rem;
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

const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const ReportIncident = () => {
  const [formData, setFormData] = useState({
    incident_type: '',
    severity: 'medium',
    description: '',
    evidence_url: '',
    platform: '',
    is_anonymous: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (!formData.incident_type || !formData.platform || !formData.description) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      await reportService.createReport(formData);
      setSuccess(true);
      setFormData({
        incident_type: '',
        severity: 'medium',
        description: '',
        evidence_url: '',
        platform: '',
        is_anonymous: false
      });
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReportContainer>
      <Title>
        <FaExclamationTriangle /> Report an Incident
      </Title>
      
      {success && (
        <SuccessMessage>
          <FaCheckCircle /> Report submitted successfully. Thank you for helping keep our community safe.
        </SuccessMessage>
      )}
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="incident_type">Type of Incident *</Label>
          <Select
            id="incident_type"
            name="incident_type"
            value={formData.incident_type}
            onChange={handleChange}
            required
          >
            <option value="">Select an incident type</option>
            <option value="cyberbullying">Cyberbullying</option>
            <option value="harassment">Harassment</option>
            <option value="hate_speech">Hate Speech</option>
            <option value="scam">Scam</option>
            <option value="phishing">Phishing</option>
            <option value="malware">Malware</option>
            <option value="impersonation">Impersonation</option>
            <option value="non_consensual_content">Non-consensual Content</option>
            <option value="other">Other</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="platform">Platform *</Label>
          <Select
            id="platform"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            required
          >
            <option value="">Select a platform</option>
            <option value="twitter">Twitter</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="other">Other</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="severity">Severity Level</Label>
          <Select
            id="severity"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description *</Label>
          <TextArea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide details about the incident..."
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="evidence_url">Evidence URL (optional)</Label>
          <Input
            type="url"
            id="evidence_url"
            name="evidence_url"
            value={formData.evidence_url}
            onChange={handleChange}
            placeholder="https://..."
          />
        </FormGroup>

        <FormGroup>
          <Label>
            <input
              type="checkbox"
              name="is_anonymous"
              checked={formData.is_anonymous}
              onChange={handleChange}
            />
            {' '}Report anonymously
          </Label>
        </FormGroup>

        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Report'}
        </Button>
      </form>
    </ReportContainer>
  );
};

export default ReportIncident;
