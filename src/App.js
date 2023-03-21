import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import Practice from './Practice';
import FindMatches from './FindMatches';
import LoginForm from './LoginPage/LoginForm';





function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="HomePage" element={<HomePage />} />
        <Route path="Practice" element={<Practice />} />
        <Route path="FindMatches" element={<FindMatches />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;





