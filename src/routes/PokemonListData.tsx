import React, { useMemo, useState, useEffect, useCallback } from 'react';
import PokemonList from '../components/PokemonList';
import pokeball from '../images/pokeball.png';
import bugIcon from '../../images/type-icons/bug.png';
import darkIcon from '../../images/type-icons/dark.png';
import dragonIcon from '../../images/type-icons/dragon.png';
import electricIcon from '../../images/type-icons/electric.png';
import fairyIcon from '../../images/type-icons/fairy.png';
import fightingIcon from '../../images/type-icons/fighting.png';
import fireIcon from '../../images/type-icons/fire.png';
import flyingIcon from '../../images/type-icons/flying.png';
import ghostIcon from '../../images/type-icons/ghost.png';
import grassIcon from '../../images/type-icons/grass.png';
import groundIcon from '../../images/type-icons/ground.png';
import iceIcon from '../../images/type-icons/ice.png';
import normalIcon from '../../images/type-icons/normal.png';
import poisonIcon from '../../images/type-icons/poison.png';
import psychicIcon from '../../images/type-icons/psychic.png';
import rockIcon from '../../images/type-icons/rock.png';
import steelIcon from '../../images/type-icons/steel.png';
import waterIcon from '../../images/type-icons/water.png';
import Page from '../Page';
import type { NamedApiResource, TypeResponse } from '../../types/pokeapi';
import { Link } from 'react-router-dom';
import { useListStyles } from '../styles/listStyles';
import { getTypeTheme } from '../styles/typeTheme';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux';
import { mergePokemonMedia, type PokemonMedia } from '../../redux/pokemonMediaSlice';
import {
    useGetPokemonListQuery,
    useGetTypeListQuery,
    useLazyGetByUrlQuery
} from '../../redux/pokeApi';
import { useVoices } from 'react-text-to-speech';
import SpeechOverlay from '../components/SpeechOverlay';
import professorImage from '../../images/VSScientist_SV.png';
import labImage from '../../images/lab.jpeg';

const SPECIES_URL_PREFIX = 'https://pokeapi.co/api/v2/pokemon-species/';
const POKEMON_URL_PREFIX = 'https://pokeapi.co/api/v2/pokemon/';
const TYPE_ICON_MAP: Record<string, string> = {
    normal: normalIcon,
    fire: fireIcon,
    water: waterIcon,
    electric: electricIcon,
    grass: grassIcon,
    ice: iceIcon,
    fighting: fightingIcon,
    poison: poisonIcon,
    ground: groundIcon,
    flying: flyingIcon,
    psychic: psychicIcon,
    bug: bugIcon,
    rock: rockIcon,
    ghost: ghostIcon,
    dragon: dragonIcon,
    dark: darkIcon,
    steel: steelIcon,
    fairy: fairyIcon
};

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

const hexToRgb = (hex: string) => {
    const cleaned = hex.replace('#', '');
    const value =
        cleaned.length === 3
            ? cleaned
                  .split('')
                  .map((char) => char + char)
                  .join('')
            : cleaned;
    if (value.length !== 6) {
        return null;
    }
    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);
    if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
        return null;
    }
    return { r, g, b };
};

const rgbToHex = (r: number, g: number, b: number) =>
    `#${[r, g, b]
        .map((value) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, '0'))
        .join('')}`;

const mixHex = (from: string, to: string, amount = 0.5) => {
    const a = hexToRgb(from);
    const b = hexToRgb(to);
    if (!a || !b) {
        return from || to || '#000000';
    }
    return rgbToHex(
        a.r + (b.r - a.r) * amount,
        a.g + (b.g - a.g) * amount,
        a.b + (b.b - a.b) * amount
    );
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
    const [featuredHistory, setFeaturedHistory] = useState<{ stack: number[]; index: number }>({
        stack: [],
        index: -1
    });
    const [panelOpen, setPanelOpen] = useState(false);
    const [quizOpen, setQuizOpen] = useState(false);
    const [quizTarget, setQuizTarget] = useState<PokemonSummary | null>(null);
    const [quizOptions, setQuizOptions] = useState<PokemonSummary[]>([]);
    const [quizSelected, setQuizSelected] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<'correct' | 'wrong' | null>(null);
    const [quizAttempts, setQuizAttempts] = useState(0);
    const [quizWrongOptions, setQuizWrongOptions] = useState<Set<string>>(new Set());
    const lastQuizLineRef = React.useRef<string | null>(null);
    const quizCloseTimeoutRef = React.useRef<number | null>(null);
    const [quizSpeechLabel, setQuizSpeechLabel] = useState<string | null>(null);
    const { voices } = useVoices();
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
    const baseTheme = useMemo(() => getTypeTheme(), []);
    const theme = useMemo(() => {
        if (!selectedTypes.length) {
            return baseTheme;
        }
        if (selectedTypes.length === 1) {
            return getTypeTheme(selectedTypes[0]);
        }
        if (selectedTypes.length >= 5) {
            return {
                ...baseTheme,
                bg1: '#ff6b6b',
                bg2: '#ffe66d',
                bg3: '#4d96ff',
                accent: '#7b5cff'
            };
        }
        const palettes = selectedTypes.map((type) => getTypeTheme(type));
        const accents = palettes.map((palette) => palette.accent).filter(Boolean);
        if (accents.length === 0) {
            return baseTheme;
        }
        if (accents.length === 1) {
            return getTypeTheme(selectedTypes[0]);
        }
        const soften = (color: string) => mixHex(color, baseTheme.bg1, 0.35);
        const startAccent = accents[0];
        const endAccent = accents[accents.length - 1];
        const midAccent = accents[Math.floor(accents.length / 2)];
        const bg1 = soften(startAccent);
        const bg3 = soften(endAccent);
        const bg2 = accents.length === 2 ? mixHex(bg1, bg3, 0.5) : soften(midAccent);
        const accent = mixHex(startAccent, endAccent, 0.5);
        const cardMix = mixHex(palettes[0].cardBg, palettes[palettes.length - 1].cardBg, 0.5);
        const borderMix = mixHex(palettes[0].border, palettes[palettes.length - 1].border, 0.5);
        return {
            ...baseTheme,
            bg1,
            bg2,
            bg3,
            accent,
            cardBg: mixHex(baseTheme.cardBg, cardMix, 0.6),
            border: mixHex(baseTheme.border, borderMix, 0.6)
        };
    }, [baseTheme, selectedTypes]);
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

    const featuredPool = pokemons;
    const featuredCount = Math.max(featuredPool.length, 1);
    const safeFeaturedIndex = featuredIndex % featuredCount;
    const featuredPokemon = featuredPool[safeFeaturedIndex];
    const prevFeaturedPokemon =
        featuredPool.length > 0
            ? featuredPool[(safeFeaturedIndex - 1 + featuredPool.length) % featuredPool.length]
            : undefined;
    const nextFeaturedPokemon =
        featuredPool.length > 0
            ? featuredPool[(safeFeaturedIndex + 1) % featuredPool.length]
            : undefined;
    const getRandomFeaturedIndex = useCallback(() => {
        if (featuredPool.length <= 1) {
            return safeFeaturedIndex;
        }
        let nextIndex = safeFeaturedIndex;
        while (nextIndex === safeFeaturedIndex) {
            nextIndex = Math.floor(Math.random() * featuredPool.length);
        }
        return nextIndex;
    }, [featuredPool.length, safeFeaturedIndex]);
    const pushFeaturedIndex = useCallback((nextIndex: number) => {
        setFeaturedIndex(nextIndex);
        setFeaturedHistory((prev) => {
            const truncated = prev.stack.slice(0, prev.index + 1);
            const updated = [...truncated, nextIndex].slice(-50);
            return { stack: updated, index: updated.length - 1 };
        });
    }, []);
    const canGoPrev = featuredHistory.index > 0;
    const canGoNext = featuredPool.length > 0;
    const handleFeaturedPrev = useCallback(() => {
        if (!canGoPrev) {
            return;
        }
        setFeaturedHistory((prev) => {
            if (prev.index <= 0) {
                return prev;
            }
            const nextIndex = prev.index - 1;
            setFeaturedIndex(prev.stack[nextIndex]);
            return { ...prev, index: nextIndex };
        });
    }, [canGoPrev]);
    const handleFeaturedNext = useCallback(() => {
        if (!featuredPool.length) {
            return;
        }
        setFeaturedHistory((prev) => {
            if (prev.index >= 0 && prev.index < prev.stack.length - 1) {
                const nextIndex = prev.index + 1;
                setFeaturedIndex(prev.stack[nextIndex]);
                return { ...prev, index: nextIndex };
            }
            const nextIndex = getRandomFeaturedIndex();
            setFeaturedIndex(nextIndex);
            const truncated = prev.stack.slice(0, prev.index + 1);
            const updated = [...truncated, nextIndex].slice(-50);
            return { stack: updated, index: updated.length - 1 };
        });
    }, [featuredPool.length, getRandomFeaturedIndex]);

    const getPokemonSprite = useCallback((pokemon: PokemonSummary | null | undefined) => {
        if (!pokemon) return '';
        return (
            pokemonMedia[pokemon.name]?.sprite ??
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
        );
    }, [pokemonMedia]);

    const buildQuiz = useCallback(() => {
        if (!pokemons.length) return;
        const target = pokemons[Math.floor(Math.random() * pokemons.length)];
        const options = new Set<PokemonSummary>();
        options.add(target);
        while (options.size < 3 && options.size < pokemons.length) {
            options.add(pokemons[Math.floor(Math.random() * pokemons.length)]);
        }
        const optionList = Array.from(options).sort(() => Math.random() - 0.5);
        setQuizTarget(target);
        setQuizOptions(optionList);
        setQuizSelected(null);
        setQuizResult(null);
        setQuizAttempts(0);
        setQuizWrongOptions(new Set());
    }, [pokemons]);

    const normalizeSpeech = useCallback((value: string) => value.replace(/-/g, ' '), []);

    const pickLine = useCallback((lines: string[]) => {
        if (!lines.length) return '';
        let next = lines[Math.floor(Math.random() * lines.length)];
        if (lines.length > 1 && next === lastQuizLineRef.current) {
            next = lines[(lines.indexOf(next) + 1) % lines.length];
        }
        lastQuizLineRef.current = next;
        return next;
    }, []);

    const speakLine = useCallback((line: string) => {
        if (!line) return;
        if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
        try {
            window.speechSynthesis.cancel();
            setQuizSpeechLabel(line);
            const utterance = new SpeechSynthesisUtterance(line);
            utterance.rate = 0.9;
            utterance.pitch = 0.95;
            const daniel = voices?.find((voice) => voice.name.toLowerCase() === 'daniel');
            if (daniel) {
                utterance.voice = daniel;
            }
            window.speechSynthesis.speak(utterance);
        } catch {
            // ignore TTS failures
        }
    }, [voices]);

    const closeQuiz = useCallback(() => {
        if (quizCloseTimeoutRef.current) {
            window.clearTimeout(quizCloseTimeoutRef.current);
            quizCloseTimeoutRef.current = null;
        }
        setQuizOpen(false);
        setQuizSelected(null);
        setQuizResult(null);
        setQuizAttempts(0);
        setQuizWrongOptions(new Set());
        setQuizSpeechLabel(null);
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }, []);

    const scheduleQuizClose = (delayMs: number) => {
        if (quizCloseTimeoutRef.current) {
            window.clearTimeout(quizCloseTimeoutRef.current);
        }
        quizCloseTimeoutRef.current = window.setTimeout(() => {
            closeQuiz();
        }, delayMs);
    };

    const openQuiz = useCallback(() => {
        if (quizCloseTimeoutRef.current) {
            window.clearTimeout(quizCloseTimeoutRef.current);
        }
        buildQuiz();
        setQuizOpen(true);
        speakLine('Whos that Pokemon...');
    }, [buildQuiz, pickLine, speakLine]);

    const handleQuizPick = useCallback((option: PokemonSummary) => {
        if (!quizTarget || quizResult) return;
        if (quizWrongOptions.has(option.name)) return;
        setQuizSelected(option.name);
        if (option.name === quizTarget.name) {
            setQuizResult('correct');
            const winLine = pickLine([
                `Great job! It's ${normalizeSpeech(quizTarget.name)}.`,
                `You got it! That's ${normalizeSpeech(quizTarget.name)}.`,
                `Nice work! It's ${normalizeSpeech(quizTarget.name)}.`
            ]);
            speakLine(winLine);
            scheduleQuizClose(3200);
        } else {
            setQuizAttempts((prev) => {
                const nextAttempts = prev + 1;
                setQuizWrongOptions((current) => {
                    const next = new Set(current);
                    next.add(option.name);
                    return next;
                });
                if (nextAttempts >= 2) {
                    setQuizResult('wrong');
                    const loseLine = pickLine([
                        `Good try! It's ${normalizeSpeech(quizTarget.name)}.`,
                        `Almost! That was ${normalizeSpeech(quizTarget.name)}.`,
                        `Nice effort! It's ${normalizeSpeech(quizTarget.name)}.`
                    ]);
                    speakLine(loseLine);
                    scheduleQuizClose(2600);
                } else {
                    const tryLine = pickLine([
                        'Nice try! You get one more guess.',
                        'Good guess! Try again.',
                        'Almost! Give it one more shot.'
                    ]);
                    speakLine(tryLine);
                }
                return nextAttempts;
            });
        }
    }, [normalizeSpeech, pickLine, quizResult, quizTarget, quizWrongOptions, speakLine]);

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

    const handleToggleType = (type: string) => {
        if (!type) return;
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
        );
    };

    const handleClearTypes = () => {
        setSelectedTypes([]);
    };

    const getTypeIcon = (typeName: string) => TYPE_ICON_MAP[typeName];

    const handlePlayCry = (cry?: string) => {
        if (!cry) {
            return;
        }
        const audio = new Audio(cry);
        audio.play().catch(() => {});
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
    const isRainbow = selectedTypes.length >= 5;
    const inkStrong = isRainbow
        ? '#1f2937'
        : isLightColor(theme.bg1)
          ? '#1f2937'
          : '#f8fafc';
    const inkMuted = isRainbow
        ? 'rgba(31, 41, 55, 0.7)'
        : isLightColor(theme.bg1)
          ? 'rgba(31, 41, 55, 0.7)'
          : 'rgba(248, 250, 252, 0.7)';
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const timer = window.setInterval(() => setNow(new Date()), 30000);
        return () => window.clearInterval(timer);
    }, []);
    const timeText = useMemo(
        () =>
            now.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit'
            }),
        [now]
    );
    const dateText = useMemo(
        () =>
            now.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric'
            }),
        [now]
    );
    const timeZone = useMemo(
        () => Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(now).find((part) => part.type === 'timeZoneName')?.value ?? '',
        [now]
    );
    const greeting = useMemo(() => {
        const hour = now.getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    }, [now]);
    const greetingTimeClass = useMemo(() => {
        const hour = now.getHours();
        if (hour >= 5 && hour < 11) return classes.greetingTimeMorning;
        if (hour >= 11 && hour < 17) return classes.greetingTimeDay;
        if (hour >= 17 && hour < 20) return classes.greetingTimeDusk;
        return classes.greetingTimeNight;
    }, [now, classes]);
    const greetingTips = useMemo(
        () => [
            'Eevee can grow into many forms.',
            'Bulbasaur is #1 in the Pokédex.',
            'Snorlax loves long naps.',
            'Jigglypuff’s song makes others sleepy.',
            'Gyarados grows from a tiny fish.',
            'Metapod has a hard shell.',
            'Onix is lighter than it looks.',
            'Abra sleeps most of the day.',
            'Ditto can copy other Pokémon.',
            'Poliwag has a swirl on its belly.',
            'Water puts out Fire in battles.',
            'Electric moves do not work on Ground types.',
            'Try using a move that raises your stats.',
            'If a move misses, try one with better accuracy.',
            'Some Pokémon evolve by trading.'
        ],
        []
    );
    const tipIndex = useMemo(() => now.getMinutes() % greetingTips.length, [now, greetingTips.length]);
    const tipText = greetingTips[tipIndex];

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
                    ['--theme-nav' as any]:
                        selectedTypes.length === 0 ? '#7aa7ff' : theme.accent,
                    ['--theme-nav-ink' as any]:
                        selectedTypes.length === 0 ? '#1f2a44' : accentInk,
                    ['--play-bg' as any]: isLightColor(theme.bg1)
                        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.7))'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.08))',
                    ['--play-bg-hover' as any]: isLightColor(theme.bg1)
                        ? 'linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.8))'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.32), rgba(255, 255, 255, 0.14))',
                    ['--play-border' as any]: isLightColor(theme.bg1)
                        ? 'rgba(15, 23, 42, 0.18)'
                        : 'rgba(255, 255, 255, 0.3)',
                    ['--play-border-hover' as any]: isLightColor(theme.bg1)
                        ? 'rgba(15, 23, 42, 0.28)'
                        : 'rgba(255, 255, 255, 0.45)',
                    ['--play-ink' as any]: inkStrong,
                    ['--theme-card-bg' as any]: theme.cardBg,
                    ['--theme-border' as any]: theme.border,
                    ['--grid-line' as any]: gridLine,
                    ['--theme-ink-strong' as any]: inkStrong,
                    ['--theme-ink-muted' as any]: inkMuted
                }}
            >
            <div className={classes.mainPageTiles} />
            {panelOpen ? (
                <div
                    className={classes.rightPanelBackdrop}
                    role='button'
                    aria-label='Close filters panel'
                    onClick={() => setPanelOpen(false)}
                />
            ) : null}
            <aside
                className={`${classes.filterDrawer} ${panelOpen ? classes.filterDrawerOpen : ''}`}
                aria-hidden={!panelOpen}
            >
                <div className={classes.filterDrawerHeader}>
                    <h2 className={classes.filterDrawerTitle}>Filter Types</h2>
                    <div className={classes.filterDrawerActions}>
                        <button
                            type='button'
                            className={classes.filterDrawerClear}
                            onClick={handleClearTypes}
                            disabled={!selectedTypes.length}
                        >
                            Clear
                        </button>
                        <button
                            type='button'
                            className={classes.filterDrawerClose}
                            onClick={() => setPanelOpen(false)}
                            aria-label='Close filters panel'
                        >
                            ×
                        </button>
                    </div>
                </div>
                <div className={classes.filterDrawerList}>
                    {typeOptions.map(({ name }) => {
                        const palette = getTypeTheme(name);
                        const checked = selectedTypes.includes(name);
                        return (
                            <label
                                key={name}
                                className={classes.filterOption}
                                style={{ ['--type-accent' as any]: palette.accent }}
                            >
                                <input
                                    className={classes.filterCheckbox}
                                    type='checkbox'
                                    checked={checked}
                                    onChange={() => handleToggleType(name)}
                                />
                                <span className={classes.filterToggle} aria-hidden='true' />
                                <span className={classes.filterTypeIconWrap} aria-hidden='true'>
                                    {getTypeIcon(name) ? (
                                        <img
                                            className={classes.filterTypeIcon}
                                            src={getTypeIcon(name)}
                                            alt=''
                                        />
                                    ) : null}
                                </span>
                                <span className={classes.filterOptionText}>{name}</span>
                            </label>
                        );
                    })}
                </div>
            </aside>
            <div className={classes.mainPage}>
                <div className={classes.mainToolbar}>
                    <div className={classes.mainHeaderBrand}>
                        <img className={classes.mainHeaderBall} src={pokeball} alt='pokeball' />
                        <h1 className={classes.mainHeaderTitle}>Poke Library</h1>
                    </div>
                    <button
                        type='button'
                        className={classes.mysteryButton}
                        onClick={openQuiz}
                        aria-label='Open mystery Pokemon'
                        disabled={!pokemons.length}
                    >
                        ?
                    </button>
                    <div className={classes.toolbarRight}>
                        <div className={classes.toolbarSearch}>
                            <label className={classes.mainSearchLabel} htmlFor='pokemon-search'>
                                Search Pokemon
                            </label>
                            <div className={classes.mainSearchInputRow}>
                                <input
                                    id='pokemon-search'
                                    className={classes.mainSearchInput}
                                    placeholder='Type a name...'
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    aria-label='Search Pokemon'
                                />
                                {searchTerm ? (
                                    <button
                                        type='button'
                                        className={classes.mainSearchClear}
                                        onClick={() => setSearchTerm('')}
                                        aria-label='Clear search'
                                    >
                                        Clear
                                    </button>
                                ) : null}
                            </div>
                        </div>
                        <button
                            type='button'
                            className={classes.filterToggleButton}
                            onClick={() => setPanelOpen((prev) => !prev)}
                            aria-label={panelOpen ? 'Close filters panel' : 'Open filters panel'}
                        >
                            {panelOpen ? '×' : '☰'}
                        </button>
                    </div>
                </div>
                {quizOpen ? (
                    <div className={classes.mysteryOverlay} role='dialog' aria-modal='true'>
                        <SpeechOverlay
                            visible={Boolean(quizSpeechLabel)}
                            label={quizSpeechLabel ?? ''}
                            title='Professor Espino'
                            imageSrc={professorImage}
                            backgroundSrc={labImage}
                            classes={classes}
                        />
                        <div className={classes.mysteryModal}>
                            <button
                                type='button'
                                className={classes.mysteryClose}
                                onClick={closeQuiz}
                                aria-label='Close mystery'
                            >
                                ×
                            </button>
                            <h2 className={classes.mysteryTitle}>Whos that Pokemon?</h2>
                            <div className={classes.mysteryPokemon}>
                                {quizTarget ? (
                                    <img
                                        className={`${classes.mysterySprite} ${
                                            quizResult ? classes.mysteryReveal : ''
                                        }`}
                                        src={getPokemonSprite(quizTarget)}
                                        alt='Mystery Pokemon'
                                    />
                                ) : null}
                            </div>
                            <div className={classes.mysteryOptions}>
                                {quizOptions.map((option) => {
                                    const isSelected = quizSelected === option.name;
                                    const isCorrect = quizResult === 'correct' && option.name === quizTarget?.name;
                                    const isWrong = quizWrongOptions.has(option.name);
                                    const isLocked = quizResult !== null || quizAttempts >= 2;
                                    return (
                                        <button
                                            key={option.name}
                                            type='button'
                                            className={`${classes.mysteryOption} ${
                                                isSelected ? classes.mysteryOptionSelected : ''
                                            } ${isCorrect ? classes.mysteryOptionCorrect : ''} ${
                                                isWrong ? classes.mysteryOptionWrong : ''
                                            }`}
                                            onClick={() => handleQuizPick(option)}
                                            disabled={isLocked}
                                        >
                                            {option.name}
                                            {isWrong ? <span className={classes.mysteryOptionMark}>×</span> : null}
                                        </button>
                                    );
                                })}
                            </div>
                            {quizResult === 'correct' ? (
                                <div className={classes.mysteryConfetti}>
                                    {Array.from({ length: 12 }, (_, index) => (
                                        <span
                                            key={`confetti-${index}`}
                                            className={classes.mysteryConfettiPiece}
                                            style={{
                                                ['--confetti-angle' as any]: `${index * 30}deg`
                                            }}
                                        />
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </div>
                ) : null}
                <section className={`${classes.mainColumn} ${classes.mainLayer}`}>
                    <div className={classes.featuredRow}>
                        <div className={`${classes.greetingCard} ${classes.metallicEdge}`}>
                            <div className={classes.greetingTop}>
                                <p className={classes.greetingHello}>{greeting}, Trainer.</p>
                                <p className={classes.greetingKicker}>Local time</p>
                                <p className={`${classes.greetingTime} ${greetingTimeClass}`}>{timeText}</p>
                            </div>
                            <div className={classes.greetingMeta}>
                                <span className={classes.greetingDate}>{dateText}</span>
                                <span className={classes.greetingDot} aria-hidden='true' />
                                <span className={classes.greetingZone}>{timeZone}</span>
                            </div>
                            <div className={classes.greetingTips}>
                                <p className={classes.greetingTipLabel}>Tips &amp; Fun Facts</p>
                                <p className={classes.greetingTip}>{tipText}</p>
                            </div>
                        </div>
                        <div className={`${classes.pokeFeatured} ${classes.metallicEdge}`}>
                            {featuredPokemon ? (
                                <div className={`${classes.pokeFeaturedContent} ${classes.pokeFeaturedContentCarousel}`}>
                                    <h2 className={`${classes.pokeCardTitle} ${classes.pokeFeaturedTitle}`}>Featured</h2>
                                    <div className={classes.pokeFeaturedCarouselRow}>
                                        <button
                                            className={classes.pokeFeaturedNav}
                                            type='button'
                                            onClick={handleFeaturedPrev}
                                            disabled={!canGoPrev}
                                        >
                                            Prev
                                        </button>
                                        <div className={classes.pokeFeaturedCarouselTrack}>
                                            {[prevFeaturedPokemon, featuredPokemon, nextFeaturedPokemon].map(
                                                (pokemon, index) => {
                                                    if (!pokemon) {
                                                        return (
                                                            <div
                                                                key={`featured-placeholder-${index}`}
                                                                className={classes.pokeFeaturedCarouselCard}
                                                            />
                                                        );
                                                    }
                                                    const isActive = index === 1;
                                                    return (
                                                        <button
                                                            key={pokemon.name}
                                                            type='button'
                                                            className={`${classes.pokeFeaturedCarouselCard} ${
                                                                isActive ? classes.pokeFeaturedCarouselActive : ''
                                                            }`}
                                                            onClick={() => {
                                                                if (pokemon.name === featuredPokemon.name) {
                                                                    handlePlayCry(pokemonMedia[pokemon.name]?.cry);
                                                                    return;
                                                                }
                                                                const targetIndex = featuredPool.findIndex(
                                                                    (entry) => entry.name === pokemon.name
                                                                );
                                                                if (targetIndex >= 0) {
                                                                    pushFeaturedIndex(targetIndex);
                                                                }
                                                            }}
                                                            aria-label={`View ${pokemon.name}`}
                                                        >
                                                            {pokemonMedia[pokemon.name]?.sprite ? (
                                                                <img
                                                                    className={classes.pokeFeaturedCarouselSprite}
                                                                    src={pokemonMedia[pokemon.name]?.sprite}
                                                                    alt={`${pokemon.name} sprite`}
                                                                />
                                                            ) : null}
                                                            <span className={classes.pokeFeaturedCarouselName}>
                                                                {pokemon.name}
                                                            </span>
                                                        </button>
                                                    );
                                                }
                                            )}
                                        </div>
                                        <button
                                            className={classes.pokeFeaturedNav}
                                            type='button'
                                            onClick={handleFeaturedNext}
                                            disabled={!canGoNext}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            ) : null}
                        </div>
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
                        />
                    </div>
                </section>
            </div>
            </div>
        </Page>
    );
};

export default PokemonListData;
