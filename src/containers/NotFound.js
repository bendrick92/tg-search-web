import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {AttentionSeeker} from 'react-awesome-reveal';

const NotFound = () => {
  return (
    <div className='w-full min-h-full grow flex flex-col items-center justify-center gap-5'>
      <h1 className='text-3xl'><span className='font-black'>404</span> <span className='font-light'>Not Found</span></h1>
      <AttentionSeeker effect='wobble'>
        <FontAwesomeIcon icon={faSearch} size='2x' className='text-gray-300'/>
      </AttentionSeeker>
      <h2 className='text-md italic font-light'>These are not the cars you're looking for...</h2>
    </div>
  );
};

export default NotFound;