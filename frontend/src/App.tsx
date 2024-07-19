import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import PageLayout from './Layout/PageLayout';
import NotesPage from './pages/NotesPage';
import AuthPage from './pages/AuthPage';
import { useAuthContext } from './hooks/useAuthContext';

const App : React.FC =  () => {

  const { user } = useAuthContext()

  console.log(user)
  return (
    <>
      <div className="main-container">
      <PageLayout>
        <Routes>
          <Route path="/" element={user ?  <NotesPage/> : <Navigate to="/authentication"/> }/>
          <Route path="/authentication" element={!user ? <AuthPage/> : <Navigate to="/"/> }/>
        </Routes>
      </PageLayout>
      </div>
    </>


  );
}

export default App;
