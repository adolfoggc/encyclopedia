
export function dataFetcher(url: string): Promise<any> {
  return fetch(url).then(response => response.json())
}