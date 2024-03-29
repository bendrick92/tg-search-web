import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGear, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';
import {useEffect, useMemo, useState} from 'react';
import {debounce} from 'lodash';
import {createApiFetch} from '../helpers';
import Alert from './Alert';

const SearchInput = ({ initialSearchTerm, size }) => {
  const navigate = useNavigate();

  const [query, setQuery] = useState(initialSearchTerm || '');
  const [autocompleting, setAutocompleting] = useState(false);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [autocompleteError, setAutocompleteError] = useState(false);

  useEffect(() => {
    setAutocompleting(false);
    setAutocompleteResults([]);
  }, []);

  const handleChange = (e) => {
    if (query === e.target.value) {
      return;
    }

    setQuery(e.target.value);

    if (!e.target.value) {
      setAutocompleteResults([]);
    }

    debouncedAutocomplete(e);
  };

  const debouncedAutocomplete = useMemo(() =>
    debounce((e) => {
      if (e.target.value && !autocompleting) {
        setAutocompleting(true);

        createApiFetch(`/episodes/autocomplete?q=${e.target.value}`)
          .then(data => {
            setAutocompleteResults(data.slice(0, 5));
          })
          .catch(() => {
            setAutocompleteError(true);
          })
          .finally(() => {
            setAutocompleting(false);
          });
      }
    }, 500)
  , [autocompleting]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      navigate(`/episodes/search?q=${query}`);

      setAutocompleteResults([]);
    }
  };

  const handleAutocompleteClick = (term) => {
    navigate(`/episodes/search?q=${term}`);

    setAutocompleteResults([]);
  };

  const handleClearClick = () => {
    setQuery('');
    setAutocompleting(false);
    setAutocompleteResults([]);
  };

  const autocompleteList = autocompleteResults.map((result, index) => {
    return (
      <div
        key={`suggestion-${index}`}
        onClick={() => handleAutocompleteClick(result)}
        className='p-3 hover:bg-gray-500 hover:cursor-pointer'
      >
        {result}
      </div>
    );
  });

  const autocompleteMarkup = autocompleteResults.length > 0 && (
    <>
      <div className='w-screen h-screen fixed left-0 top-0 z-0' onClick={() => setAutocompleteResults([])}></div>
      <div className='pt-2 -mt-2 w-full absolute top-full bg-tg-gray rounded-b-lg flex flex-col z-10 overflow-hidden'>
        {autocompleteList}
      </div>
    </>
  );

  const autocompleteErrorMarkup = (
    <Alert
      type='error'
      message='Oops, something went wrong!'
      show={autocompleteError}
      dismiss={() => setAutocompleteError(false)}
    />
  );

  return (
    <>
      <div className='w-full bg-tg-gray rounded-lg flex-initial flex flex-col relative'>
        <div className={`w-full ${size && size === 'lg' ? 'text-lg' : 'text-md' } flex flex-row items-center z-20`}>
          <input
            className={`min-w-0 ${size && size === 'lg' ? 'px-5' : 'px-3'} bg-transparent text-gray-200 focus:outline-none flex-1`}
            placeholder='Which episode had...'
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          {query.length > 0 && (
            <div className={`px-${size && size === 'lg' ? '5' : '4'} pl-0 flex-none`}>
              <FontAwesomeIcon icon={faTimes} size='lg' className='text-gray-500 hover:cursor-pointer' onClick={handleClearClick}/>
            </div>
          )}
          <div
            className={`px-${size && size === 'lg' ? '5' : '4'} py-3 flex-none rounded-r-lg ${autocompleteResults.length > 0 && 'rounded-br-none'} ${query.length > 0 && 'cursor-pointer bg-teal-600 text-gray-200 hover:bg-teal-500'} z-10`}
            onClick={() => query.length > 0 && navigate(`/episodes/search?q=${query}`)}
          >
            <FontAwesomeIcon icon={autocompleting ? faGear : faSearch} size='lg' className={autocompleting ? 'animate-spin' : ''}/>
          </div>
        </div>
        {autocompleteMarkup}
      </div>
      {autocompleteErrorMarkup}
    </>
  );
};

export default SearchInput;