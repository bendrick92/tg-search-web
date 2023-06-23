import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {createApiFetch} from '../helpers';
import {Loading, MetadataList, MetadataText} from '../components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import Alert from '../components/Alert';
import NotFound from './NotFound';

const Episode = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);

      createApiFetch(`/episodes/${id}`)
        .then(data => {
          setEpisode(data);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const errorMarkup = (
    <Alert
      type='error'
      message='Oops, something went wrong!'
      show={error}
      dismiss={() => setError(false)}
    />
  );

  if (loading) {
    return (
      <Loading/>
    );
  }

  if (!episode && !loading) {
    return (
      <NotFound/>
    );
  }

  return (
    <>
      <div className='w-full flex flex-col gap-4'>
        <span className='text-gray-400 cursor-pointer' onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} size='sm' className='mr-2'/>
          Back
        </span>
        <h2 className='text-xl'>{episode.title}</h2>
        <div>
          <MetadataList data={episode.hosts} label='Hosts' key='host'/>
        </div>
        <div>
          <MetadataList data={episode.cars} label='Cars' key='car'/>
        </div>
        <div>
          <MetadataList data={episode.guests} label='Guests' key='guest'/>
        </div>
        <div>
          <MetadataList data={episode.features} label='Features' key='feature'/>
        </div>
        <div>
          <MetadataText data={episode.summary} label='Summary'/>
        </div>
      </div>
      {errorMarkup}
    </>
  );
};

export default Episode;