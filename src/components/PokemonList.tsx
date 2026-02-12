import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useListStyles } from '../styles/listStyles';
import { usePanelStyles } from '../styles/panelStyles';
import PokePanel from './PokePanel';

interface PokemonListItem {
  name: string;
  displayName?: string;
  apiName?: string;
  sprite?: string;
  cry?: string;
}

interface PokemonListProps {
  pokemons?: PokemonListItem[];
}

function PokemonList({ pokemons = [] }: PokemonListProps) {
  const classes = useListStyles();
  const history = useHistory();
  const panelClasses = usePanelStyles();
  const [sparkleId, setSparkleId] = useState<string | null>(null);
  const [brokenSpriteIds, setBrokenSpriteIds] = useState<Record<string, true>>({});
  const sparkleTimeoutRef = useRef<number | null>(null);
  const navigateTimeoutRef = useRef<number | null>(null);
  const listBodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      if (listBodyRef.current) {
        listBodyRef.current.scrollTop = 0;
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      if (sparkleTimeoutRef.current) {
        window.clearTimeout(sparkleTimeoutRef.current);
      }
      if (navigateTimeoutRef.current) {
        window.clearTimeout(navigateTimeoutRef.current);
      }
    };
  }, []);
  useEffect(() => {
    setBrokenSpriteIds({});
  }, [pokemons]);

  const handlePlayCry = (cry?: string) => {
    if (!cry) return;
    const audio = new Audio(cry);
    audio.play().catch(() => {});
  };

  const handleSparkle = (id: string) => {
    setSparkleId(id);
    if (sparkleTimeoutRef.current) {
      window.clearTimeout(sparkleTimeoutRef.current);
    }
    sparkleTimeoutRef.current = window.setTimeout(() => {
      setSparkleId(null);
    }, 500);
  };

  const handleNavigate = (event: React.MouseEvent, routeName: string) => {
    event.preventDefault();
    handleSparkle(routeName);
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = audioContext.currentTime;
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = 'square';
      osc.frequency.value = freq;
      gain.gain.value = 0.08;
      osc.connect(gain).connect(audioContext.destination);
      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.12);
    });
    if (navigateTimeoutRef.current) {
      window.clearTimeout(navigateTimeoutRef.current);
    }
    navigateTimeoutRef.current = window.setTimeout(() => {
      history.push(`/main/${routeName}`);
    }, 360);
  };

  return (
    <div className={classes.pokeListContainer}>
      <PokePanel
        className={`${panelClasses.panel} ${classes.listContainer} ${classes.metallicEdge}`}
        headerClassName={panelClasses.header}
        titleClassName={panelClasses.title}
        bodyClassName={panelClasses.body}
        title={<h2 className={classes.listTitle}>Pokemon Library</h2>}
      >
        <div className={classes.listBody} ref={listBodyRef}>
          <ul className={classes.pokeListItems}>
            {pokemons.map(({ name: pokeName, displayName, apiName, sprite, cry }) => {
              const routeName = apiName ?? pokeName;
              const label = displayName ?? pokeName;
              const hasBrokenSprite = Boolean(brokenSpriteIds[routeName]);
              const showSprite = Boolean(sprite) && !hasBrokenSprite;
              return (
                <li key={routeName} className={classes.pokeListItem}>
                  {showSprite ? (
                    <button
                      className={classes.pokeSpriteButton}
                      type="button"
                      onClick={() => handlePlayCry(cry)}
                      aria-label={`Play ${label} cry`}
                    >
                      <img
                        className={classes.pokeListSprite}
                        src={sprite}
                        alt={`${label} sprite`}
                        onError={() =>
                          setBrokenSpriteIds((prev) => ({ ...prev, [routeName]: true }))
                        }
                      />
                    </button>
                  ) : (
                    <div
                      className={classes.pokeListSpriteFallback}
                      role="img"
                      aria-label="Sprite unavailable"
                    >
                      <span className={classes.pokeListSpriteFallbackIcon} aria-hidden="true">
                        ?
                      </span>
                      <span className={classes.pokeListSpriteFallbackText}>No sprite</span>
                    </div>
                  )}
                  <span className={classes.pokeListLinkWrap}>
                    <Link
                      className={classes.pokeListLink}
                      to={`/main/${routeName}`}
                      onClick={(event) => handleNavigate(event, routeName)}
                    >
                      {label}
                    </Link>
                    {sparkleId === routeName ? (
                      <span className={classes.pokeListSparkle} aria-hidden="true" />
                    ) : null}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </PokePanel>
    </div>
  );
}

export default PokemonList;
