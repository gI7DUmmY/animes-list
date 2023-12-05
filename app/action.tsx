'use server'

import AnimeCard, { AnimeProp } from '@/components/AnimeCard'
import MangaCard, { MangaProp } from '@/components/MangaCard'

export const fetchAnime = async (page: number) => {
  const res = await fetch(
    `https://shikimori.one/api/animes/?page=${page}&limit=8&order=popularity`
  )
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()

  return data.map((item: AnimeProp, index: number) => (
    <AnimeCard key={item.id} anime={item} index={index} />
  ))
}

export const fetchManga = async (page: number) => {
  let headersList = {
    Accept: '*/*',
    'X-RapidAPI-Key': '4d5a486e51mshe5c89d5b3fd6351p1b4cecjsn07840a9ecc79',
    'X-RapidAPI-Host': 'mangaverse-api.p.rapidapi.com',
  }

  let response = await fetch(
    'https://mangaverse-api.p.rapidapi.com/manga/fetch?page=1&nsfw=true&type=japan',
    {
      method: 'GET',
      headers: headersList,
    }
  )

  let data = await response.json()

  return data.data.map((item: MangaProp, index: number) => (
    <MangaCard key={item.id} manga={item} index={index} />
  ))
}
