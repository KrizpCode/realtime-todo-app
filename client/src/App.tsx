// import { useTodoListQuery } from './generated/graphql';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import { HomePage } from './pages/HomePage/HomePage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage/ForgotPasswordPage';
import { UpdateProfilePage } from './pages/UpdateProfilePage/UpdateProfilePage';

const App = () => {
  return (
    <main className="main-wrapper">
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
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
