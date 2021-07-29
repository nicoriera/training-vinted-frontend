import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../assets/pictures/banner_wide-9b45d0aa9a311c4ff6013e9cf3bc2b6646468be3d2f553192c63598685fcc177.jpeg";
import * as qs from "qs";
import Loader from "react-loader-spinner";

import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const params = qs.parse(location.search.substring(1)); // transforme "?page=1" en objet {page:1}
  const page = params.page;

  const [offers, setOffers] = useState();
  const [count, setCount] = useState();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?page=${page}&limit=8`
      );
      console.log(response);
      setOffers(response.data.offers);
      setCount(response.data.count);
      setIsLoading(false);
    };

    fetchData();
  }, [page]);

  const paginationLinks = [];
  const numberOfLinks = Math.ceil(count / 8);

  for (let index = 0; index < numberOfLinks; index++) {
    paginationLinks.push(
      <Link to={`/?page=${index + 1}&limit=8`}>{index + 1}</Link>
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

          <div>
            <div className="offers">
              <div>pages : {paginationLinks}</div>
              {offers.map((offer, index) => {
                return (
                  <Link to={`/offer/${offer._id}`} key={offer._id}>
                    <div className="offer-card">
                      <div>{offer.owner.account.username}</div>

                      <img
                        src={offer.product_image.secure_url}
                        alt="product_image.secure_url"
                      />
                      <div>{offer.product_name}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
