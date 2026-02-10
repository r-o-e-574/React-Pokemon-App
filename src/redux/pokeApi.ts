import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  PokedexResponse,
  RegionResponse,
  TypeListResponse,
  TypeResponse
} from '../types/pokeapi';

export const pokeApi = createApi({
  reducerPath: 'pokeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getTypeList: builder.query<TypeListResponse, void>({
      query: () => 'type'
    }),
    getRegionList: builder.query<TypeListResponse, void>({
      query: () => 'region'
    }),
    getSpeciesList: builder.query<TypeListResponse, void>({
      query: () => 'pokemon-species?limit=2000'
    }),
    getPokemonByName: builder.query<any, string>({
      query: (name) => `pokemon/${name}`
    }),
    getTypeByName: builder.query<TypeResponse, string>({
      query: (name) => `type/${name}`
    }),
    getRegionByName: builder.query<RegionResponse, string>({
      query: (name) => `region/${name}`
    }),
    getByUrl: builder.query<PokedexResponse, string>({
      query: (url) => ({ url })
    })
  })
});

export const {
  useGetTypeListQuery,
  useGetRegionListQuery,
  useGetSpeciesListQuery,
  useGetPokemonByNameQuery,
  useGetTypeByNameQuery,
  useGetRegionByNameQuery,
  useLazyGetByUrlQuery
} = pokeApi;
