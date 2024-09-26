function swapiFetch (endpoint: string) {
  return fetch(`https://swapi.dev/api/${ endpoint }`)
}

export default {
  starships: {
    get (page: number, search?: string) {
      return swapiFetch(`starships/?page=${ page }${ search ? `&search=${ search }` : '' }`)
    }
  },
  starship: {
    get (starshipId: number) {
      return swapiFetch(`starships/${starshipId }/`)
    }
  }
}
