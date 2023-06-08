import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className='w-full min-h-screen flex flex-col bg-slate-800 text-white'>
      <div className='max-w-full md:max-w-5xl px-8 mx-auto flex-1 flex flex-col'>
        <Header/>
        <main className='min-w-full w-full mt-10 grow'>
          {children}
        </main>
        <Footer/>
      </div>
    </div>
  );
};

export default Layout;