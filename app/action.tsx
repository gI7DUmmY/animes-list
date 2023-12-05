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
  const key: any = process.env.NEXT_API_KEY
  const host: any = process.env.NEXT_API_HOST

  let headersList = {
    Accept: '*/*',
    'X-RapidAPI-Key': key,
    'X-RapidAPI-Host': host,
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
