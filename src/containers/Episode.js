import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {createApiFetch} from '../helpers';
import {Loading, MetadataList, MetadataText} from '../components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

const Episode = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchEpisode();
    }
  }, [id]);

  const fetchEpisode = () => {
    setLoading(true);

    createApiFetch(`/episodes/${id}`)
      .then(data => {
        setEpisode(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!episode || loading) {
    return (
      <Loading/>
    );
  }

  return (
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
  );
};

export default Episode;