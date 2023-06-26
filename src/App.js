import {Route, Routes} from 'react-router-dom';
import {Episode, Home, NotFound, Search} from './containers';
import {Layout} from './components';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Layout showHeader={false}/>}>
        <Route index element={<Home/>}/>
      </Route>
      <Route path='/' element={<Layout/>}>
        <Route path='/episodes/search' element={<Search/>}/>
        <Route path='/episodes/:id' element={<Episode/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Route>
    </Routes>
  );
}

export default App;
