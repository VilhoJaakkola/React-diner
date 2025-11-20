import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Foods from "./foods/pages/Foods";
import AddFood from "./foods/pages/AddFood";
import Users from "./users/pages/Users";
import Authenticate from "./users/pages/Authenticate";
import MainNavigation from "./shared/MainNavigation/MainNavigation";

import { AuthContextProvider } from "./shared/context/AuthContextProvider";
import { useAuthContext } from "./shared/context/auth-context";

import "./App.css";
import EditFood from "./foods/pages/EditFood";

const queryClient = new QueryClient();

function AppContent() {
  //use the custom hook to get access to the context
  const { token } = useAuthContext();

  let routes;

  if (token) {
    //if token is true, there is a logged in user
    routes = (
      <Switch>
        <Route path="/" exact>
          <Foods />
        </Route>
        <Route path="/foods/new" exact>
          <AddFood />
        </Route>
        <Route path="/foods/edit/:id" component={EditFood}></Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Foods />
        </Route>
        <Route path="/auth">
          <Authenticate />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Router>
      <MainNavigation />
      <main>{routes}</main>
    </Router>
  );
}

function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
