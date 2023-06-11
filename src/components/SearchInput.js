import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faSpinner, faTimes} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {debounce} from 'lodash';

const SearchInput = ({ initialSearchTerm }) => {
  const navigate = useNavigate();

  const [query, setQuery] = useState(initialSearchTerm || '');
  const [autocompleting, setAutocompleting] = useState(false);
  const [autocompleteResults, setAutocompleteResults] = useState([]);

  useEffect(() => {
    setAutocompleting(false);
    setAutocompleteResults([]);
  }, []);

  useEffect(() => {
    if (initialSearchTerm && query === initialSearchTerm) {
      return; // If page just loaded in
    }

    if (query && query.trim() !== '') {
      fetchAutocomplete();
    } else {
      setAutocompleteResults([]);
    }
  }, [initialSearchTerm, query]);

  const fetchAutocomplete = debounce(() => {
    setAutocompleting(true);
    fetch(`http://localhost:5000/api/v1/episodes/autocomplete?q=${query}`)
      .then(response => response.json())
      .then(data => {
        setAutocompleteResults(data.slice(0, 5));
        setAutocompleting(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, 300);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${query}`);

      setAutocompleteResults([]);
    }
  };

  const handleAutocompleteClick = (term) => {
    navigate(`/search?q=${term}`);

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
      <div className='flex flex-col z-10'>
        {autocompleteList}
      </div>
    </>
  );

  return (
    <div className='w-full flex justify-center'>
      <div className='w-full md:w-128 bg-slate-600 rounded-lg flex-initial flex flex-col overflow-hidden'>
        <div className='w-full text-lg flex flex-row z-10'>
          <div className='px-5 py-4 pr-0'>
            <FontAwesomeIcon icon={autocompleting ? faSpinner : faSearch} className='text-slate-500'/>
          </div>
          <input
            className='px-5 py-4 bg-transparent text-slate-200 focus:outline-none grow'
            placeholder='Which episode had...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          {query.length > 0 && (
            <div className='px-5 py-4 pl-0'>
              <FontAwesomeIcon icon={faTimes} className='text-slate-500 hover:cursor-pointer' onClick={() => setQuery('')}/>
            </div>
          )}
        </div>
        {autocompleteMarkup}
      </div>
    </div>
  );
};

export default SearchInput;