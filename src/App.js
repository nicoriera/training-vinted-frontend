import "./App.css";
import "react-toggle/style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import { useDebounce } from "use-debounce/lib";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";

import Publish from "./pages/Publish";
import Cookies from "js-cookie";

export default function App() {
  const [token, setToken] = useState(Cookies.get("token") || "");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(false);
  const [debouncedSearch] = useDebounce(search, 1000);
  const [rangeValues, setRangeValues] = useState([0, 10000]);
  const [finalRangeValues, setFinalRangeValues] = useState([0, 10000]);

  const handleLogin = (token) => {
    Cookies.set("token", token);
    setToken(token);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setToken("");
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSort = (event) => {
    setSort(event.target.checked);
  };

  const handleRange = (values) => {
    setRangeValues(values);
  };

  const handleFinalRange = (values) => {
    setFinalRangeValues(values);
  };

  return (
    <Router>
      <Header
        token={token}
        handleLogout={handleLogout}
        handleSetSearch={handleSearch}
        handleSort={handleSort}
        sort={sort}
        handleRange={handleRange}
        handleFinalRange={handleFinalRange}
        rangeValues={rangeValues}
      />
      <Switch>
        <Route exact path="/">
          <Home
            search={debouncedSearch}
            rangeValues={finalRangeValues}
            sort={sort}
          />
        </Route>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/signup">
          <Signup handleLogin={handleLogin} />
        </Route>
        <Route path="/login">
          <Login handleLogin={handleLogin} />
        </Route>
        <Route path="/publish">
          <Publish token={token} />
        </Route>
      </Switch>
    </Router>
  );
}
