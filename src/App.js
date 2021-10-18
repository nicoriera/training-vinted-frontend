import "./App.css";
import "react-toggle/style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import { useDebounce } from "use-debounce/lib";
import Cookies from "js-cookie";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

import Header from "./components/Header";

export default function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);
  const [rangeValues, setRangeValues] = useState([0, 500]);
  const [finalRangeValues, setFinalRangeValues] = useState([0, 500]);

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else setToken(null);
    Cookies.remove("token");
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
    <div>
      <Router>
        <Header
          token={token}
          setUser={setUser}
          handleSearch={handleSearch}
          handleSort={handleSort}
          sort={sort}
          handleRange={handleRange}
          handleFinalRange={handleFinalRange}
          rangeValues={rangeValues}
          search={search}
        />
        <Switch>
          <Route exact path="/">
            <Home
              search={debouncedSearch}
              rangeValues={finalRangeValues}
              sort={sort}
            />
          </Route>
          <Route path="/signup">
            <Signup setUser={setUser} />
          </Route>
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/publish">
            <Publish token={token} />
          </Route>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          <Route path="/payment">
            <Payment token={token} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
