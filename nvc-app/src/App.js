import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { db } from "./firebase.js";
import { doc, updateDoc } from "firebase/firestore";
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
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dotnetConflictList, setDotnetConflictList] = useState([]);

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
  useEffect(() => {
    fetch(`api/conflicts?userId=${currentUser && currentUser.uid}`)
      .then((response) => response.json())
      .then((jsonifiedResponse) => {
        setDotnetConflictList(jsonifiedResponse);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, [currentUser]);

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
        const newList = dotnetConflictList.concat(jsonifiedResponse);
        setDotnetConflictList(newList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeletingConflict = async (conflictId) => {
    fetch("/api/conflicts/" + conflictId, {
      method: "Delete",
    })
      .then((response) => response.json())
      .then(() => {
        const newList = dotnetConflictList.filter(
          (conflict) => conflict.conflictId != conflictId
        );
        setDotnetConflictList(newList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditingConflict = async (conflictToEdit) => {
    fetch("/api/conflicts/" + conflictToEdit.conflictId, {
      method: "PUT",
      body: JSON.stringify(conflictToEdit),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json();
      })
      .then(() => {
        const newList = dotnetConflictList
          .filter(
            (conflict) => conflict.conflictId != conflictToEdit.conflictId
          )
          .concat(conflictToEdit);
        setDotnetConflictList(newList);
      })
      .catch((error) => {
        console.log(error);
      });
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
            path="edit/:thisConflictId"
            element={
              <ProtectedRoute>
                <EditConflict
                  conflictList={dotnetConflictList}
                  onEditConflict={handleEditingConflict}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="editNeedsStatement/:thisConflictId"
            element={
              <ProtectedRoute>
                <EditNeedsStatement
                  conflictList={dotnetConflictList}
                  onEditConflict={handleEditingConflict}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="editApologyStatement/:thisConflictId"
            element={
              <ProtectedRoute>
                <EditApologyStatement
                  conflictList={dotnetConflictList}
                  onEditConflict={handleEditingConflict}
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
