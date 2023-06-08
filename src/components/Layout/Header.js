import {useNavigate} from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <div className='py-10'>
        <h1 className='text-4xl text-center hover:cursor-pointer' onClick={() => navigate('/')}>Top Gear Search</h1>
      </div>
    </header>
  );
};

export default Header;