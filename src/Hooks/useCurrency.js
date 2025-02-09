import { useState, useEffect } from "react";

const useCurrency = (Currency) => {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${Currency}.json`
    )
      .then((response) => response.json())
      .then((response) => setData(response[Currency]));
  }, [Currency]);
  return data;
};

export default useCurrency;
