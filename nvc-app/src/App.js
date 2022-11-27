import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './pages/Splash';
import ConflictList from './pages/ConflictList';
import AddConflict from './pages/AddConflict';
import Error from './pages/Error';
import SharedLayout from './pages/SharedLayout';
import ConflictDetail from './pages/ConflictDetail';
import Login from './pages/Login';

function App() {

  const [mainConflictList, setMainConflictList] = useState([]);

  const handleAddingNewConflictToList = (newConflict) => {
    const newMainConflictList = mainConflictList.concat(newConflict);
    setMainConflictList({ newMainConflictList});
  }

  return(
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<SharedLayout />}>
          <Route index element = {<Home/>} />

          <Route path='conflictList' element={<ConflictList conflictList = {mainConflictList} />} />
          <Route path='addConflict' element={<AddConflict onNewConflictCreation={handleAddingNewConflictToList}/>} />
          <Route path='ConflictDetail' element={<ConflictDetail />} />

          <Route path='login' element={<Login />} />
          <Route path='*' element={<Error />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
