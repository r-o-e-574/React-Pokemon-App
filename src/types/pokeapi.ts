export type NamedApiResource = { name: string; url: string };

export type GenerationResponse = {
  types: NamedApiResource[];
  pokemon_species: NamedApiResource[];
};

export type TypeListResponse = {
  results: NamedApiResource[];
};

export type RegionResponse = {
  pokedexes: NamedApiResource[];
};

export type PokedexResponse = {
  pokemon_entries: { pokemon_species: NamedApiResource }[];
};

export type PokemonAbilityResponse = {
  effect_entries: { effect: string; short_effect: string; language: NamedApiResource }[];
  name: string;
};

export type PokemonSpeciesResponse = {
  flavor_text_entries: { flavor_text: string; language: NamedApiResource; version: NamedApiResource }[];
  genera: { genus: string; language: NamedApiResource }[];
  egg_groups: NamedApiResource[];
  habitat: NamedApiResource | null;
  color: NamedApiResource;
  shape: NamedApiResource;
  capture_rate: number;
  base_happiness: number;
  hatch_counter: number;
  evolution_chain: { url: string };
  varieties: { is_default: boolean; pokemon: NamedApiResource }[];
};

export type EvolutionChainResponse = {
  chain: EvolutionChainNode;
};

export type EvolutionChainNode = {
  species: NamedApiResource;
  evolves_to: EvolutionChainNode[];
  evolution_details?: EvolutionDetail[];
};

export type EvolutionDetail = {
  trigger: NamedApiResource;
  min_level: number | null;
  item: NamedApiResource | null;
  held_item?: NamedApiResource | null;
  min_happiness: number | null;
  time_of_day: string;
  known_move: NamedApiResource | null;
  location?: NamedApiResource | null;
  needs_overworld_rain?: boolean;
  relative_physical_stats?: number | null;
  min_affection: number | null;
  min_beauty: number | null;
};

export type TypeDamageRelations = {
  double_damage_from: NamedApiResource[];
  half_damage_from: NamedApiResource[];
  no_damage_from: NamedApiResource[];
};

export type TypeResponse = {
  pokemon: { pokemon: NamedApiResource }[];
  damage_relations?: TypeDamageRelations;
};
