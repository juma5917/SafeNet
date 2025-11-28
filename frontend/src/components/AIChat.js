import React, { useState } from 'react';
import styled from 'styled-components';
import { aiService } from '../services';
import { useTranslation } from 'react-i18next';
import { FaPaperPlane, FaExclamationTriangle, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background: #f9f9f9;
  flex: 1;
`;

const Messages = styled.div`
  max-height: 450px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  background: white;
  flex: 1;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 3px;
  }
`;

const Message = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 12px;
  max-width: 85%;
  word-wrap: break-word;
  animation: slideIn 0.3s ease-out;
  font-size: 0.95rem;
  line-height: 1.5;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  background: ${props => props.isUser ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : props.crisis ? '#fff3cd' : '#e8f4f8'};
  color: ${props => props.isUser ? 'white' : props.crisis ? '#856404' : '#333'};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  border: ${props => props.crisis ? '1px solid #ffeaa7' : 'none'};
  display: flex;
  align-items: ${props => props.crisis ? 'flex-start' : 'center'};
  gap: ${props => props.crisis ? '0.5rem' : '0'};

  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const InputArea = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
  padding: 1rem;
  background: white;
  border-top: 1px solid #e0e0e0;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 0.75rem 1rem;
  border-radius: 24px;
  border: 1.5px solid #e0e0e0;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 24px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    font-size: 1rem;
  }
`;

const ModeToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: ${props => props.active ? '#667eea15' : 'transparent'};
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.active ? '#667eea' : '#666'};

  input {
    margin: 0;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  &:hover {
    background: #667eea15;
  }

  svg {
    font-size: 1.2rem;
    color: ${props => props.active ? '#667eea' : '#999'};
  }
`;

const ModeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
`;

export default function AIChat() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [supportMode, setSupportMode] = useState(false);
  const [trainingMode, setTrainingMode] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), text: input, isUser: true };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const resp = await aiService.chat({ message: userMsg.text, language: 'en', mode: 'text', supportMode, trainingMode });
      // If backend signalled crisis referral
      if (resp.data?.crisis) {
        const crisisMsg = { id: Date.now()+1, text: resp.data?.message || t('ai.support_crisis_message'), isUser: false, crisis: true };
        setMessages(m => [...m, crisisMsg]);
        // append resources as separate messages
        const resources = resp.data?.resources || [];
        resources.forEach((r, idx) => {
          setMessages(m => [...m, { id: Date.now()+2+idx, text: `${r.label}: ${r.value}`, isUser: false }]);
        });
      } else {
        const aiMsg = { id: Date.now()+1, text: resp.data?.text || resp.data || 'No response', isUser: false };
        setMessages(m => [...m, aiMsg]);
      }
    } catch (err) {
      const errMsg = { id: Date.now()+2, text: t('ai.error'), isUser: false };
      setMessages(m => [...m, errMsg]);
    }
    setLoading(false);
  };

  return (
    <ChatBox>
      <Messages>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: '#999', padding: '2rem 1rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👋</div>
            <p>Start a conversation! Ask me anything about digital safety, GBV prevention, or healthy relationships.</p>
          </div>
        )}
        {messages.map(m => (
          <Message key={m.id} isUser={m.isUser} crisis={m.crisis}>
            {m.crisis && <FaExclamationTriangle />}
            <span>{m.text}</span>
          </Message>
        ))}
      </Messages>

      <InputArea>
        <ModeContainer>
          <ModeToggle active={supportMode}>
            <input 
              type="checkbox" 
              checked={supportMode} 
              onChange={e => setSupportMode(e.target.checked)}
              title={t('ai.support_mode')}
            />
            {supportMode ? <FaToggleOn /> : <FaToggleOff />}
            <span style={{ fontSize: '0.85rem' }}>{t('ai.support_mode')}</span>
          </ModeToggle>
          <ModeToggle active={trainingMode}>
            <input 
              type="checkbox" 
              checked={trainingMode} 
              onChange={e => setTrainingMode(e.target.checked)}
              title={t('ai.training_mode')}
            />
            {trainingMode ? <FaToggleOn /> : <FaToggleOff />}
            <span style={{ fontSize: '0.85rem' }}>{t('ai.training_mode')}</span>
          </ModeToggle>
        </ModeContainer>
        
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t('ai.placeholder')}
          onKeyDown={e => { if (e.key === 'Enter' && !loading) send(); }}
          disabled={loading}
        />
        <SendButton onClick={send} disabled={loading}>
          <FaPaperPlane />
          {loading ? t('ai.sending') : t('ai.send')}
        </SendButton>
      </InputArea>
    </ChatBox>
  );
}
