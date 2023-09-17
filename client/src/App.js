import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout'; 
import Register from './components/register';
import Login from './components/login';
import { UserContextProvider } from './UserContext';
import CreatePost from './components/createPost';
import BlogPage from './components/blogPage';
import PostPage from './components/postPage';
import EditPost from './components/editPost';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<BlogPage />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/create'} element={<CreatePost />} />
          <Route path={'/post/:id'} element={<PostPage />} />
          <Route path={'/edit/:id'} element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
