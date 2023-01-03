import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import Home from "./pages/Splash";
import ConflictList from "./pages/ConflictList";
import Error from "./pages/Error";
import SharedLayout from "./components/SharedLayout";
import ConflictDetail from "./pages/ConflictDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EditConflict from "./pages/EditConflict";
import EditNeedsStatement from "./pages/EditNeedsStatement";
import EditApologyStatement from "./pages/EditApologyStatement";
import TEMP from "./pages/TEMP.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AddConflictForm from "./pages/AddConflictForm.js";

function App() {
  //state:
  const [mainConflictList, setMainConflictList] = useState([]);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  //Auth object & observer:
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });

  //protected route component:
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />;
    }
    return children;
  };

  //dotnet backend database query:
  const [isLoaded, setIsLoaded] = useState(false);
  const [dotnetConflictList, setDotnetConflictList] = useState([]);

  useEffect(() => {
    fetch(`api/conflicts?userId=${currentUser && currentUser.uid}`)
      .then((response) => response.json())
      .then((jsonifiedResponse) => {
        setDotnetConflictList(jsonifiedResponse);
        setIsLoaded(true);
        console.log("jsonified response:", jsonifiedResponse);
        console.log("temp conflicts:", dotnetConflictList);
        console.log("main conflicts list:", mainConflictList);
      })
      .catch((error) => {
        setError(error);
        setIsLoaded(true);
      });
  }, [currentUser, ConflictList]);

  //dotnet backend CRUD handlers:

  //CRUD handlers:
  const handleAddingNewConflictToList = async (newConflict) => {
    fetch("/api/conflicts", {
      method: "POST",
      body: JSON.stringify(newConflict),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((jsonifiedResponse) => {
        console.log("new conflict added:", jsonifiedResponse);
        const newList = dotnetConflictList.concat(jsonifiedResponse);
        setDotnetConflictList(newList);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleDeletingConflict = async (conflictId) => {
    fetch("/api/conflicts/" + conflictId, {
      method: "Delete"
    })
      .then((response) => {
        response.json()
      })
      .then((jsonifiedResponse) => {
        const newList = dotnetConflictList.filter((conflict) => conflict.conflictId != conflictId);
        setDotnetConflictList(newList);
        console.log("deleted:", jsonifiedResponse);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleEditingConflictInList = async (conflictToEdit) => {
    const conflictRef = doc(db, "conflicts", conflictToEdit.id);
    await updateDoc(conflictRef, conflictToEdit);
  };

  const handleDeletingConflict2 = async (id) => {
    await deleteDoc(doc(db, "conflicts", id));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout user={currentUser} />}>
          <Route index element={<Home />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="*" element={<Error />} />

          <Route
            path="temp"
            element={<TEMP userId={currentUser && currentUser.uid} />}
          />

          <Route
            path="conflictList"
            element={
              <ProtectedRoute>
                <ConflictList
                  conflictList={dotnetConflictList}
                  tempList={dotnetConflictList}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="addEvent"
            element={
              <ProtectedRoute>
                <AddConflictForm
                  userId={currentUser?.uid}
                  onNewConflictCreation={handleAddingNewConflictToList}
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path=":thisConflictId"
            element={
              <ProtectedRoute>
                <ConflictDetail
                  conflictList={dotnetConflictList}
                  onClickingDelete={handleDeletingConflict}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="edit/:conflictId"
            element={
              <ProtectedRoute>
                <EditConflict
                  conflictList={dotnetConflictList}
                  onEditConflict={handleEditingConflictInList}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="editNeedsStatement/:conflictId"
            element={
              <ProtectedRoute>
                <EditNeedsStatement
                  conflictList={dotnetConflictList}
                  onEditConflict={handleEditingConflictInList}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="editApologyStatement/:conflictId"
            element={
              <ProtectedRoute>
                <EditApologyStatement
                  conflictList={dotnetConflictList}
                  onEditConflict={handleEditingConflictInList}
                />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
