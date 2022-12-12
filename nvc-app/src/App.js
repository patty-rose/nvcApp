import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { db } from './firebase.js';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import Home from './pages/Splash';
import ConflictList from './pages/ConflictList';
// import AddConflict from './components/AddConflict';
import Error from './pages/Error';
import SharedLayout from './pages/SharedLayout';
import ConflictDetail from './pages/ConflictDetail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import EditConflict from './pages/EditConflict';
import EditNeedsStatement from './pages/EditNeedsStatement';
import EditApologyStatement from './pages/EditApologyStatement';
import TEMP from './pages/TEMP.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import SharedCreateLayout from './pages/SharedCreateLayout.js';


function App() {
  //state:
  const [mainConflictList, setMainConflictList] = useState([]);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  console.log("list:", mainConflictList);
  console.log("user:", currentUser);
  console.log("user Id:", currentUser?.uid);

  //Auth object & observer:
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // localStorage.setItem("authUser", JSON.stringify(authUser));
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
      // localStorage.removeItem("authUser");
    }
  });//if using local storage also update useState(JSON.parse(localStorage.getItem("authUser")!))

  //protected route comp:
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/' />;
    }
    return children;
  };
  
  //query firestore db for entire 'conflicts' docs:
  useEffect(() => { 
    const conflictsRef = collection(db, "conflicts");
    const queryByUidAndDate = query(
      conflictsRef,
      where("userId", "==", currentUser && currentUser.uid)
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
        const conflictsByDate = conflicts.sort(function(a,b){
          return new Date(b.conflictDate) - new Date(a.conflictDate);
        });
        setMainConflictList(conflictsByDate);
      }, 
      (error) => {
        setError(error.message);
      }
    );

    return () => unSubscribe();
  }, [currentUser]);

  //CRUD handlers:
  const handleAddingNewConflictToList = async (newConflictData) => {
      const docRef = await addDoc(collection(db, "conflicts"), newConflictData);
      return docRef;
  }

  // const handleAddingNewConflictToList2 = (newConflictData) => {
  //   addDoc(collection(db, "conflicts"), newConflictData)
  //     .then(function(docRef) {
  //       console.log("Document written with ID: ", docRef.id);
  //     })
  //     .catch(function(error) {
  //       console.error("Error adding document: ", error);
  //   });
  // }

  const handleEditingConflictInList = async (conflictToEdit) => {
    const conflictRef = doc(db, "conflicts", conflictToEdit.id);
    await updateDoc(conflictRef, conflictToEdit);
  }

  const handleDeletingConflict = async (id) => {
    await deleteDoc(doc(db, "conflicts", id));
  } 

  return(
    <BrowserRouter>
    {/* potential to wrap App component in index.js with <BrowserRouter> */}
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route index element = {<Home/>} />
            <Route path='signIn' element={<SignIn />} />
            <Route path='signUp' element={<SignUp />} />
            <Route path='*' element={<Error />} />

            <Route path='conflictList' element={<ProtectedRoute><ConflictList conflictList = {mainConflictList} /></ProtectedRoute>} />
            

            <Route path='addEvent' element={<ProtectedRoute><SharedCreateLayout userId = {currentUser?.uid} onNewConflictCreation={handleAddingNewConflictToList}/></ProtectedRoute>}>
              {/* <Route path='/addEvent/addConflict' element={<ProtectedRoute><AddConflict userId = {currentUser?.uid} onNewConflictCreation={handleAddingNewConflictToList}/></ProtectedRoute>} /> */}
            </Route>

            <Route path = 'editNeedsStatement/:conflictId' element = {<ProtectedRoute><EditNeedsStatement conflictList = {mainConflictList} onEditConflict={handleEditingConflictInList} /></ProtectedRoute>} />
            <Route path = 'editApologyStatement/:conflictId' element = {<ProtectedRoute><EditApologyStatement conflictList = {mainConflictList} onEditConflict={handleEditingConflictInList} /></ProtectedRoute>} />

            <Route path = ':conflictId' element = {<ProtectedRoute><ConflictDetail conflictList = {mainConflictList} onClickingDelete={handleDeletingConflict}/></ProtectedRoute>} />
            <Route path = 'edit/:conflictId' element = {<ProtectedRoute><EditConflict conflictList = {mainConflictList} onEditConflict={handleEditingConflictInList}/></ProtectedRoute>} />

            
            <Route 
              path='TEMP' 
              element={
              <ProtectedRoute>
                <TEMP user = {currentUser}/>
              </ProtectedRoute>
              }
            />
          </Route>

        </Routes>
    </BrowserRouter>
  );
}

export default App;
