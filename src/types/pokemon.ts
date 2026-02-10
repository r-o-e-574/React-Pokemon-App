export type Pokemon = {
  name: string;
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  sprites: { front_default?: string | null };
  species?: { name: string; url: string };
  cries?: { latest?: string | null; legacy?: string | null };
};
