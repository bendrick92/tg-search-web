import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGear, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';
import {useEffect, useMemo, useState} from 'react';
import {debounce} from 'lodash';
import {createApiFetch} from '../helpers';
import Alert from './Alert';

const SearchInput = ({ initialSearchTerm, showClear, size }) => {
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
        className='p-3 hover:bg-slate-500 hover:cursor-pointer'
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
        <div className={`w-full ${size && size === 'lg' ? 'text-lg' : 'text-md' } flex flex-row items-center z-10`}>
          <div className={`pr-0 px-${size && size === 'lg' ? '5' : '3'} flex-none`}>
            <FontAwesomeIcon icon={autocompleting ? faGear : faSearch} className={`text-slate-500 ${autocompleting && 'animate-spin'}`}/>
          </div>
          <input
            className={`min-w-0 ${size && size === 'lg' ? 'px-5 py-4' : 'px-3 py-2'} bg-transparent text-slate-200 focus:outline-none flex-1`}
            placeholder='Which episode had...'
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          {showClear && query.length > 0 && (
            <div className={`px-${size && size === 'lg' ? '5' : '3'} pl-0 flex-none`}>
              <FontAwesomeIcon icon={faTimes} className='text-slate-500 hover:cursor-pointer' onClick={handleClearClick}/>
            </div>
          )}
        </div>
        {autocompleteMarkup}
      </div>
      {autocompleteErrorMarkup}
    </>
  );
};

export default SearchInput;