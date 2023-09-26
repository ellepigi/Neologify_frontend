
import './App.css';
import Nav from './Navbar/Navbar';
import Section from './Section/Section';
import Create from './Create/Create';
import Footer from './Footer/Footer';
import Details from './Details/Details';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Section />} />
          <Route path="/create" element={<Create />} />
          <Route path="/contact" element={<Section />} />
          <Route path="/details/:cardId" element={<Details />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
