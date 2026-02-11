import React, { useEffect, useRef, useState } from 'react';
import { useListStyles } from '../styles/listStyles';
import { usePanelStyles } from '../styles/panelStyles';
import PokePanel from './PokePanel';
import { getTypeTheme } from '../styles/typeTheme';

type FilterOption = { name: string };

type PokemonFilterProps = {
    typeOptions?: FilterOption[];
    selectedTypes?: string[];
    searchTerm?: string;
    onTypeSelect: (value: string) => void;
    onRemoveType: (value: string) => void;
    onClearSearch: () => void;
};

function PokemonFilter({
    typeOptions = [],
    selectedTypes = [],
    searchTerm = '',
    onTypeSelect,
    onRemoveType,
    onClearSearch
}: PokemonFilterProps) {
    const classes = useListStyles();
    const [typeOpen, setTypeOpen] = useState(false);
    const panelClasses = usePanelStyles();
    const typeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const target = event.target as Node;
            if (typeRef.current && !typeRef.current.contains(target)) {
                setTypeOpen(false);
            }
        };
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return (
        <div>
            <PokePanel
                className={`${panelClasses.panel} ${classes.pokeCard} ${classes.filterCard} ${classes.metallicEdge}`}
                headerClassName={panelClasses.header}
                titleClassName={panelClasses.title}
                bodyClassName={panelClasses.body}
                title={<h2 className={classes.pokeCardTitle}>Filters</h2>}
            >
                <div className={classes.filterControls}>
                    <div className={classes.filterGroup} ref={typeRef}>
                        <label className={classes.filterLabel}>Type</label>
                        <button
                            type='button'
                            className={classes.dropdownTrigger}
                            onClick={() => setTypeOpen((prev) => !prev)}
                        >
                            Select type
                        </button>
                        {typeOpen ? (
                            <div className={classes.dropdownMenu}>
                                {typeOptions.map(({ name }) => {
                                    const palette = getTypeTheme(name);
                                    return (
                                        <button
                                            key={name}
                                            type='button'
                                            className={classes.dropdownItem}
                                            onClick={() => {
                                                onTypeSelect(name);
                                                setTypeOpen(false);
                                            }}
                                        >
                                            <span
                                                className={classes.dropdownDot}
                                                style={{ background: palette.accent }}
                                            />
                                            <span className={classes.dropdownText}>{name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className={classes.filterChips}>
                    {selectedTypes.map((type) => (
                        <button
                            key={`type-${type}`}
                            type='button'
                            className={classes.filterChip}
                            onClick={() => onRemoveType(type)}
                        >
                            {type}
                            <span className={classes.filterChipX}>×</span>
                        </button>
                    ))}
                    {searchTerm ? (
                        <button
                            type='button'
                            className={classes.filterChip}
                            onClick={onClearSearch}
                        >
                            search: {searchTerm}
                            <span className={classes.filterChipX}>×</span>
                        </button>
                    ) : null}
                </div>
            </PokePanel>
        </div>
    );
};

export default PokemonFilter;
