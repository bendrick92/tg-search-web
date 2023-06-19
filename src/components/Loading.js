import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGear} from '@fortawesome/free-solid-svg-icons';

const Loading = ({ title, subtitle }) => {
  return (
    <div className='w-full grow flex self-stretch flex-col justify-center'>
      <FontAwesomeIcon icon={faGear} size='3x' className='animate-spin mb-4'/>
      <div className='text-lg text-center'>{title ?? 'Loading...'}</div>
      <div className='text-md text-center'>{subtitle ?? ''}</div>
    </div>
  );
};

export default Loading;