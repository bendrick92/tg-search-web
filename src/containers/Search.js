import {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {Loading, MetadataList, MetadataText, SearchInput} from '../components';
import {createApiFetch} from '../helpers';

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchParams && searchParams.get('q')) {
      setSearchTerm(searchParams.get('q'));

      setSearching(true);

      createApiFetch(`/episodes/search?q=${searchParams.get('q')}`)
        .then(data => {
          setSearchResults(data);
        })
        .finally(() => {
          setSearching(false);
        });
    }
  }, [searchParams]);

  const searchResultsMarkup = searchResults.map((result, ri) => {
    return (
      <div key={`search-result-${ri}}`} className='w-full p-4 flex flex-col gap-4'>
        <h3
          className='text-xl cursor-pointer'
          onClick={() => navigate(`/episodes/${result.id}`)}
        >
          {result.title}
        </h3>
        <div>
          <MetadataList
            className='sm:hidden'
            data={result.hosts}
            limit={1}
            label='Hosts'
            keyPrefix={`${result.id}-host`}
          />
          <MetadataList
            className='hidden sm:block'
            data={result.hosts}
            label='Hosts'
            keyPrefix={`${result.id}-sm-host`}
          />
        </div>
        <div>
          <MetadataList
            className='sm:hidden'
            data={result.cars}
            limit={2}
            label='Cars'
            keyPrefix={`${result.id}-car`}
          />
          <MetadataList
            className='hidden sm:block'
            data={result.cars}
            label='Cars'
            keyPrefix={`${result.id}-sm-car`}
          />
        </div>
        <div>
          <MetadataList
            className='sm:hidden'
            data={result.guests}
            limit={2}
            label='Guests'
            keyPrefix={`${result.id}-guest`}
          />
          <MetadataList
            className='hidden sm:block'
            data={result.guests}
            label='Guests'
            keyPrefix={`${result.id}-sm-guest`}
          />
        </div>
        <div>
          <MetadataList
            className='sm:hidden'
            data={result.features}
            limit={2}
            label='Features'
            keyPrefix={`${result.id}-feature`}
          />
          <MetadataList
            className='hidden sm:block'
            data={result.features}
            label='Features'
            keyPrefix={`${result.id}-sm-feature`}
          />
        </div>
        <div>
          <MetadataText
            data={result.summary}
            label='Summary'
            limitLines
          />
        </div>
        <div className='px-3 py-2 bg-tg-gray rounded-md text-sm self-end cursor-pointer'>
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
    <div className='w-full flex flex-col'>
      <SearchInput initialSearchTerm={searchTerm} showClear size='md'/>
      <div className='w-full max-w-5xl mx-auto mt-8 flex flex-col gap-8'>
        {searchResultsMarkup}
      </div>
    </div>
  );
};

export default Search;