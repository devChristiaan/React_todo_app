import { useState, useEffect } from "react";
import axios from 'axios';

function useAdd (props) {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
      axios
        .post(props.url, props.inputData)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          setError(err);
        }).finally(() => {
          setLoading(false);
        })
  }, [props.url, props.inputData]);


  return { data, loading, error };
}

export default useAdd;