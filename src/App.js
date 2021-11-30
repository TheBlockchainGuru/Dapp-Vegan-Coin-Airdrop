import React, {Component} from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import Home1 from './pages/Home1';

class App extends Component {

  render () {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/home1" element={<Home1 />}  /> */}
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;
