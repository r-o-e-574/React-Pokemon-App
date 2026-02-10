import React from 'react';
import { Link } from 'react-router-dom';
import { useListStyles } from '../../styles/listStyles';

type PokemonListItem = { name: string; sprite?: string; cry?: string };
type PokemonListProps = {
    pokemons?: PokemonListItem[];
    onPokemonInteract?: () => void;
};

function PokemonList({ pokemons = [], onPokemonInteract }: PokemonListProps) {
    const classes = useListStyles();
    const handlePlayCry = (cry?: string) => {
        if (!cry) return;
        const audio = new Audio(cry);
        audio.play().catch(() => {});
        onPokemonInteract?.();
    };

    return (
        <div className={classes.pokeListContainer}>
            <div className={`${classes.listContainer} ${classes.metallicEdge}`}>
                <h2 className={classes.listTitle}>Who are these Pokemon?</h2>
                <div className={classes.listBody}>
                <ul className={classes.pokeListItems}>
                    {pokemons.map(({ name: pokeName, sprite, cry }) => (
                        <li key={pokeName} className={classes.pokeListItem}>
                            {sprite ? (
                                <button
                                    className={classes.pokeSpriteButton}
                                    type='button'
                                    onClick={() => handlePlayCry(cry)}
                                    aria-label={`Play ${pokeName} cry`}
                                >
                                    <img className={classes.pokeListSprite} src={sprite} alt={`${pokeName} sprite`} />
                                </button>
                            ) : (
                                <div className={classes.pokeListSpritePlaceholder} aria-hidden='true' />
                            )}
                            <Link className={classes.pokeListLink} to={`/main/${pokeName}`}>{pokeName}</Link>
                        </li>
                    ))}
                </ul>
                </div>
            </div>
        </div>
    );
};

export default PokemonList;
