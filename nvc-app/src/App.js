import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { db } from './firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, where, orderBy } from "firebase/firestore";
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
  //state:
  const [mainConflictList, setMainConflictList] = useState([]);
  const [error, setError] = useState(null);
  const [currentUid, setCurrentUid] = useState(null);

  console.log(mainConflictList);

  //Auth object & observer:
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    console.log(mainConflictList);
    if (user) {
      setCurrentUid(user.uid);
    } else {
      setCurrentUid(null);
    }
  });
  //query firestore db for entire 'conflicts' docs:
  useEffect(() => { 
    const conflictsRef = collection(db, "conflicts");
    const queryByUidAndDate = query(
      conflictsRef,
      where("userId", "==", currentUid)
    );

    const unSubscribe = onSnapshot(
      queryByUidAndDate, 
      (querySnapshot) => {
        const conflicts = [];
        querySnapshot.forEach((doc) => {
            conflicts.push({
              title: doc.data().title,
              description: doc.data().description, 
              feeling: doc.data().feeling, 
              need: doc.data().need,
              needsStatement: doc.data().needsStatement,
              apologyStatement: doc.data().apologyStatement, 
              id: doc.id,
              conflictDate: doc.data().conflictDate,
              userId: doc.data().userId
            });
        });
        setMainConflictList(conflicts);
      }, 
      (error) => {
        setError(error.message);
      }
    );

    return () => unSubscribe();
  }, [currentUid]);

  //CRUD handlers:
  const handleAddingNewConflictToList = async (newConflictData) => {
    await addDoc(collection(db, "conflicts"), newConflictData);
  }

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
          <Route path='addConflict' element={<AddConflict userId = {currentUid} onNewConflictCreation={handleAddingNewConflictToList}/>} />

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
