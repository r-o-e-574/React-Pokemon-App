import React, { useMemo, useState, useEffect, useRef } from 'react';
import PokemonList from './PokemonList';
import pokeball from '../../img/pokeball.png';
import PokemonFilter from './PokemonFilter';
import Page from '../Page';
import type { NamedApiResource, TypeResponse } from '../../types/pokeapi';
import { Link } from 'react-router-dom';
import { useListStyles } from '../../styles/listStyles';
import { getTypeTheme } from '../../styles/typeTheme';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux';
import { mergePokemonMedia, type PokemonMedia } from '../../redux/pokemonMediaSlice';
import {
    useGetPokemonListQuery,
    useGetTypeListQuery,
    useLazyGetByUrlQuery
} from '../../redux/pokeApi';

const SPECIES_URL_PREFIX = 'https://pokeapi.co/api/v2/pokemon-species/';
const POKEMON_URL_PREFIX = 'https://pokeapi.co/api/v2/pokemon/';

interface PokemonSummary {
    name: string;
    url: string;
    id: number;
}

const getIdFromUrl = (url: string, prefix: string) =>
    Number(url.replace(prefix, '').replace(/\/$/, ''));

const resolveSprite = (data: any) => {
    return (
        data?.sprites?.front_default ??
        data?.sprites?.other?.['official-artwork']?.front_default ??
        data?.sprites?.other?.home?.front_default ??
        data?.sprites?.front_shiny ??
        data?.sprites?.other?.['official-artwork']?.front_shiny ??
        (data?.id
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
            : '')
    );
};

const getGridLineColor = (hex: string) => {
    const value = hex.replace('#', '');
    if (value.length !== 6) {
        return 'rgba(255, 255, 255, 0.2)';
    }
    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance > 0.7
        ? 'rgba(0, 0, 0, 0.12)'
        : 'rgba(255, 255, 255, 0.2)';
};

function PokemonListData() {
    const classes = useListStyles();
    const [pokemons, setPokemons] = useState<PokemonSummary[]>([]);
    const [typeOptions, setTypeOptions] = useState<NamedApiResource[]>([]);
    const [typeFilteredIds, setTypeFilteredIds] = useState<Set<number> | null>(null);
    const [resolvedNameMap, setResolvedNameMap] = useState<Record<string, string>>({});
    const pokemonMedia = useSelector((state: RootState) => state.pokemonMedia);
    const dispatch = useDispatch<AppDispatch>();
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState(() => {
        const stored = localStorage.getItem('pokeFilters');
        if (!stored) {
            return '';
        }
        try {
            const parsed = JSON.parse(stored);
            return parsed.search ?? '';
        } catch {
            return '';
        }
    });
    const [selectedTypes, setSelectedTypes] = useState<string[]>(() => {
        const stored = localStorage.getItem('pokeFilters');
        if (!stored) {
            return [];
        }
        try {
            const parsed = JSON.parse(stored);
            return parsed.types ?? [];
        } catch {
            return [];
        }
    });
    const { data: typeList } = useGetTypeListQuery();
    const { data: pokemonList } = useGetPokemonListQuery();
    const [fetchByUrl] = useLazyGetByUrlQuery();
    const theme = getTypeTheme(selectedTypes.length === 1 ? selectedTypes[0] : undefined);
    const featuredTimerRef = useRef<number | null>(null);

    useEffect(() => {
        localStorage.setItem(
            'pokeFilters',
            JSON.stringify({
                search: searchTerm,
                types: selectedTypes
            })
        );
    }, [searchTerm, selectedTypes]);

    useEffect(() => {
        try {
            localStorage.setItem('pokemonMedia', JSON.stringify(pokemonMedia));
        } catch {
            // Ignore storage failures
        }
    }, [pokemonMedia]);

    const filteredPokemon = useMemo(() => {
        let baseList = pokemons;
        if (typeFilteredIds) {
            baseList = baseList.filter(({ id }) => typeFilteredIds.has(id));
        }
        const normalizedSearch = searchTerm.trim().toLowerCase();
        if (!normalizedSearch) {
            return baseList;
        }
        return baseList.filter(({ name }) => name.toLowerCase().includes(normalizedSearch));
    }, [pokemons, typeFilteredIds, searchTerm]);

    const featuredPokemon = filteredPokemon[featuredIndex % Math.max(filteredPokemon.length, 1)];

    useEffect(() => {
        if (!typeList?.results) {
            return;
        }
        const filtered = typeList.results
            .filter(({ name }) => name !== 'unknown' && name !== 'shadow' && name !== 'stellar')
            .sort((a, b) => a.name.localeCompare(b.name));
        setTypeOptions(filtered);
    }, [typeList]);

    useEffect(() => {
        if (!pokemonList?.results) {
            return;
        }
        const pokemonObjects = pokemonList.results
            .map(({ name, url }) => {
                const id = getIdFromUrl(url, POKEMON_URL_PREFIX);
                return { name, url, id };
            })
            .filter(({ name }) => !name.endsWith('-female') && !name.endsWith('-male'));
        setPokemons(pokemonObjects);
    }, [pokemonList]);

    useEffect(() => {
        if (!filteredPokemon.length) {
            return;
        }
        const missing = filteredPokemon.filter(({ name }) => !pokemonMedia[name]?.sprite);
        if (!missing.length) {
            return;
        }
        let cancelled = false;

        Promise.all(
            missing.map(async ({ name, url }) => {
                try {
                    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
                    let data: any = null;
                    try {
                        data = await fetchByUrl(pokemonUrl).unwrap();
                    } catch {
                        data = null;
                    }
                    let sprite = resolveSprite(data);
                    let cry = data?.cries?.latest ?? data?.cries?.legacy ?? '';
                    let resolvedName = name;

                    if (!sprite) {
                        try {
                            const speciesData = await fetchByUrl(
                                `${SPECIES_URL_PREFIX}${name}`
                            ).unwrap();
                            const defaultVariety = speciesData?.varieties?.find((item: any) => item.is_default);
                            const fallbackName = defaultVariety?.pokemon?.name;
                            if (fallbackName) {
                                const fallbackData = await fetchByUrl(
                                    `https://pokeapi.co/api/v2/pokemon/${fallbackName}`
                                ).unwrap();
                                sprite = resolveSprite(fallbackData);
                                cry = cry || fallbackData?.cries?.latest || fallbackData?.cries?.legacy || '';
                                resolvedName = fallbackName;
                            }
                        } catch {
                            // Ignore species fallback failures
                        }
                    }

                    if (!sprite) {
                        console.warn('[pokemon-media] missing sprite', name);
                    }
                    return { name, sprite, cry, resolvedName };
                } catch (error) {
                    console.warn('[pokemon-media] error', name, error);
                    return { name, sprite: '', cry: '', resolvedName: name };
                }
            })
        ).then((mediaList) => {
            if (cancelled) {
                return;
            }
            const nextMedia = mediaList.reduce<Record<string, PokemonMedia>>((acc, item) => {
                acc[item.name] = { sprite: item.sprite, cry: item.cry };
                return acc;
            }, {});
            dispatch(mergePokemonMedia(nextMedia));
            const nextResolved = mediaList.reduce<Record<string, string>>((acc, item) => {
                if (item.resolvedName && item.resolvedName !== item.name) {
                    acc[item.name] = item.resolvedName;
                }
                return acc;
            }, {});
            if (Object.keys(nextResolved).length) {
                setResolvedNameMap((prev) => ({ ...prev, ...nextResolved }));
            }
        });

        return () => {
            cancelled = true;
        };
    }, [filteredPokemon, pokemonMedia]);

    useEffect(() => {
        if (!filteredPokemon.length) {
            return;
        }
        const stillMissing = filteredPokemon
            .filter(({ name }) => !pokemonMedia[name]?.sprite)
            .map(({ name }) => name);
        if (stillMissing.length) {
            console.log('[pokemon-media] still missing sprites', stillMissing);
        }
    }, [filteredPokemon, pokemonMedia]);

    const restartFeaturedTimer = () => {
        if (featuredTimerRef.current) {
            window.clearInterval(featuredTimerRef.current);
        }
        if (!filteredPokemon.length) {
            return;
        }
        featuredTimerRef.current = window.setInterval(() => {
            setFeaturedIndex((prev) => (prev + 1) % filteredPokemon.length);
        }, 9000);
    };

    useEffect(() => {
        restartFeaturedTimer();
        return () => {
            if (featuredTimerRef.current) {
                window.clearInterval(featuredTimerRef.current);
            }
        };
    }, [filteredPokemon.length]);

    useEffect(() => {
        if (!selectedTypes.length) {
            setTypeFilteredIds(null);
            return;
        }
        let cancelled = false;
        const typeUrlMap = new Map(typeOptions.map((item) => [item.name, item.url]));
        Promise.all(
            selectedTypes.map(async (type) => {
                const typeUrl = typeUrlMap.get(type) ?? `https://pokeapi.co/api/v2/type/${type}`;
                const data = (await fetchByUrl(typeUrl).unwrap()) as TypeResponse;
                return data.pokemon.map(({ pokemon: { url } }) => getIdFromUrl(url, POKEMON_URL_PREFIX));
            })
        ).then((lists) => {
            if (cancelled) {
                return;
            }
            const union = new Set<number>();
            lists.forEach((ids) => {
                ids.forEach((id) => union.add(id));
            });
            setTypeFilteredIds(union);
        });
        return () => {
            cancelled = true;
        };
    }, [selectedTypes, typeOptions, fetchByUrl]);

    const handleAddType = (type: string) => {
        if (!type || selectedTypes.includes(type)) {
            return;
        }
        setSelectedTypes((prev) => [...prev, type]);
    };

    const handleRemoveType = (type: string) => {
        setSelectedTypes((prev) => prev.filter((item) => item !== type));
    };

    const handlePlayCry = (cry?: string) => {
        if (!cry) {
            return;
        }
        const audio = new Audio(cry);
        audio.play().catch(() => {});
        restartFeaturedTimer();
    };

    const gridLine = getGridLineColor(theme.bg1);
    const isLightColor = (hex: string) => {
        const normalized = hex.replace('#', '');
        if (normalized.length !== 6) return false;
        const r = parseInt(normalized.slice(0, 2), 16) / 255;
        const g = parseInt(normalized.slice(2, 4), 16) / 255;
        const b = parseInt(normalized.slice(4, 6), 16) / 255;
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luminance > 0.6;
    };
    const accentInk = isLightColor(theme.accent) ? '#1f2937' : '#f8fafc';

    return (
        <Page>
            <div
                className={classes.mainPageFill}
                style={{
                    ['--theme-bg-1' as any]: theme.bg1,
                    ['--theme-bg-2' as any]: theme.bg2,
                    ['--theme-bg-3' as any]: theme.bg3,
                    ['--theme-accent' as any]: theme.accent,
                    ['--theme-accent-ink' as any]: accentInk,
                    ['--theme-card-bg' as any]: theme.cardBg,
                    ['--theme-border' as any]: theme.border,
                    ['--grid-line' as any]: gridLine
                }}
            >
            <div className={classes.mainPageTiles} />
            <div className={classes.mainPage}>
                <section className={`${classes.mainColumn} ${classes.mainLayer}`}>
                    <div className={classes.mainHeaderBrand}>
                        <img className={classes.mainHeaderBall} src={pokeball} alt='pokeball' />
                        <h1 className={classes.mainHeaderTitle}>Poke Library</h1>
                    </div>
                    <div className={classes.listSection}>
                        <PokemonList
                            pokemons={filteredPokemon.map((pokemon) => {
                                const apiName = resolvedNameMap[pokemon.name] ?? pokemon.name;
                                return {
                                    ...pokemon,
                                    apiName,
                                    sprite: pokemonMedia[pokemon.name]?.sprite,
                                    cry: pokemonMedia[pokemon.name]?.cry
                                };
                            })}
                            onPokemonInteract={restartFeaturedTimer}
                        />
                    </div>
                </section>

                <section className={`${classes.rightColumn} ${classes.mainLayer}`}>
                    <div className={classes.mainSearch}>
                        <label className={classes.mainSearchLabel} htmlFor='pokemon-search'>Search Pokemon</label>
                        <input
                            id='pokemon-search'
                            className={classes.mainSearchInput}
                            placeholder='Type a name...'
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </div>
                    <PokemonFilter
                        typeOptions={typeOptions}
                        selectedTypes={selectedTypes}
                        searchTerm={searchTerm}
                        onTypeSelect={(value) => {
                            handleAddType(value);
                        }}
                        onRemoveType={handleRemoveType}
                        onClearSearch={() => setSearchTerm('')}
                    />
                    <div className={`${classes.pokeFeatured} ${classes.metallicEdge}`}>
                        <div className={classes.pokeFeaturedShimmer} />
                        <h2 className={`${classes.pokeCardTitle} ${classes.pokeFeaturedTitle}`}>Featured</h2>
                        {featuredPokemon ? (
                            <div className={classes.pokeFeaturedContent}>
                                <button
                                    className={classes.pokeFeaturedNav}
                                    type='button'
                                    onClick={() => {
                                        setFeaturedIndex((prev) =>
                                            (prev - 1 + filteredPokemon.length) % filteredPokemon.length
                                        );
                                        restartFeaturedTimer();
                                    }}
                                >
                                    Prev
                                </button>
                                <div className={classes.pokeFeaturedCenter}>
                                    {pokemonMedia[featuredPokemon.name]?.sprite ? (
                                        <button
                                            className={classes.pokeFeaturedSpriteButton}
                                            type='button'
                                            onClick={() => handlePlayCry(pokemonMedia[featuredPokemon.name]?.cry)}
                                            aria-label={`Play ${featuredPokemon.name} cry`}
                                        >
                                            <img
                                                className={classes.pokeFeaturedSprite}
                                                src={pokemonMedia[featuredPokemon.name]?.sprite}
                                                alt={`${featuredPokemon.name} sprite`}
                                            />
                                        </button>
                                    ) : null}
                                    <div className={classes.pokeFeaturedText}>
                                        <p className={classes.pokeFeaturedName}>{featuredPokemon.name}</p>
                                    </div>
                                </div>
                                <button
                                    className={classes.pokeFeaturedNav}
                                    type='button'
                                    onClick={() => {
                                        setFeaturedIndex((prev) => (prev + 1) % filteredPokemon.length);
                                        restartFeaturedTimer();
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                        ) : null}
                    </div>
                </section>
            </div>
            </div>
        </Page>
    );
};

export default PokemonListData;
