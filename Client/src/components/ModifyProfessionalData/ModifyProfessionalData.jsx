import miApi from "../../../localidades.json";
import React, { useState, useEffect } from "react";
import style from "./ModifyProfessionalData.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchModifyDataProf } from "../../redux/Slices/modifyProfSlice";
import validationModify from "./validationModify";
import { AiFillCloseCircle } from "react-icons/ai";

const ModifyProfessionalData = ({ setPopUpModify }) => {
  const profById = useSelector((state) => state.modifyProf.detailProf);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: profById.name,
    lastName: profById.lastName,
    userName: profById.userName,
    email: profById.email,
    image: profById.image,
    profession: profById.profession,
    location: "",
    province: profById.province,
    description: profById.description,
  });

  const [error, setError] = useState({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    image: "",
    profession: "",
    location: "",
    province: "",
    description: "",
  });

  const [popUpDataProf, setPopUpDataProf] = useState(false);

  const handlerChange = (e) => {
    const propiedad = e.target.id;
    const valor = e.target.value;

    setForm({ ...form, [propiedad]: valor });
    setError(validationModify({ ...form, [propiedad]: valor }));
  };

  const handlerChangeTextarea = (e) => {
    const valor = e.target.value;
    setForm({ ...form, description: valor });
    setError(validationModify({ ...form, description: valor }));
  };

  // const handleImageUpload = (e) => {
  //   const image = e.target.files[0];

  //   const imgElement = document.createElement("img");
  //   imgElement.src = URL.createObjectURL(image)

  //   const imageUpdate = imgElement.src.slice(5)

  //   if (imageUpdate) {
  //     setForm({
  //       ...form,
  //       image: imageUpdate,
  //     });
  //     setImagePreview(imageUpdate)
  //   }

  //   ;

  //   console.log(imageUpdate);
  // };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const errorValue = Object.values(error);
    const existError = errorValue.some((errorMessage) => errorMessage !== "");

    if (existError) {
      setPopUpDataProf(true);
    } else {
      await dispatch(fetchModifyDataProf(form, profById._id));
      setPopUpModify(false);
    }
  };

  const handlerClosePopUpDataProf = () => {
    setPopUpDataProf(false);
  };

  function getProvinces(data) {
    const provinces = data.localidades.map((provincia) => {
      return provincia.provincia.nombre;
    });
    return [...new Set(provinces)];
  }

  const provincesList = getProvinces(miApi);

  const selectedProvParticular = form.province;

  function selectCitiesByProvince(data, selectedProvince) {
    const cities = data.localidades.filter((ciudad) => {
      return ciudad.provincia.nombre === selectedProvince;
    });
    const sortedCities = [...new Set(cities)].sort((a, b) =>
      a.nombre.localeCompare(b.nombre)
    );
    return sortedCities;
  }

  const citiesInSelectedProvince = selectCitiesByProvince(
    miApi,
    selectedProvParticular
  );

  const handlerClosePopUpUpdateDataProf = () => {
    setPopUpModify(false);
  };

  return (
    <div className={style.containerPopUp}>
      <div className={style.popUp}>
        <AiFillCloseCircle
          className={style.btnCloseUpdateDataProf}
          onClick={handlerClosePopUpUpdateDataProf}
        />
        <div className={style.containerTitleModifyProf}>
          <h2>Modificacion de datos</h2>
          <img src={form.image} alt="" className={style.imageUpdateProf}/>
        </div>
        <form action="" onSubmit={handlerSubmit} className={style.containerFormUpdateProf}>
          <div>
          <input
            type="text"
            placeholder="Nombre"
            value={form.name}
            disabled
            onChange={handlerChange}
            id="name"
            className={style.inputDisableUpdateProf}
          />
          <input
            type="text"
            placeholder="Apellido"
            value={form.lastName}
            disabled
            onChange={handlerChange}
            id="lastName"
            className={style.inputDisableUpdateProf}
          />
          <input
            type="text"
            placeholder="Nombre de Usuario"
            value={form.userName}
            disabled
            onChange={handlerChange}
            id="userName"
            className={style.inputDisableUpdateProf}
          />
          </div>
          <div>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handlerChange}
            id="email"
            className={style.inputUpdateProfemail}
          />
          <span className={style.spanUpdateProfEmail}>{error.email}</span>
          <input
            type="text"
            placeholder="Profesion"
            value={form.profession}
            onChange={handlerChange}
            id="profession"
            className={style.inputUpdateProf}
          />
          <span className={style.spanUpdateProfProfession}>{error.profession}</span>
          </div>
          <div>
            <select
            name="province"
            id="province"
            value={form.province}
            onChange={handlerChange}
            required
            className={style.selectUpdateProf}
          >
            <option value="" disabled defaultValue={form.province}>
              {form.province}
            </option>
            {provincesList.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
          <select
            name="location"
            id="location"
            value={form.location}
            onChange={handlerChange}
            required
            className={style.selectUpdateProf}
          >
            {citiesInSelectedProvince.map((location, index) => (
              <option key={index} value={location.nombre} defaultValue={location.nombre}>
                {location.nombre}
              </option>
            ))}
          </select>
          <span className={style.spanUpdateProfLocation}>{error.location}</span>
          </div>
          <textarea
            placeholder="Descripcion"
            defaultValue={form.description}
            onBlur={handlerChangeTextarea}
            id="descripcion"
            rows={4}
            cols={50}
            className={style.textareaUpdateProf}
          />
          <span className={style.spanTextareaUpdateProf}>{error.description}</span>
          <button type="submit" className={style.btnUpdateProf}>Modificar</button>
        </form>
        {popUpDataProf && (
          <div className={style.containerPopUpDataProf}>
            <div className={style.popUpDataProf}>
              <AiFillCloseCircle
                className={style.btnCloseDataProf}
                onClick={handlerClosePopUpDataProf}
              />
              <h3>Faltan completar Datos</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModifyProfessionalData;