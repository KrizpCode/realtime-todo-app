import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import { HomePage } from './pages/HomePage/HomePage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { TodoPage } from './pages/TodoPage/TodoPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage/ForgotPasswordPage';
import { UpdateProfilePage } from './pages/UpdateProfilePage/UpdateProfilePage';
import NavBar from './components/NavBar/NavBar';

const App = () => {
  return (
    <main className="main-wrapper">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/todo/:id' component={TodoPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/registration' component={RegistrationPage} />
          <Route path='/forgot-password' component={ForgotPasswordPage} />
          <Route path='/update-profile' component={UpdateProfilePage} />
        </Switch>
      </Router>
    </main>
  );
}

export default App;
