function swapiFetch (endpoint: string) {
  return fetch(`https://swapi.dev/api/${ endpoint }`)
}

export default {
  spaceships: {
    get (page: number, search?: string) {
      return swapiFetch(`starships/?page=${ page }${ search ? `&search=${ search }` : '' }`)
    }
  }
}
