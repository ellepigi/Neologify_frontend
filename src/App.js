import "./App.css";
import Nav from "./components/Navbar/Navbar";
import Section from "./pages/Section/Section";
import Create from "./pages/Create/Create"
import FooterSection from "./components/Footer/Footer";
import Details from "./pages/Details/Details"
import Tags from "./pages/Tags/Tags";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TagList from "./pages/TagList";
import Profile from "./pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import { Helmet } from 'react-helmet';



function App() {
  return (
    <div className="App">
       <Helmet>
        <title>Neologify</title>
      </Helmet>
      <Router>
        <Nav />
        <Routes>
          <Route
            path="/profile/*"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Section />} />
          <Route path="/create" element={<Create />} />
          <Route path="/contact" element={<Section />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/tag/:tagName" element={<TagList />} />
          <Route path="/details/:cardId" element={<Details />} />
        </Routes>
        <FooterSection></FooterSection>
      </Router>
    </div>
  );
}

export default App;
