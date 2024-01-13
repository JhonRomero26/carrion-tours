import type { Place } from '@/models/Place'

export const getPlaces = async (): Promise<Place[]> => {
  const res = await import('@/data/places.json')

  return res.default
}