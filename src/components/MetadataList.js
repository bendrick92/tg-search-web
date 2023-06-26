import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Highlighter from "react-highlight-words";

const MetadataList = ({ data, limit, label, searchTerm, keyPrefix, ...rest }) => {
  const navigate = useNavigate();

  const [limitedData, setLimitedData] = useState([...data]);

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
        className='px-2 py-1 border-solid border-2 border-gray-600 rounded-md cursor-pointer'
        onClick={() => navigate(`/episodes/search?q=${item.trim().toLowerCase()}`)}
      >
        <Highlighter
          highlightTag='span'
          highlightClassName='font-black text-white text-lg'
          searchWords={[searchTerm]}
          textToHighlight={item}
        />
      </li>
    );
  });

  const moreMarkup = data.length > limitedData.length && (
    <li className='px-2 py-1 border-solid border-2 border-gray-600 rounded-md cursor-pointer'>
      +{data.length - limitedData.length} more
    </li>
  );

  return (
    <div {...rest}>
      <h4 className='mb-2 text-md text-gray-400'>{label}</h4>
      <ul className='flex flex-row gap-3 flex-wrap text-gray-200'>
        {listMarkup}
        {moreMarkup}
      </ul>
    </div>
  );
};

export default MetadataList;