import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Home, NotFound, Search} from './containers';
import {Layout} from './components';

function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/search' element={<Search/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
