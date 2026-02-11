import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useListStyles } from '../styles/listStyles';

type PokemonListItem = { name: string; apiName?: string; sprite?: string; cry?: string };
type PokemonListProps = {
    pokemons?: PokemonListItem[];
};

function PokemonList({ pokemons = [] }: PokemonListProps) {
    const classes = useListStyles();
    const history = useHistory();
    const [sparkleId, setSparkleId] = useState<string | null>(null);
    const sparkleTimeoutRef = useRef<number | null>(null);
    const navigateTimeoutRef = useRef<number | null>(null);

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
            <div className={`${classes.listContainer} ${classes.metallicEdge}`}>
                <h2 className={classes.listTitle}>Pokemon Library</h2>
                <div className={classes.listBody}>
                <ul className={classes.pokeListItems}>
                    {pokemons.map(({ name: pokeName, apiName, sprite, cry }) => {
                        const routeName = apiName ?? pokeName;
                        return (
                        <li key={routeName} className={classes.pokeListItem}>
                            {sprite ? (
                                <button
                                    className={classes.pokeSpriteButton}
                                    type='button'
                                    onClick={() => handlePlayCry(cry)}
                                    aria-label={`Play ${routeName} cry`}
                                >
                                    <img className={classes.pokeListSprite} src={sprite} alt={`${pokeName} sprite`} />
                                </button>
                            ) : (
                                <div className={classes.pokeListSpritePlaceholder} aria-hidden='true' />
                            )}
                            <span className={classes.pokeListLinkWrap}>
                                <Link
                                    className={classes.pokeListLink}
                                    to={`/main/${routeName}`}
                                    onClick={(event) => handleNavigate(event, routeName)}
                                >
                                    {pokeName}
                                </Link>
                                {sparkleId === routeName ? (
                                    <span className={classes.pokeListSparkle} aria-hidden='true' />
                                ) : null}
                            </span>
                        </li>
                        );
                    })}
                </ul>
                </div>
            </div>
        </div>
    );
};

export default PokemonList;
