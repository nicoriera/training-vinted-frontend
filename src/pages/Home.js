import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../assets/pictures/banner_wide-9b45d0aa9a311c4ff6013e9cf3bc2b6646468be3d2f553192c63598685fcc177.jpeg";

import Loader from "react-loader-spinner";

const Home = () => {
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
      {isLoading ? (
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
      ) : (
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
          </div>

          <div className="offers">
            <div className="annonces">
              {data.offers.map((offer, index) => {
                return <div>{offer.product_name}</div>;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
