import { useEffect, useState } from 'react'
import { setDate } from 'date-fns'

const API_URL = 'https://swapi.co/api';

const validResources = [
  'films',
  'people',
  'planets',
  'species',
  'starships',
  'vehicles',
];

export function useSwapi(resource, queryOptions = {}) {
  if (!validResources.includes(resource)) {
    throw new Error(`Invalid resource provided: ${resource}`)
  }
  const {
    id,
    page,
    search
  } = queryOptions

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData(id, page, search) {
       setLoading(true)

      let url;
      if (id) {
        url = `${API_URL}/${resource}/${id}/`;
      } else {
        const urlParams = new URLSearchParams();
        if (page) {
          urlParams.append('page', page);
        }

        if (search) {
          urlParams.append('search', search);
        }

        url = `${API_URL}/${resource}/?${urlParams}`;
      }
      const res = await fetch(url);
      const data = await res.json();

      setData(data)
      setLoading(false)
      }

      
      loadData(id, page, search)
  }, [id, page, resource, search])

  return {
    data,
    loading,
  }
}