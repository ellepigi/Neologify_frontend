
import './App.css';
import Nav from './Navbar/Navbar';
import Section from './Section/Section';
import Create from './Create/Create';
import Footer from './Footer/Footer';
import Details from './Details/Details';
import Tags from './pages/Tags/Tags';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TagList from './pages/TagList';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Section />} />
          <Route path="/create" element={<Create />} />
          <Route path="/contact" element={<Section />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/tag/:tagName" element={<TagList/>} />
          <Route path="/details/:cardId" element={<Details />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
