import { flatten, unflatten } from 'flat'
import { camel } from 'radash'
import { isString, mapKeys } from 'remeda'
import type { CollectionCascade } from './getCollectionCascade'

// TODO now takes collectionCascade, while it basically works for any object.
export const transformCasing = (collectionCascade: CollectionCascade) => {
  if (!collectionCascade) return collectionCascade
  const flat: any = flatten(collectionCascade)
  const transformedData = mapKeys(flat, (key) => {
    if (!isString(key)) return key
    const parts = (key as string).split('.')
    const result = parts.map((part) => camel(part))
    return result.join('.')
  })
  const nested = unflatten(transformedData)
  return nested
}
