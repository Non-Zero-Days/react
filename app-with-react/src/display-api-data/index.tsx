import { FC, useEffect, useState } from "react";

export const DisplayApiData : FC = () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
    const [data, setData] = useState<any | undefined>(undefined);

    useEffect(() => {
      fetch(apiUrl)
      .then((response) =>  response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error('Fetch error:', error);
      });
  }, [])

    return <div>
        <h1>API Data</h1>
        <p>{data?.title ?? ''}</p>
        <p>{data?.body ?? ''}</p>
    </div>
}