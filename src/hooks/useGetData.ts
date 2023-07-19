import { useEffect, useState } from "react";
import { api } from "src/getDoc/utils/api";

const useGetData = (
  url: string,
  method: "get" | "post" | "put" = "get",
  body?: any
) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await api[method](url, body);
      setData(result.data);
    }
    fetchData();
  }, [body, method, url]);
  return data;
};

export default useGetData;
