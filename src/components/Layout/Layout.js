import Header from './Header';
import Footer from './Footer';
import {Outlet} from 'react-router-dom';

const Layout = ({ showHeader = true }) => {
  return (
    <div className='w-full min-h-screen flex flex-col bg-tg-background text-tg-white'>
      <div className='flex-1 flex flex-col'>
        {showHeader && <Header/>}
        <main className='max-w-full md:max-w-3xl w-full px-8 mx-auto mt-5 grow flex flex-col'>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  );
};

export default Layout;