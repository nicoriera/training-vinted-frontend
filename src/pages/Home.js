import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../assets/pictures/banner_wide-9b45d0aa9a311c4ff6013e9cf3bc2b6646468be3d2f553192c63598685fcc177.jpeg";
import Forme from "../assets/pictures/tear.42d6cec6.svg";
import * as qs from "qs";
import Loader from "react-loader-spinner";
import { Link, useLocation } from "react-router-dom";

import Card from "../components/Card";

const Home = (props) => {
  var sectionStyle = {
    backgroundImage: `url(${Banner})`,
  };

  const { search, sort, rangeValues } = props;
  const location = useLocation();
  qs.parse(location.search.substring(1)); // transforme "?page=1" en objet {page:1}

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = qs.stringify({
        title: search,
        priceMin: rangeValues[0],
        priceMax: rangeValues[1],
        sort: sort ? "price-asc" : "prise-desc",
      });
      const results = await axios.get(
        `https://vinted-backend-nicolas.herokuapp.com/offers?${queryParams}`
      );
      console.log(results);
      setData(results.data);
      setIsLoading(false);
    };

    fetchData();
  }, [search, rangeValues, sort]);

  return (
    <div>
      <div className="site">
        <div className="block">
          <div className="block-background">
            <div className="images" style={sectionStyle}>
              <img className="image-forme" src={Forme} alt="forme" />
            </div>
          </div>
          <div className="block-accroche">
            <h2>Prêt à faire du tri dans vos placards ?</h2>
            <Link to="/signup">
              <button>Vends maintenent</button>
            </Link>

            <div>Découvrir comment ça marche</div>
          </div>
        </div>
        {isLoading ? (
          <Loader
            className="loader"
            type="ThreeDots"
            color="#49afb7"
            height={80}
            width={80}
          />
        ) : (
          <div className="container-offers">
            {data.offers &&
              data.offers.map((offer, index) => {
                return <Card data={offer} />;
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
