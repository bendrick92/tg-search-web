import {useNavigate} from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <div className='flex flex-row justify-center'>
        <h1 className='py-8 mx-5 text-4xl hover:cursor-pointer' onClick={() => navigate('/')}>
          Top Gear Search
        </h1>
      </div>
    </header>
  );
};

export default Header;