import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase.js';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, serverTimestamp  } from "firebase/firestore";
import Home from './pages/Splash';
import ConflictList from './pages/ConflictList';
import AddConflict from './pages/AddConflict';
import Error from './pages/Error';
import SharedLayout from './pages/SharedLayout';
import ConflictDetail from './pages/ConflictDetail';
import Login from './pages/Login';
import EditConflict from './pages/EditConflict';
import EditNeedsStatement from './pages/EditNeedsStatement';
import EditApologyStatement from './pages/EditApologyStatement';

function App() {

  console.log(userCredential);

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
              title: doc.data().title,
              description: doc.data().description, 
              feeling: doc.data().feeling, 
              need: doc.data().need,
              needsStatement: doc.data().needsStatement,
              apologyStatement: doc.data().apologyStatement, 
              id: doc.id,
              conflictDate: doc.data().conflictDate
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

  const handleEditingConflictInList = async (conflictToEdit) => {
    const conflictRef = doc(db, "conflicts", conflictToEdit.id);
    await updateDoc(conflictRef, conflictToEdit);
  }

  const handleDeletingConflict = async (id) => {
    await deleteDoc(doc(db, "conflicts", id));
  } 

  return(
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<SharedLayout />}>
          <Route index element = {<Home/>} />

          <Route path='conflictList' element={<ConflictList conflictList = {mainConflictList} />} />
          <Route path='addConflict' element={<AddConflict onNewConflictCreation={handleAddingNewConflictToList}/>} />

          <Route path = 'editNeedsStatement/:conflictId' element = {<EditNeedsStatement conflictList = {mainConflictList} onEditConflict={handleEditingConflictInList} />} />
          <Route path = 'editApologyStatement/:conflictId' element = {<EditApologyStatement conflictList = {mainConflictList} onEditConflict={handleEditingConflictInList} />} />

          <Route path = ':conflictId' element = {<ConflictDetail conflictList = {mainConflictList} onClickingDelete={handleDeletingConflict}/>} />
          <Route path = 'edit/:conflictId' element = {<EditConflict conflictList = {mainConflictList} onEditConflict={handleEditingConflictInList}/>} />

          <Route path='login' element={<Login />} />
          <Route path='*' element={<Error />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
