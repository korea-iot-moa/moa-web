import React, { useEffect } from 'react'
import { BsHeart } from 'react-icons/bs';
import axios from 'axios';
import useGroupTypeStore from '../../stores/gruopType.store';

function RegularGroup() {
  const results = useGroupTypeStore((state) => state.results);
  const loading = useGroupTypeStore((state) => state.loading);
  const setResult = useGroupTypeStore((state) => state.setResults);
  const setLoading = useGroupTypeStore((state) => state.setLoading);
  
  const fetchData = async() => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8081/api/v1/auth/meeting-group/groupType`, {params: {groupType:"정기모임"}});

      const shortTypeData = response.data.data;
      setResult(shortTypeData);
    } catch(error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div>
      <p>정기모임</p>
      <div></div>
        {
            loading 
            ? <p></p>
            : 
        <ul>
            {results.map(result => (
              <li key={result.groupId}>
                <div>{result.groupImage}</div>
                <p>{result.groupTitle}</p>
                <p>{result.groupDate}</p>
                <p>{result.groupAddress}</p>
                <div>
                  <BsHeart />
                </div>
              </li>
            )
            )}
        </ul>
          }
    </div>
  )
}

export default RegularGroup;