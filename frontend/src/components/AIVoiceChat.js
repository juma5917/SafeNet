import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { aiService } from '../services';
import { useTranslation } from 'react-i18next';
import { FaMicrophone, FaStop, FaVolumeUp, FaCircle } from 'react-icons/fa';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ControlPanel = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const VoiceButton = styled.button`
  background: ${props => props.recording ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    font-size: 1.2rem;
    ${props => props.recording ? 'animation: pulse 1.5s infinite;' : ''}
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
`;

const TranscriptBox = styled.div`
  background: #f9f9f9;
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid #667eea;

  h4 {
    color: #667eea;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      font-size: 1.1rem;
    }
  }

  p {
    color: #333;
    line-height: 1.6;
    font-size: 1rem;

    &:empty::before {
      content: 'Listening...';
      color: #999;
      font-style: italic;
    }
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.recording ? '#ffe0e0' : '#e8f4f8'};
  border-radius: 20px;
  color: ${props => props.recording ? '#d32f2f' : '#1976d2'};
  font-size: 0.9rem;
  font-weight: 500;

  svg {
    font-size: 0.9rem;
    ${props => props.recording ? 'animation: pulse 1.5s infinite;' : ''}
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

export default function AIVoiceChat() {
  const { t } = useTranslation();
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert(t('ai.no_speech_api'));
    const r = new SpeechRecognition();
    r.lang = 'en-US';
    r.interimResults = true;
    r.onstart = () => setListening(true);
    r.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript(prev => prev + text + ' ');
        } else {
          interimTranscript += text;
        }
      }
      if (interimTranscript) {
        setTranscript(prev => prev.trim() + ' ' + interimTranscript);
      }
    };
    r.onend = () => {
      setListening(false);
      if (transcript.trim()) {
        sendVoice(transcript.trim());
      }
    };
    r.onerror = () => {
      setListening(false);
      alert('Error listening. Please try again.');
    };
    recognitionRef.current = r;
    r.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const sendVoice = async (text) => {
    setIsProcessing(true);
    try {
      const resp = await aiService.chat({ message: text, language: 'en', mode: 'voice' });
      const reply = resp.data?.text || resp.data || 'No response';
      // speak reply with browser TTS
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(reply);
        utter.lang = 'en-US';
        utter.rate = 0.9;
        utter.onstart = () => window.dispatchEvent(new Event('avatar-speak-start'));
        utter.onend = () => {
          window.dispatchEvent(new Event('avatar-speak-end'));
          setIsProcessing(false);
        };
        window.speechSynthesis.speak(utter);
      }
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  return (
    <Box>
      <ControlPanel>
        <VoiceButton 
          onClick={startListening} 
          disabled={listening || isProcessing}
          recording={listening}
        >
          <FaMicrophone />
          {t('ai.start_listen')}
        </VoiceButton>
        <VoiceButton 
          onClick={stopListening} 
          disabled={!listening}
          style={{ background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)' }}
        >
          <FaStop />
          {t('ai.stop_listen')}
        </VoiceButton>
        {listening && <StatusIndicator recording><FaCircle /> Recording...</StatusIndicator>}
        {isProcessing && <StatusIndicator><FaVolumeUp /> Processing...</StatusIndicator>}
      </ControlPanel>

      <TranscriptBox>
        <h4><FaMicrophone /> {t('ai.transcript')}</h4>
        <p>{transcript}</p>
      </TranscriptBox>
    </Box>
  );
}
