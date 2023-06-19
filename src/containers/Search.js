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

      fetchEpisodes();
    }
  }, [searchParams]);

  const fetchEpisodes = () => {
    setSearching(true);

    createApiFetch(`/episodes/search?q=${searchParams.get('q')}`)
      .then(data => {
        setSearchResults(data);
      })
      .finally(() => {
        setSearching(false);
      });
  };

  const searchResultsMarkup = searchResults.map((result, ri) => {
    const hostsMarkup = result.hosts && result.hosts.map((host, hi) => {
      return (
        <li
          key={`host-${hi}`}
          className='px-2 py-1 bg-slate-800 rounded-md cursor-pointer'
          onClick={() => navigate(`/episodes/search?q=${host}`)}
        >
          {host}
        </li>
      );
    });

    const carsMarkup = result.cars && result.cars.map((car, ci) => {
      return (
        <li
          key={`car-${ci}`}
          className='px-2 py-1 bg-gray-700 rounded-md cursor-pointer'
          onClick={() => navigate(`/episodes/search?q=${car}`)}
        >
          {car}
        </li>
      );
    });

    const featuresMarkup = result.features && result.features.map((feature, fi) => {
      return (
        <li key={`feature-${fi}`}>{feature}</li>
      );
    });

    const guestsMarkup = result.guests && result.guests.map((guest, gi) => {
      return (
        <li key={`guest-${gi}`}>{guest}</li>
      );
    });

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
            key='host'
          />
          <MetadataList
            className='hidden sm:block'
            data={result.hosts}
            label='Hosts'
            key='host'
          />
        </div>
        <div>
          <MetadataList
            className='sm:hidden'
            data={result.cars}
            limit={2}
            label='Cars'
            key='car'
          />
          <MetadataList
            className='hidden sm:block'
            data={result.cars}
            label='Cars'
            key='car'
          />
        </div>
        <div>
          <MetadataList
            className='sm:hidden'
            data={result.guests}
            limit={2}
            label='Guests'
            key='guest'
          />
          <MetadataList
            className='hidden sm:block'
            data={result.guests}
            label='Guests'
            key='guest'
          />
        </div>
        <div>
          <MetadataList
            className='sm:hidden'
            data={result.features}
            limit={2}
            label='Features'
            key='feature'
          />
          <MetadataList
            className='hidden sm:block'
            data={result.features}
            label='Features'
            key='feature'
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