import React, { useState, useEffect } from 'react';

export default function (WrappedComponent, stateData) {
  return function (props) {
    const [data, setData] = useState(null);

    useEffect(() => {
      async function fetchData() {
        const newData = await stateData.getProjections();
        setData(newData);
      }
      fetchData();
    }, []);

    if (!data) return null;

    return <WrappedComponent {...props} {...{ data }} />;
  };
}
