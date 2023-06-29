import {AttentionSeeker} from 'react-awesome-reveal';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBomb} from '@fortawesome/free-solid-svg-icons';

const Error = () => {
  return (
    <div className='w-full min-h-full grow flex flex-col items-center justify-center gap-5'>
      <h1 className='text-3xl'><span className='font-black'>500</span> <span className='font-light'>Not Found</span></h1>
      <AttentionSeeker effect='wobble'>
        <FontAwesomeIcon icon={faBomb} size='4x' className='text-gray-300'/>
      </AttentionSeeker>
      <h2 className='text-md italic'>Oops, something went kaboom!</h2>
      <div className='font-light'>Please refresh the page or go back and try again.</div>
    </div>
  );
};

export default Error;