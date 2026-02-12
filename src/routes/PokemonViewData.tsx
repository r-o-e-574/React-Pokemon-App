import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import { useFetchUrl } from '../hooks';
import type { Pokemon } from '../types/pokemon';
import type {
  EvolutionChainResponse,
  EvolutionChainNode,
  EvolutionDetail,
  PokemonSpeciesResponse,
  TypeDamageRelations,
  TypeResponse
} from '../types/pokeapi';
import { getTypeTheme } from '../styles/typeTheme';
import { formatPokemonDisplayName } from '../utils/pokemonName';

const emptyPokemon: Pokemon = { name: '', abilities: [], types: [], sprites: {}, cries: {} };

function PokemonViewData() {
  const { name: pokemonName } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<Pokemon>(emptyPokemon);
  const [speciesText, setSpeciesText] = useState<string>('');
  const [genus, setGenus] = useState<string>('');
  const [speciesMeta, setSpeciesMeta] = useState<{
    eggGroups: string[];
    habitat?: string;
    color?: string;
    shape?: string;
    captureRate?: number;
    baseHappiness?: number;
    hatchCounter?: number;
    varieties: { name: string; displayName: string; is_default: boolean }[];
  }>({ eggGroups: [], varieties: [] });
  const [evolutionStages, setEvolutionStages] = useState<
    Array<{ stage: number; entries: EvolutionEntry[] }>
  >([]);
  const [evolutionSprites, setEvolutionSprites] = useState<Record<string, string>>({});
  const [varietySprites, setVarietySprites] = useState<Record<string, string>>({});
  const [typeMatchups, setTypeMatchups] = useState<{
    weak: string[];
    resist: string[];
    immune: string[];
  }>({ weak: [], resist: [], immune: [] });
  const theme = getTypeTheme(pokemon.types[0]?.type?.name);
  const isLightColor = (hex: string) => {
    const normalized = hex.replace('#', '');
    if (normalized.length !== 6) return false;
    const r = parseInt(normalized.slice(0, 2), 16) / 255;
    const g = parseInt(normalized.slice(2, 4), 16) / 255;
    const b = parseInt(normalized.slice(4, 6), 16) / 255;
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 0.6;
  };
  const inkStrong = isLightColor(theme.bg1) ? '#1f2937' : '#f8fafc';
  const inkMuted = isLightColor(theme.bg1) ? 'rgba(31, 41, 55, 0.7)' : 'rgba(248, 250, 252, 0.7)';
  const fetchUrl = useFetchUrl();
  const themeVars: React.CSSProperties & Record<string, string> = {
    '--theme-bg-1': theme.bg1,
    '--theme-bg-2': theme.bg2,
    '--theme-bg-3': theme.bg3,
    '--theme-accent': theme.accent,
    '--theme-card-bg': theme.cardBg,
    '--theme-border': theme.border,
    '--grid-line': getGridLineColor(theme.bg1),
    '--theme-ink-strong': inkStrong,
    '--theme-ink-muted': inkMuted
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pokemonName]);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonName;
    fetchUrl<Pokemon>(url, (data) => {
      setPokemon({ ...data, displayName: formatPokemonDisplayName(data.name) });
      const megaPromise = fetchMegaFormNames(data.forms ?? []);

      if (data.species?.url) {
        fetchUrl<PokemonSpeciesResponse>(data.species.url, (species) => {
          const englishFlavor = species.flavor_text_entries.find(
            (entry) => entry.language.name === 'en'
          );
          const englishGenus = species.genera.find((entry) => entry.language.name === 'en');
          setSpeciesText(englishFlavor?.flavor_text?.replace(/\f/g, ' ') ?? '');
          setGenus(englishGenus?.genus ?? '');
          const rawVarieties =
            species.varieties?.map((item) => ({
              name: item.pokemon.name,
              displayName: formatPokemonDisplayName(item.pokemon.name),
              is_default: item.is_default
            })) ?? [];
          const seen = new Set<string>();
          const speciesVarieties = rawVarieties.filter((item) => {
            if (seen.has(item.name)) {
              return false;
            }
            seen.add(item.name);
            return true;
          });
          const speciesVarietyNames = speciesVarieties.map((item) => item.name);
          setSpeciesMeta({
            eggGroups: species.egg_groups?.map((group) => group.name) ?? [],
            habitat: species.habitat?.name ?? undefined,
            color: species.color?.name ?? undefined,
            shape: species.shape?.name ?? undefined,
            captureRate: species.capture_rate,
            baseHappiness: species.base_happiness,
            hatchCounter: species.hatch_counter,
            varieties: speciesVarieties
          });

          if (species.evolution_chain?.url) {
            fetchUrl<EvolutionChainResponse>(species.evolution_chain.url, (chainData) => {
              const stages = buildEvolutionStages(chainData.chain);
              setEvolutionStages(stages);

              const names = stages.flatMap((stage) => stage.entries.map((entry) => entry.name));
              fetchEvolutionSprites(names);
            });
          }

          if (speciesVarietyNames.length) {
            fetchVarietySprites(speciesVarietyNames);
          }

          megaPromise.then((megaNames) => {
            const uniqueMegaNames = megaNames.filter((name) => !speciesVarietyNames.includes(name));
            if (!uniqueMegaNames.length) return;
            setSpeciesMeta((prev) => {
              const nextVarieties = [
                ...(prev.varieties ?? []),
                ...uniqueMegaNames.map((name) => ({
                  name,
                  displayName: formatPokemonDisplayName(name),
                  is_default: false
                }))
              ];
              const nextSeen = new Set<string>();
              return {
                ...prev,
                varieties: nextVarieties.filter((item) => {
                  if (nextSeen.has(item.name)) {
                    return false;
                  }
                  nextSeen.add(item.name);
                  return true;
                })
              };
            });
            fetchVarietySprites(uniqueMegaNames);
          });
        });
      }

      if (data.types?.length) {
        Promise.all(
          data.types.map(async ({ type }) => {
            const res = await fetch(type.url);
            const typeData = (await res.json()) as TypeResponse;
            return typeData.damage_relations;
          })
        ).then((relations) => {
          const matchup = buildTypeMatchups(relations.filter(Boolean) as TypeDamageRelations[]);
          setTypeMatchups(matchup);
        });
      }
    });
  }, [pokemonName, fetchUrl]);

  const fetchEvolutionSprites = (names: string[]) => {
    if (!names.length) return;
    Promise.all(
      names.map(async (name) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = (await res.json()) as PokemonSpriteResponse;
        return { name, sprite: resolveSprite(data) };
      })
    ).then((items) => {
      const next = items.reduce<Record<string, string>>((acc, item) => {
        acc[item.name] = item.sprite;
        return acc;
      }, {});
      setEvolutionSprites((prev) => ({ ...prev, ...next }));
    });
  };

  const fetchMegaFormNames = async (forms: Array<{ url: string; name?: string }>) => {
    if (!forms.length) return [];
    const results = await Promise.all(
      forms.map(async (form) => {
        try {
          const res = await fetch(form.url);
          const data = await res.json();
          if (data?.is_mega) {
            return data?.pokemon?.name ?? data?.name ?? form.name ?? '';
          }
        } catch {
          return '';
        }
        return '';
      })
    );
    return results.filter(Boolean);
  };

  const fetchVarietySprites = (names: string[]) => {
    if (!names.length) return;
    Promise.all(
      names.map(async (name) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = (await res.json()) as PokemonSpriteResponse;
        return { name, sprite: resolveSprite(data) };
      })
    ).then((items) => {
      const next = items.reduce<Record<string, string>>((acc, item) => {
        acc[item.name] = item.sprite;
        return acc;
      }, {});
      setVarietySprites((prev) => ({ ...prev, ...next }));
    });
  };

  const buildEvolutionStages = (chain: EvolutionChainNode) => {
    const stages: Record<number, EvolutionEntry[]> = {};
    const walk = (node: EvolutionChainNode, depth: number) => {
      if (!stages[depth]) stages[depth] = [];
      stages[depth].push({
        name: node.species.name,
        displayName: formatPokemonDisplayName(node.species.name),
        details: node.evolution_details?.[0] ?? null
      });
      node.evolves_to?.forEach((child) => walk(child, depth + 1));
    };
    walk(chain, 0);
    return Object.keys(stages)
      .map((key) => ({ stage: Number(key), entries: stages[Number(key)] }))
      .sort((a, b) => a.stage - b.stage);
  };

  const buildTypeMatchups = (relations: TypeDamageRelations[]) => {
    const multipliers = new Map<string, number>();
    relations.forEach((rel) => {
      rel.double_damage_from.forEach((item) => {
        multipliers.set(item.name, (multipliers.get(item.name) ?? 1) * 2);
      });
      rel.half_damage_from.forEach((item) => {
        multipliers.set(item.name, (multipliers.get(item.name) ?? 1) * 0.5);
      });
      rel.no_damage_from.forEach((item) => {
        multipliers.set(item.name, 0);
      });
    });
    const weak: string[] = [];
    const resist: string[] = [];
    const immune: string[] = [];
    multipliers.forEach((value, key) => {
      if (value === 0) immune.push(key);
      else if (value > 1) weak.push(key);
      else if (value < 1) resist.push(key);
    });
    weak.sort();
    resist.sort();
    immune.sort();
    return { weak, resist, immune };
  };

  return (
    <div style={themeVars}>
      <PokemonCard
        pokemon={pokemon}
        speciesText={speciesText}
        genus={genus}
        speciesMeta={speciesMeta}
        evolutionStages={evolutionStages}
        evolutionSprites={evolutionSprites}
        varietySprites={varietySprites}
        typeMatchups={typeMatchups}
      />
    </div>
  );
}

export default PokemonViewData;

interface EvolutionEntry {
  name: string;
  displayName: string;
  details: EvolutionDetail | null;
}

interface PokemonSpriteResponse {
  id?: number;
  sprites?: {
    front_default?: string | null;
    front_shiny?: string | null;
    other?: {
      ['official-artwork']?: { front_default?: string | null; front_shiny?: string | null };
      home?: { front_default?: string | null };
    };
  };
}

const resolveSprite = (data: PokemonSpriteResponse) => {
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
  return luminance > 0.7 ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.2)';
};
