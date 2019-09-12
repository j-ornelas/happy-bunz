import React from 'react';
import { Admin } from './components/Admin';
// import ComingSoon from './components/ComingSoon';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Admin} />
      <Route path="/admin" component={Admin} />
    </Router>
  );
}

export default App;
