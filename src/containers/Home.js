import {SearchInput} from '../components';

const Home = () => {
  return (
    <div className='w-full md:w-128 grow self-center flex flex-col justify-center items-center'>
      <div className='mb-10 flex flex-col md:flex-row items-center gap-3'>
        <img src='./icon-white.png' alt='Top Gear Search' className='w-20 sm:w-28'/>
        <h1 className='text-5xl sm:text-6xl text-center font-tg-heading font-medium tracking-normal italic flex-nowrap'>Top Gear Search</h1>
      </div>
      <SearchInput showClear={false} size='lg'/>
    </div>
  );
};

export default Home;