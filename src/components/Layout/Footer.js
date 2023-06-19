import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer>
      <div className='py-10 flex flex-row gap-1 items-center justify-center text-sm'>
        <span>Built with </span>
        <FontAwesomeIcon icon={faHeart} className='text-red-600'/>
        <span>by</span>
        <a href='https://bpwalters.com' target='_blank' rel='noreferrer'>Ben Walters</a>
      </div>
    </footer>
  );
};

export default Footer;