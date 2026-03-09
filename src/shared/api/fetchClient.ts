/**
 * fetchClient is a utility function that performs a fetch request to
 * the specified URL and returns the response as JSON.
 * It also checks if the response is successful (status code 200-299)
 * and throws an error if it is not.
 * @param url
 * @returns
 */
export async function fetchClient<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('API request failed');
  }

  return response.json() as Promise<T>;
}
