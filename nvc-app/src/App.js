import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import db from './firebase.js';
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import Home from './pages/Splash';
import ConflictList from './pages/ConflictList';
import AddConflict from './pages/AddConflict';
import Error from './pages/Error';
import SharedLayout from './pages/SharedLayout';
import ConflictDetail from './pages/ConflictDetail';
import Login from './pages/Login';

function App() {

  const [mainConflictList, setMainConflictList] = useState([]);
  const [error, setError] = useState(null);

  const handleAddingNewConflictToList = async (newConflictData) => {
    await addDoc(collection(db, "conflicts"), newConflictData);
  }

  useEffect(() => { 
    const unSubscribe = onSnapshot(
      collection(db, "conflicts"), 
      (collectionSnapshot) => {
        const conflicts = [];
        collectionSnapshot.forEach((doc) => {
            conflicts.push({
              description: doc.data().description, 
              feeling: doc.data().feeling, 
              need: doc.data().need, 
              id: doc.id
            });
        });
        setMainConflictList(conflicts);
      }, 
      (error) => {
        setError(error.message);
      }
    );

    return () => unSubscribe();
  }, []);

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
