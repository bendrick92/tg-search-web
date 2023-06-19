import {useEffect, useState} from 'react';

const MetadataList = ({ data, limit, label, keyPrefix, ...rest }) => {
  const [limitedData, setLimitedData] = useState([data]);

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    if (limit && limit >= 1) {
      setLimitedData(data.slice(0, limit > data.length ? data.length : limit));
    }
    else {
      setLimitedData(data);
    }
  }, [data, limit]);

  const listMarkup = limitedData && limitedData.map((item, i) => {
    return (
      <li
        key={`${keyPrefix}-${i}`}
        className='px-2 py-1 border-solid border-2 border-tg-gray rounded-md cursor-pointer'
      >
        {item}
      </li>
    );
  });

  const moreMarkup = data.length > limitedData.length && (
    <li className='px-2 py-1 border-solid border-2 border-tg-gray rounded-md cursor-pointer'>
      +{data.length - limitedData.length} more
    </li>
  );

  return (
    <div {...rest}>
      <h4 className='mb-2 text-md text-gray-400'>{label}</h4>
      <ul className='flex flex-row gap-3 flex-wrap'>
        {listMarkup}
        {moreMarkup}
      </ul>
    </div>
  );
};

export default MetadataList;