import {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {Loading, MetadataList, MetadataText, SearchInput} from '../components';
import Error from './Error';
import {createApiFetch} from '../helpers';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';

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
        <div className='flex flex-col gap-3'>
          <div className='flex flex-row items-center gap-2' onClick={() => navigate(`/episodes/${result.id}`)}>
            <h3 className='mb-0 text-2xl uppercase font-black leading-5 cursor-pointer underline underline-offset-4 decoration-2 decoration-teal-600 hover:decoration-teal-500'>
              {result.title}
            </h3>
          </div>
          <div className='text-gray-400 text-sm'>Originally aired {result.airDate}</div>
        </div>
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
          className='px-6 py-2 bg-teal-600 rounded-md text-md self-end cursor-pointer hover:bg-teal-500 flex flex-row items-center gap-2'
          onClick={() => navigate(`/episodes/${result.id}`)}
        >
          <span>Details</span>
          <FontAwesomeIcon icon={faChevronRight} size='xs'/>
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
      <SearchInput initialSearchTerm={searchTerm} size='md'/>
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