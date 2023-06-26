import {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {Loading, MetadataList, MetadataText, SearchInput} from '../components';
import Error from './Error';
import {createApiFetch} from '../helpers';

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    if (searchParams && searchParams.get('q')) {
      setSearchTerm(searchParams.get('q'));

      setSearching(true);

      createApiFetch(`/episodes/search?q=${searchParams.get('q')}`)
        .then(data => {
          setSearchResults(data);
        })
        .catch(() => {
          setSearchError(true);
        })
        .finally(() => {
          setSearching(false);
        });
    }
  }, [searchParams]);

  if (searchError) {
    return <Error/>;
  }

  const searchResultsMarkup = searchResults && searchResults.map((result, ri) => {
    return (
      <div key={`search-result-${ri}}`} className='w-full pb-4 flex flex-col gap-5'>
        <h3
          className='mb-0 text-2xl uppercase font-black cursor-pointer'
          onClick={() => navigate(`/episodes/${result.id}`)}
        >
          {result.title}
        </h3>
        <div>
          <MetadataList
            className='sm:hidden'
            data={result.hosts}
            limit={1}
            searchTerm={searchTerm}
            label='Hosts'
            keyPrefix={`${result.id}-host`}
          />
          <MetadataList
            className='hidden sm:block'
            data={result.hosts}
            searchTerm={searchTerm}
            label='Hosts'
            keyPrefix={`${result.id}-sm-host`}
          />
        </div>
        <div>
          <MetadataList
            className='sm:hidden'
            data={result.cars}
            limit={2}
            searchTerm={searchTerm}
            label='Cars'
            keyPrefix={`${result.id}-car`}
          />
          <MetadataList
            className='hidden sm:block'
            data={result.cars}
            searchTerm={searchTerm}
            label='Cars'
            keyPrefix={`${result.id}-sm-car`}
          />
        </div>
        <div>
          <MetadataList
            className='sm:hidden'
            data={result.guests}
            limit={2}
            searchTerm={searchTerm}
            label='Guests'
            keyPrefix={`${result.id}-guest`}
          />
          <MetadataList
            className='hidden sm:block'
            data={result.guests}
            searchTerm={searchTerm}
            label='Guests'
            keyPrefix={`${result.id}-sm-guest`}
          />
        </div>
        <div>
          <MetadataList
            className='sm:hidden'
            data={result.features}
            limit={2}
            searchTerm={searchTerm}
            label='Features'
            keyPrefix={`${result.id}-feature`}
          />
          <MetadataList
            className='hidden sm:block'
            data={result.features}
            searchTerm={searchTerm}
            label='Features'
            keyPrefix={`${result.id}-sm-feature`}
          />
        </div>
        <div>
          <MetadataText
            data={result.summary}
            label='Summary'
            limitLines
            searchTerm={searchTerm}
          />
        </div>
        <div
          className='px-5 py-2 bg-gray-700 rounded-md text-md self-end cursor-pointer'
          onClick={() => navigate(`/episodes/${result.id}`)}
        >
          View
        </div>
      </div>
    );
  });

  if (!searchTerm || searching) {
    return (
      <Loading/>
    );
  }

  return (
    <div className='w-full flex flex-col gap-8'>
      <SearchInput initialSearchTerm={searchTerm} showClear size='md'/>
      <div>
        Showing {searchResults.length} results for "{searchTerm}"
      </div>
      <div className='w-full max-w-5xl mx-auto flex flex-col gap-6'>
        {searchResultsMarkup}
      </div>
    </div>
  );
};

export default Search;