
export function dataFetcher(url: string){
  return fetch(url).then(response => response.json())
}