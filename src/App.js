import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";

import axios from "axios";
import { useState, useEffect } from "react";

import Banner from "./assets/pictures/banner_wide-9b45d0aa9a311c4ff6013e9cf3bc2b6646468be3d2f553192c63598685fcc177.jpeg";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/offer">Offer</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/offer">
            <Offer />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://lereacteur-vinted-api.herokuapp.com/offers"
    );
    console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Header />
      <div className="site">
        <div className="block">
          <div className="block-background">
            <div className="images">
              <img src={Banner} alt="banner" />
            </div>
          </div>
          <div className="block-accroche">
            <h2>Prêt à faire du tri dans vos placards ?</h2>
            <button>Vends maintenent</button>
            <div>Découvrir comment ça marche</div>
          </div>
          <div>
            {isLoading ? (
              <div>loading...</div>
            ) : (
              <div className="annonces">{data.count}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Offer() {
  return (
    <div>
      <Header />
    </div>
  );
}
