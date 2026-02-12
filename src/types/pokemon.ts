export type Pokemon = {
  name: string;
  displayName?: string;
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  sprites: {
    front_default?: string | null;
    front_shiny?: string | null;
    other?: {
      ['official-artwork']?: { front_default?: string | null; front_shiny?: string | null };
      home?: { front_default?: string | null; front_shiny?: string | null };
    };
  };
  species?: { name: string; url: string };
  cries?: { latest?: string | null; legacy?: string | null };
  stats?: { base_stat: number; stat: { name: string } }[];
  weight?: number;
  height?: number;
  base_experience?: number;
  forms?: { url: string; name?: string }[];
  id?: number;
};
