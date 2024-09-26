export default function extractStarshipIdFromUrl (url: string): number {
  const splitUrl = url.split('/')
  const idString = splitUrl[splitUrl.length - 2]
  const id = +idString
  return idString === '' || isNaN(id) ? 1 : id
}
