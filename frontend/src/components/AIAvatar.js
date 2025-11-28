import React from 'react';
import LottieAvatar from './LottieAvatar';
import styled from 'styled-components';

const AvatarWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export default function AIAvatar() {
  return (
    <AvatarWrap>
      <LottieAvatar />
      <div>
        <div style={{ fontWeight: 700 }}>SafeNet AI</div>
        <div style={{ fontSize: 12, color: '#666' }}>Multilingual Mentor & Cyber Shield</div>
      </div>
    </AvatarWrap>
  );
}
