import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Splash';
import Events from './pages/Events';
import AddEvent from './pages/AddEvent';
import Error from './pages/Error';
import SharedLayout from './pages/SharedLayout';
import Event from './pages/Event';
import Login from './pages/Login';

function App() {


  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<SharedLayout />}>
          <Route index element = {<Home/>} />

          <Route path='events' element={<Events />} />
          <Route path='addEvent' element={<AddEvent />} />
          <Route path='event' element={<Event />} />

          <Route path='login' element={<Login />} />
          <Route path='*' element={<Error />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
