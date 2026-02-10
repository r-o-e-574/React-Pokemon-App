import React from 'react';
import { Link } from 'react-router-dom';
import { useLandingStyles } from '../../styles/landingStyles';

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
  return (
    <div className={classes.landingRoot}>
      <div className={classes.landingTiles} />
      <div className={classes.landingBackdrop} />
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
      </header>
      <div className={classes.landingCta}>
        <Link className={classes.landingStart} to='/main' onClick={() => {
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
        }}>Start</Link>
      </div>
    </div>
  );
}

export default Landing;
