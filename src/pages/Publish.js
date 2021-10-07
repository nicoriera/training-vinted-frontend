import React, { useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import Loader from "react-loader-spinner";

const Publish = (props) => {
  const { token } = props;
  const history = useHistory();
  const [preview, setPreview] = useState("");

  const initialValues = {
    picture: {},
    title: "",
    description: "",
    brand: "",
    size: "",
    color: "",
    condition: "",
    city: "",
    price: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    brand: Yup.string(),
    size: Yup.string(),
    color: Yup.string(),
    condition: Yup.string(),
    city: Yup.string(),
    price: Yup.number(),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("picture", values.picture);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("brand", values.brand);
      formData.append("size", values.size);
      formData.append("color", values.color);
      formData.append("condition", values.condition);
      formData.append("city", values.city);
      formData.append("price", values.price);

      const response = await axios.post(
        "http://localhost:5000/offer/publish",
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
    <div className="container">
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
              <div>
                {preview ? (
                  <div className="dashed-preview-image">
                    <img
                      className="preview-image"
                      src={preview}
                      alt="pré-visualisation"
                    />
                    <div
                      className="remove-img-button"
                      onClick={() => {
                        setPreview("");
                      }}
                    >
                      X
                    </div>
                  </div>
                ) : (
                  <div className="publish-file-select">
                    <div className="publish-preview">
                      <input
                        hidden
                        id="button-file"
                        className="publish-file"
                        type="file"
                        accept=".png, .jpeg, .jpg, .gif"
                        name="picture"
                        onChange={(event) => {
                          setFieldValue(
                            "picture",
                            event.currentTarget.files[0]
                          );

                          setPreview(
                            URL.createObjectURL(event.target.files[0])
                          );
                        }}
                      />
                      <label for="button-file">+ Ajouter une photo</label>
                    </div>
                  </div>
                )}
              </div>

              {errors.picture && touched.picture && errors.picture}
              <div className="article">
                <div className="article-descritption">
                  <div className="article-title-descritption">
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
                  <div className="article-title-descritption">
                    <span>Décris ton article</span>
                    <textarea
                      type="textarea"
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
                  <div className="article-title-descritption">
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

                  <div className="article-title-descritption">
                    <span>Taille</span>
                    <input
                      type="text"
                      name="size"
                      onChange={handleChange}
                      value={values.size}
                      placeholder="ex: L / 40 / 12"
                    />
                    {errors.size && touched.size && errors.size}
                  </div>
                  <div className="article-title-descritption">
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

                  <div className="article-title-descritption">
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

                  <div className="article-title-descritption">
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
                  <div className="article-title-descritption">
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

                  <div className="checkbox">
                    <input type="checkbox" />
                    <span>Je suis intéressé(e) par les échanges</span>
                  </div>

                  {errors.price && touched.price && errors.price}
                </div>
              </div>

              <div className="article-button">
                <button
                  className="add-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader
                      type="Circles"
                      color="#49afb7"
                      height={20}
                      width={20}
                    />
                  ) : (
                    "Ajouter"
                  )}
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
