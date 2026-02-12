import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './routes/Landing';
import PokemonListData from './routes/PokemonListData';
import PokemonViewData from './routes/PokemonViewData';
import backgroundTrack from './sounds/TalkingCuteChiptune.mp3.ogg';

const BGM_POSITION_KEY = 'bgmPosition';
const BGM_VOLUME = 0.04;
const BGM_DUCKED_VOLUME = 0.012;
const BGM_RATE = 1;

declare global {
  interface Window {
    __pokeBgmAudio?: HTMLAudioElement;
    __pokeBgmDuckCount?: number;
    __pokeBgmDuck?: () => void;
    __pokeBgmUnduck?: () => void;
    __pokeBgmUnduckAll?: () => void;
  }
}

const getBgmAudio = () => {
  if (!window.__pokeBgmAudio) {
    const audio = new Audio(backgroundTrack);
    audio.loop = true;
    audio.preload = 'auto';
    window.__pokeBgmAudio = audio;
  }
  return window.__pokeBgmAudio;
};

function App() {
  useEffect(() => {
    const bgmAudio = getBgmAudio();
    bgmAudio.playbackRate = BGM_RATE;
    if (!Number.isFinite(window.__pokeBgmDuckCount)) {
      window.__pokeBgmDuckCount = 0;
    }

    const applyBgmVolume = () => {
      const duckCount = window.__pokeBgmDuckCount ?? 0;
      bgmAudio.volume = duckCount > 0 ? BGM_DUCKED_VOLUME : BGM_VOLUME;
    };

    window.__pokeBgmDuck = () => {
      window.__pokeBgmDuckCount = (window.__pokeBgmDuckCount ?? 0) + 1;
      applyBgmVolume();
    };
    window.__pokeBgmUnduck = () => {
      window.__pokeBgmDuckCount = Math.max(0, (window.__pokeBgmDuckCount ?? 0) - 1);
      applyBgmVolume();
    };
    window.__pokeBgmUnduckAll = () => {
      window.__pokeBgmDuckCount = 0;
      applyBgmVolume();
    };
    applyBgmVolume();

    const savedPosition = Number(sessionStorage.getItem(BGM_POSITION_KEY) ?? '0');
    if (Number.isFinite(savedPosition) && savedPosition > 0) {
      if (bgmAudio.readyState >= 1) {
        bgmAudio.currentTime = savedPosition;
      } else {
        const onLoaded = () => {
          bgmAudio.currentTime = savedPosition;
          bgmAudio.removeEventListener('loadedmetadata', onLoaded);
        };
        bgmAudio.addEventListener('loadedmetadata', onLoaded);
      }
    }

    const tryPlay = () => {
      if (!bgmAudio.paused) return;
      // Try immediate autoplay first; if blocked, gesture listeners below will retry.
      bgmAudio.play().catch(() => {});
    };

    const persistPosition = () => {
      sessionStorage.setItem(BGM_POSITION_KEY, String(bgmAudio.currentTime || 0));
    };

    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        tryPlay();
      }
    };

    tryPlay();
    window.addEventListener('pointerdown', tryPlay, { once: true });
    window.addEventListener('keydown', tryPlay, { once: true });
    window.addEventListener('touchstart', tryPlay, { once: true });
    window.addEventListener('focus', tryPlay);
    window.addEventListener('pageshow', tryPlay);
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('beforeunload', persistPosition);
    window.addEventListener('pagehide', persistPosition);
    const positionTimer = window.setInterval(persistPosition, 5000);

    return () => {
      persistPosition();
      window.removeEventListener('pointerdown', tryPlay);
      window.removeEventListener('keydown', tryPlay);
      window.removeEventListener('touchstart', tryPlay);
      window.removeEventListener('focus', tryPlay);
      window.removeEventListener('pageshow', tryPlay);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('beforeunload', persistPosition);
      window.removeEventListener('pagehide', persistPosition);
      window.clearInterval(positionTimer);
    };
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/main">
          <PokemonListData />
        </Route>
        <Route path="/main/:name">
          <PokemonViewData />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
