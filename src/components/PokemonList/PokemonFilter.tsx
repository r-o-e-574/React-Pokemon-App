import React, { useEffect, useRef, useState } from 'react';
import { useListStyles } from '../../styles/listStyles';
import { getTypeTheme } from '../../styles/typeTheme';

type FilterOption = { name: string };

type PokemonFilterProps = {
    typeOptions?: FilterOption[];
    regionOptions?: FilterOption[];
    selectedTypes?: string[];
    selectedRegions?: string[];
    searchTerm?: string;
    onTypeSelect: (value: string) => void;
    onRegionSelect: (value: string) => void;
    onRemoveType: (value: string) => void;
    onRemoveRegion: (value: string) => void;
    onClearSearch: () => void;
};

function PokemonFilter({
    typeOptions = [],
    regionOptions = [],
    selectedTypes = [],
    selectedRegions = [],
    searchTerm = '',
    onTypeSelect,
    onRegionSelect,
    onRemoveType,
    onRemoveRegion,
    onClearSearch
}: PokemonFilterProps) {
    const classes = useListStyles();
    const [typeOpen, setTypeOpen] = useState(false);
    const [regionOpen, setRegionOpen] = useState(false);
    const typeRef = useRef<HTMLDivElement | null>(null);
    const regionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const target = event.target as Node;
            if (typeRef.current && !typeRef.current.contains(target)) {
                setTypeOpen(false);
            }
            if (regionRef.current && !regionRef.current.contains(target)) {
                setRegionOpen(false);
            }
        };
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return (
        <div>
            <div className={`${classes.pokeCard} ${classes.filterCard} ${classes.metallicEdge}`}>
                <h2 className={classes.pokeCardTitle}>Filters</h2>
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
                    <div className={classes.filterGroup} ref={regionRef}>
                        <label className={classes.filterLabel}>Region</label>
                        <button
                            type='button'
                            className={classes.dropdownTrigger}
                            onClick={() => setRegionOpen((prev) => !prev)}
                        >
                            Select region
                        </button>
                        {regionOpen ? (
                            <div className={classes.dropdownMenu}>
                                {regionOptions.map(({ name }) => (
                                    <button
                                        key={name}
                                        type='button'
                                        className={classes.dropdownItem}
                                        onClick={() => {
                                            onRegionSelect(name);
                                            setRegionOpen(false);
                                        }}
                                    >
                                        <span className={classes.dropdownText}>{name}</span>
                                    </button>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className={classes.filterChips}>
                    {selectedRegions.map((region) => (
                        <button
                            key={`region-${region}`}
                            type='button'
                            className={classes.filterChip}
                            onClick={() => onRemoveRegion(region)}
                        >
                            {region}
                            <span className={classes.filterChipX}>×</span>
                        </button>
                    ))}
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
            </div>
        </div>
    );
};

export default PokemonFilter;
