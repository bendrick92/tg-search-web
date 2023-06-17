import {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {SearchInput} from '../components';
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
        <div key={`host-${hi}`}>{host}</div>
      );
    });

    const carsMarkup = result.cars && result.cars.map((car, ci) => {
      return (
        <div key={`car-${ci}`}>{car}</div>
      );
    });

    const featuresMarkup = result.features && result.features.map((feature, fi) => {
      return (
        <div key={`feature-${fi}`}>{feature}</div>
      );
    });

    const guestsMarkup = result.guests && result.guests.map((guest, gi) => {
      return (
        <div key={`guest-${gi}`}>{guest}</div>
      );
    });

    return (
      <div key={`search-result-${ri}}`} className='w-full p-4 bg-slate-600 rounded-lg flex flex-col gap-4'>
        <h3 className='text-lg'>{result.title}</h3>
        <div className='flex flex-row gap-2'>
          {hostsMarkup}
        </div>
        <div className='flex flex-row gap-2'>
          {carsMarkup}
        </div>
        <div className='flex flex-row gap-2'>
          {guestsMarkup}
        </div>
        <div className='flex flex-row gap-2'>
          {featuresMarkup}
        </div>
        <div>
          {result.summary}
        </div>
      </div>
    );
  });

  if (!searchTerm || searching) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className='w-full flex flex-col justify-center'>
      <SearchInput initialSearchTerm={searchTerm}/>
      <div className='pb-10 text-center flex flex-row'>
        Showing {searchResults.length} results for "{searchParams.get('q')}"
        <div className='text-slate-300 hover:cursor-pointer' onClick={() => navigate('/')}>Clear</div>
      </div>
      <div className='w-full max-w-2xl mx-auto flex flex-col gap-5'>
        {searchResultsMarkup}
      </div>
    </div>
  );
};

export default Search;