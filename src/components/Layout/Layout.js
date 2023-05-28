import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className='w-full h-full bg-slate-800 text-white'>
      <div className='max-w-full md:max-w-5xl h-full px-8 mx-auto flex flex-col'>
        <Header/>
        <main className='min-w-full w-full grow'>
          {children}
        </main>
        <Footer/>
      </div>
    </div>
  );
};

export default Layout;