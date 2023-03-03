import './App.css';
import { Home } from './components/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PostBlog } from './components/postBlog';
import { Details } from './components/details';
import { BlogContextProvider } from './components/context';
import './components/style.css'
import {LogIn} from './components/login'
import {Register} from './components/register'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BlogContextProvider>
          <Routes>
            <Route path='/' element={<LogIn />} />
            <Route path='/register' element={<Register />} />
            <Route path='/home' element={<Home />} />
            <Route path='/details' element={<Details />} />
            <Route path='/postBlog' element={<PostBlog />} />
          </Routes>
        </BlogContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
