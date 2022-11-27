import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Splash';
import ConflictList from './pages/ConflictList';
import AddConflict from './pages/AddConflict';
import Error from './pages/Error';
import SharedLayout from './pages/SharedLayout';
import ConflictDetail from './pages/ConflictDetail';
import Login from './pages/Login';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mainConflictList: [],
      selectedConflict: null,
      editing: false
    };
  }

  handleAddingNewConflictToList = (newConflict) => {
    const newMainConflictList = this.state.mainConflictList.concat(newConflict);
    this.setState({mainConflictList: newMainConflictList});
  }

  render(){

    return(
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<SharedLayout />}>
            <Route index element = {<Home/>} />

            <Route path='conflictList' element={<ConflictList conflictList = {this.state.mainConflictList} />} />
            <Route path='addConflict' element={<AddConflict onNewConflictCreation={this.handleAddingNewConflictToList}/>} />
            <Route path='ConflictDetail' element={<ConflictDetail />} />

            <Route path='login' element={<Login />} />
            <Route path='*' element={<Error />} />
          </Route>

        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
