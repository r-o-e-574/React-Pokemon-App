import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useLandingStyles } from '../styles/landingStyles';

const legendaryTiles = [
  { name: 'mewtwo', id: 150 },
  { name: 'mew', id: 151 },
  { name: 'articuno', id: 144 },
  { name: 'zapdos', id: 145 },
  { name: 'moltres', id: 146 },
  { name: 'lugia', id: 249 },
  { name: 'ho-oh', id: 250 },
  { name: 'raikou', id: 243 },
  { name: 'entei', id: 244 },
  { name: 'suicune', id: 245 },
  { name: 'celebi', id: 251 },
  { name: 'kyogre', id: 382 },
  { name: 'groudon', id: 383 },
  { name: 'rayquaza', id: 384 },
  { name: 'jirachi', id: 385 },
  { name: 'deoxys', id: 386 },
  { name: 'dialga', id: 483 },
  { name: 'palkia', id: 484 }
];

function Landing() {
  const classes = useLandingStyles();
  const history = useHistory();
  const [isPopping, setIsPopping] = useState(false);
  const popTimeoutRef = useRef<number | null>(null);
  const confettiPieces = Array.from({ length: 14 }, (_, index) => index);

  useEffect(() => {
    return () => {
      if (popTimeoutRef.current) {
        window.clearTimeout(popTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={classes.landingRoot}>
      <div className={classes.landingTiles} />
      <div className={classes.landingBackdrop} />
      <div className={classes.landingBackdropGlow} />
      <div className={classes.landingLegendaryCloud}>
        {legendaryTiles.map(({ name, id }, index) => {
          const tileClass = (classes as Record<string, string>)[`tile${index + 1}`];
          return (
          <div className={`${classes.landingLegendaryTile} ${tileClass ?? ''}`} key={name}>
            <img
              className={classes.landingLegendaryTileImg}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt={name}
            />
            <span className={classes.landingLegendaryTileText}>{name}</span>
          </div>
        )})}
      </div>
      <header className={classes.landingHeader}>
        <span className={classes.landingHeaderTitle}>Poke Library</span>
        <span className={classes.landingHeaderSub}>Legendary Archives</span>
        <p className={classes.landingHeaderTagline}>Discover, learn, and collect your favorites.</p>
      </header>
      <div className={classes.landingCta}>
        <div className={classes.landingConfetti}>
          {isPopping
            ? confettiPieces.map((piece) => {
                const angle = (Math.PI * 2 * piece) / confettiPieces.length;
                const radius = 120 + (piece % 4) * 20;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const colors = ['#ffd24f', '#6ee7ff', '#a78bfa', '#f97316', '#7dd3fc'];
                const color = colors[piece % colors.length];
                return (
                  <span
                    key={`confetti-${piece}`}
                    className={classes.confettiPiece}
                    style={{
                      ['--x' as any]: `${x}px`,
                      ['--y' as any]: `${y}px`,
                      ['--r' as any]: `${piece * 42}deg`,
                      ['--confetti-color' as any]: color
                    }}
                  />
                );
              })
            : null}
        </div>
        <Link
          className={`${classes.landingStart} ${isPopping ? classes.landingStartPop : ''}`}
          to='/main'
          onClick={(event) => {
            event.preventDefault();
            if (isPopping) {
              return;
            }
            setIsPopping(true);
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const now = audioContext.currentTime;
            const notes = [523.25, 659.25, 783.99];
            notes.forEach((freq, index) => {
              const osc = audioContext.createOscillator();
              const gain = audioContext.createGain();
              osc.type = 'square';
              osc.frequency.value = freq;
              gain.gain.value = 0.12;
              osc.connect(gain).connect(audioContext.destination);
              osc.start(now + index * 0.08);
              osc.stop(now + index * 0.08 + 0.12);
            });
            popTimeoutRef.current = window.setTimeout(() => {
              history.push('/main');
            }, 550);
          }}
        >
          Start
        </Link>
        <span className={classes.landingStartHint}>Press start to begin</span>
      </div>
    </div>
  );
}

export default Landing;
