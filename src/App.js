import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import SimpleCRUD from './Components/SimpleCRUD';
import ManualCRUD from './Components/ManualCRUD';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/SimpleCRUD' exact Component={SimpleCRUD} />
          <Route path='/Cars' exact Component={ManualCRUD} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
