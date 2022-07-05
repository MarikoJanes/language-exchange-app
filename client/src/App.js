import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import TitlePage from "./components/TitlePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Mypage from "./components/Mypage";
import SearchResult from "./components/SearchResult";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/authorized_user")
    .then(res => res.json())
    .then(data => {
      if (data.id) {
        setIsAuthenticated(true);
        setUser(data);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    })
  }, [])


  return (
    <>
        <NavBar setIsAuthenticated={setIsAuthenticated} setUser={setUser} isAuthenticated={isAuthenticated}/>
        <Switch>
          <Route exact path="/signup">
            <Signup setIsAuthenticated={setIsAuthenticated} setUser={setUser}/>
          </Route>
          <Route exact path="/login">
            <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser}/>
          </Route>
          <Route exact path="/settings">
            <Profile user={user} setUser={setUser} />
          </Route>
          <Route exact path="/mypage">
            <Mypage user={user}/>
          </Route>
          <Route exact path="/search/:searchedTerm">
            <SearchResult />
          </Route>
          <Route exact path="/">
            <TitlePage user={user} />
          </Route>
        </Switch>
    </>
  );
}

export default App;