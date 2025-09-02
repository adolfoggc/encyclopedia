
export function getFetcher(url: string): Promise<any> {
  return fetch(url).then(response => response.json())
}

export function postFetcher(url: string, body: any): Promise<any> {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(response => response.json())
}
