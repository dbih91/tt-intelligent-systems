function swapiFetch (endpoint: string) {
  return fetch(`https://swapi.dev/api/${ endpoint }/`)
}

export default {
  spaceships: {
    get () {
      return swapiFetch('starships')
    }
  }
}
