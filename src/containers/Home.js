import {SearchInput} from '../components';
import {Fade, Roll} from 'react-awesome-reveal';
import {useState} from 'react';

const Home = () => {
  const [easterEgg, setEasterEgg] = useState(false);

  const triggerEasterEgg = () => {
    setEasterEgg(true);

    setTimeout(() => {
      setEasterEgg(false);
    }, [2000]);
  };

  return (
    <div className='w-full md:w-128 grow self-center flex flex-col justify-center items-center'>
      <div className='mb-10 flex flex-col md:flex-row items-center gap-3'>
        <Roll direction='right' triggerOnce>
          <img src='./icon-white.png' alt='Top Gear Search' className={`w-20 sm:w-28 cursor-pointer ${easterEgg && 'animate-spin'}`} onClick={triggerEasterEgg} onMouseOver={() => setEasterEgg(true)} onMouseOut={() => setEasterEgg(false)}/>
        </Roll>
        <Fade direction='right' triggerOnce>
          <h1 className='text-5xl sm:text-6xl text-center font-tg-heading font-medium tracking-normal italic flex-nowrap'>Top Gear Search</h1>
        </Fade>
      </div>
      <SearchInput size='lg'/>
    </div>
  );
};

export default Home;