import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { AppLayoutRoute } from './layouts/AppLayoutRoute';
import { ChatListPage } from './pages/ChatListPage';
import { ChatPage } from './pages/ChatPage';
import { SettingsPage } from './pages/SettingsPage';
import { UsersPage } from './pages/UsersPage';
import { Provider } from 'react-redux';
import { store } from './store';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import ws from './socket';
import { useEffect } from 'react';

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/signup">
              <SignUpPage />
            </Route>
            <AppLayoutRoute path="/" exact secure>
              <ChatListPage />
            </AppLayoutRoute>
            <AppLayoutRoute path="/chat/:username" hideAppBar secure>
              <ChatPage />
            </AppLayoutRoute>
            <AppLayoutRoute path="/users" secure>
              <UsersPage />
            </AppLayoutRoute>
            <AppLayoutRoute path="/settings" secure>
              <SettingsPage />
            </AppLayoutRoute>
          </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
