import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../assets/pictures/banner_wide-9b45d0aa9a311c4ff6013e9cf3bc2b6646468be3d2f553192c63598685fcc177.jpeg";
import Forme from "../assets/pictures/tear.42d6cec6.svg";
import * as qs from "qs";
import Loader from "react-loader-spinner";

import { Link, useLocation } from "react-router-dom";

const Home = (props) => {
  var sectionStyle = {
    backgroundImage: `url(${Banner})`,
  };

  const { search, sort, rangeValues } = props;
  const location = useLocation();
  qs.parse(location.search.substring(1)); // transforme "?page=1" en objet {page:1}

  const [offers, setOffers] = useState();
  const [count, setCount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const handleChangePage = (page) => {
    setPage(page);
  };
  useEffect(() => {
    const fetchData = async () => {
      const queryParams = qs.stringify({
        page: page,
        title: search,
        priceMin: rangeValues[0],
        priceMax: rangeValues[1],
        sort: sort ? "price-asc" : "prise-desc",
      });
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?${queryParams}`
      );
      console.log(response);
      setOffers(response.data.offers);
      setCount(response.data.count);
      setIsLoading(false);
    };

    fetchData();
  }, [page, search, rangeValues, sort]);

  const paginationLinks = [];
  const numberOfLinks = Math.ceil(count / 8);

  for (let index = 0; index < numberOfLinks; index++) {
    paginationLinks.push(
      <div onClick={() => handleChangePage(index + 1)}>{index + 1}</div>
    );
  }

  return (
    <div>
      {isLoading ? (
        <Loader
          className="loader"
          type="ThreeDots"
          color="#49afb7"
          height={80}
          width={80}
        />
      ) : (
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

          <div>
            <div>pages : {paginationLinks}</div>
            <div className="offers">
              {offers.map((offer, index) => {
                return (
                  <Link to={`/offer/${offer._id}`} key={offer._id}>
                    <div className="offer-card">
                      <div>{offer.owner.account.username}</div>

                      <img
                        src={offer.product_image.secure_url}
                        alt={offer.product_image}
                      />
                      <div>{offer.product_name}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div>pages : {paginationLinks}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
