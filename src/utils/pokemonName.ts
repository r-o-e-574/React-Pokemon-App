export const formatPokemonDisplayName = (value: string) => {
  const parts = value
    .split('-')
    .map((part) => part.trim())
    .filter(Boolean);

  const megaIndex = parts.indexOf('mega');
  if (megaIndex > 0) {
    const base = parts.slice(0, megaIndex);
    const suffix = parts.slice(megaIndex + 1);
    return ['mega', ...base, ...suffix].join(' ');
  }

  return parts.join(' ');
};
