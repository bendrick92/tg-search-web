import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className='my-20 flex flex-col gap-3 items-center'>
      <div className='flex flex-row gap-1 items-center justify-center text-sm text-gray-400'>
        <span>Built with </span>
        <FontAwesomeIcon icon={faHeart} className='text-red-500'/>
        <span>by</span>
        <a href='https://bpwalters.com' target='_blank' rel='noreferrer' className='font-bold'>Ben Walters</a>
      </div>
      <div className='my-3 mx-10 text-xs text-gray-400 text-center'>
        <span>Top Gear Search is not affiliated with or endorsed by BBC Top Gear</span>
      </div>
    </footer>
  );
};

export default Footer;