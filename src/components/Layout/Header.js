import {useNavigate} from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <div className='flex flex-row justify-center items-center gap-2'>
        <img src='../icon-white.png' alt='Top Gear Search' width='50px' className='cursor-pointer' onClick={() => navigate('/')}/>
        <h1 className='py-8 text-4xl font-tg-heading italic cursor-pointer' onClick={() => navigate('/')}>
          Top Gear Search
        </h1>
      </div>
    </header>
  );
};

export default Header;