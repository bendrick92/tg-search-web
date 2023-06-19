import {SearchInput} from '../components';

const Home = () => {
  return (
    <div className='w-full md:w-128 grow self-center flex flex-col justify-center items-center'>
      <h1 className='mb-10 text-5xl text-center'>Top Gear Search</h1>
      <SearchInput showClear={false} size='lg'/>
    </div>
  );
};

export default Home;