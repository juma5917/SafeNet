import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/avatar.json';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 96px;
  height: 96px;
`;

export default function LottieAvatar() {
  const lottieRef = useRef(null);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    function onStart() {
      setSpeaking(true);
      // play speaking segment if available
      try { lottieRef.current?.play(); } catch (e) {}
    }
    function onEnd() {
      setSpeaking(false);
      try { lottieRef.current?.goToAndStop(0, true); } catch (e) {}
    }
    window.addEventListener('avatar-speak-start', onStart);
    window.addEventListener('avatar-speak-end', onEnd);
    return () => {
      window.removeEventListener('avatar-speak-start', onStart);
      window.removeEventListener('avatar-speak-end', onEnd);
    };
  }, []);

  return (
    <Wrapper>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay={!speaking}
        style={{ width: '100%', height: '100%' }}
      />
    </Wrapper>
  );
}
