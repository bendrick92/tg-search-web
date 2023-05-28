import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';
import {debounce} from 'lodash';
import {Link} from 'react-router-dom';

const Home = () => {
  const [query, setQuery] = useState('');
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);

  useEffect(() => {
    if (query && query.trim() !== '') {
      fetch(`https://localhost:7178/api/v1/episodes/autocomplete?q=${query}`)
        .then(response => response.json())
        .then(data => {
          setAutoCompleteResults(data.slice(0, 5));
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setAutoCompleteResults([]);
    }
  }, [query]);

  const handleQueryChange = debounce((e) => {
    setQuery(e.target.value);
  }, 500);

  const autoCompleteMarkup = autoCompleteResults.map((result, index) => {
    return (
      <Link
        key={`suggestion-${index}`}
        to={`/search?q=${result}`}
        className='p-3 hover:bg-slate-500'
      >
        {result}
      </Link>
    );
  });

  return (
    <div className='w-full flex justify-center'>
      <div className='w-full md:w-128 bg-slate-600 rounded-lg flex-initial flex flex-col overflow-hidden'>
        <div className='w-full text-lg flex flex-row'>
          <div className='px-5 py-4 pr-0'>
            <FontAwesomeIcon icon={faSearch} className='text-slate-500'/>
          </div>
          <input
            className='px-5 py-4 bg-transparent text-slate-200 focus:outline-none'
            placeholder='Which episode had...'
            onChange={handleQueryChange}
          />
        </div>
        <div className='flex flex-col'>
          {autoCompleteMarkup}
        </div>
      </div>
    </div>
  );
};

export default Home;