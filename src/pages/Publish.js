import React from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import Loader from "react-loader-spinner";

const Publish = (props) => {
  const { token } = props;
  const history = useHistory();

  const initialValues = {
    picture: {},
    title: "",
    description: "",
    brand: "",
    size: 0,
    color: "",
    condition: "",
    city: "",
    price: 0,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    brand: Yup.string(),
    size: Yup.number(),
    color: Yup.string(),
    condition: Yup.string(),
    city: Yup.string(),
    price: Yup.number(),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();

      FormData.appennd("picture", values.picture);
      FormData.appennd("title", values.picture);
      FormData.appennd("description", values.picture);
      FormData.appennd("brand", values.picture);
      FormData.appennd("size", values.picture);
      FormData.appennd("color", values.picture);
      FormData.appennd("condition", values.picture);
      FormData.appennd("city", values.picture);
      FormData.appennd("price", values.picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-data",
          },
        }
      );

      if (response.data._id) {
        history.push(`/offer/${response.data._id}`);
      } else {
        alert("Une erreur est survenue, veuillez ressayer");
      }

      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return token ? (
    <div className="container-publish">
      <div className="publish-form">
        <h2>Vends ton article</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldValue,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="publish-file-select">
                <div className="publish-preview">
                  <input
                    className="publish-file"
                    type="file"
                    accept=".png, .jpeg, .jpg, .gif"
                    name="picture"
                    onChange={(event) => {
                      setFieldValue("picture", event.currentTarget.files[0]);
                    }}
                  />
                </div>
              </div>

              {errors.picture && touched.picture && errors.picture}

              <div className="article-descritption">
                <div className="article-title">
                  <span>Titre</span>
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={values.title}
                    placeholder="ex: T-Shirt Carharrt WIP noir"
                  />
                  {errors.tilte && touched.tilte && errors.title}
                </div>
                <div>
                  <span>Décris ton article</span>
                  <input
                    type="text"
                    name="description"
                    onChange={handleChange}
                    value={values.description}
                    placeholder="ex: porté quelquefois"
                  />
                  {errors.description &&
                    touched.description &&
                    errors.description}
                </div>
              </div>

              <div className="article-details">
                <div>
                  <span>Marque</span>
                  <input
                    type="text"
                    name="brand"
                    onChange={handleChange}
                    value={values.brand}
                    placeholder="ex: Carharrt WIP"
                  />
                  {errors.brand && touched.brand && errors.brand}
                </div>

                <div>
                  <span>Taille</span>
                  <input
                    type="number"
                    name="size"
                    onChange={handleChange}
                    value={values.size}
                    placeholder="ex: 40 / 12"
                  />
                  {errors.size && touched.size && errors.size}
                </div>
                <div>
                  <span>Couleur</span>
                  <input
                    type="text"
                    name="color"
                    onChange={handleChange}
                    value={values.color}
                    placeholder="ex: Noir"
                  />

                  {errors.color && touched.color && errors.color}
                </div>

                <div>
                  <span>État</span>
                  <input
                    type="text"
                    name="condition"
                    onChange={handleChange}
                    value={values.condition}
                    placeholder="ex: Très bon état"
                  />
                  {errors.condition && touched.condition && errors.condition}
                </div>

                <div>
                  <span>Lieu</span>
                  <input
                    type="text"
                    name="city"
                    onChange={handleChange}
                    value={values.city}
                    placeholder="ex: Le Croisic"
                  />

                  {errors.city && touched.city && errors.city}
                </div>
              </div>

              <div className="article-price">
                <div>
                  <span>Prix</span>
                  <input
                    type="number"
                    name="price"
                    onChange={handleChange}
                    value={values.price}
                    placeholder="0,00€"
                  />
                  {errors.price && touched.price && errors.price}
                </div>

                <div>
                  <input type="checkbox" />
                  <span>Je suis intéressé(e) par les échanges</span>
                </div>

                {errors.price && touched.price && errors.price}
              </div>
              <div className="article-button">
                <button
                  className="add-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader /> : "Ajouter"}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Publish;
