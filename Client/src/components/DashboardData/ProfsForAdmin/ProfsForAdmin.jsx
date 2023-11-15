import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import style from "./ProfsForAdmin.module.css";

import {
  fetchProfsForAdmin,
  deleteProfByIdAdmin,
} from "../../../redux/Slices/professionalSlice";
import {
  fetchClientsForAdmin,
  deleteClientByIdAdmin,
  fetchClientById,
} from "../../../redux/Slices/clientSlice";
import {
  fetchAdsForAdmin,
  deleteAdByIdAdmin,
} from "../../../redux/Slices/adsSlice";
import SupportPopUp from "../SupportPopUp/SupportPopUp";

const ProfsForAdmin = () => {
  const dispatch = useDispatch();
  const professionals = useSelector(
    (state) => state.professionals.professionals
  );
  const clients = useSelector((state) => state.clients.clients);
  const ads = useSelector((state) => state.ads.ads);

  const [currentPage, setCurrentPage] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [dataPerPage] = useState(8);
  const [loading, setLoading] = useState(false);

  const indexOfLastAd = currentPage * dataPerPage;
  const indexOfFirstAd = indexOfLastAd - dataPerPage;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    console.log(765765);
    const fetchData = async () => {
      try {
        await dispatch(fetchClientsForAdmin());
        await dispatch(fetchProfsForAdmin());
        await dispatch(fetchAdsForAdmin());
      } catch (error) {
        console.error("falló el fetcheo", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (e, prof) => {
    showLoading();
    let newState = [];
    if (!prof.profession) {
      try {
        const banned = await dispatch(deleteClientByIdAdmin(prof._id));
        const update = await dispatch(fetchClientsForAdmin());
        console.log("ID del cliente a bannear", banned);
        setSelectedData(update);
      } catch (error) {}
    } else if (prof.creator) {
      try {
        const banned = await dispatch(deleteAdByIdAdmin(prof._id));
        const update = await dispatch(fetchAdsForAdmin());
        console.log("ID del anuncio a bannear", banned);
        setSelectedData(update);
      } catch (error) {}
    } else if (prof.locationJob) {
      try {
        const banned = await dispatch(deleteProfByIdAdmin(prof._id));
        const update = await dispatch(fetchProfsForAdmin());
        console.log("ID del profecional a bannear", banned.data);
        newState = selectedData.map((sel) =>
          sel._id === banned.data._id ? banned.data : sel
        );
        setSelectedData(newState);
      } catch (error) {}
    }
  };

  const handleUserType = (e) => {
    setCurrentPage(1);
    if (e === "professionals") setSelectedData(professionals);
    setShowButton(false);
    if (e === "clients") setSelectedData(clients);
    setShowButton(false);
    if (e === "ads") setSelectedData(ads);
    setShowButton(false);
  };
  const [selectedData, setSelectedData] = useState(professionals);

  const uniqueProfessions = new Set();
  professionals.forEach((item) => {
    item.profession.forEach((profession) => {
      uniqueProfessions.add(profession);
    });
  });
  const profession = Array.from(uniqueProfessions);

  const handleSelentProfession = (e) => {
    if (e.target.value === "Todas las Profesiones") {
      setSelectedData(professionals);
      setShowButton(false);
    } else {
      setCurrentPage(1);
      const profClass = e.target.value;
      const toScrub = professionals.filter(
        (prof) => prof.profession == profClass
      );

      setSelectedData(toScrub);
      setShowButton(true);
    }
  };
  const currentData = selectedData
    ? selectedData.slice(indexOfFirstAd, indexOfLastAd)
    : [];

  const handleBanProf = async () => {
    showLongLoading();
    try {
      const update = [];
      await Promise.all(
        selectedData.map(async (prof) => {
          if (prof.isDeleted) update.push(prof);
          if (!prof.isDeleted) {
            const banned = await dispatch(deleteProfByIdAdmin(prof._id));
            await dispatch(fetchProfsForAdmin());
            console.log("ID del profecional a bannear", banned);

            update.push(banned.data);
          }
        })
      );
      setSelectedData(update);
    } catch (error) {}
  };
  const handleUnbanProf = async () => {
    showLongLoading();
    try {
      const update = [];
      await Promise.all(
        selectedData.map(async (prof) => {
          if (!prof.isDeleted) update.push(prof);
          if (prof.isDeleted) {
            const banned = await dispatch(deleteProfByIdAdmin(prof._id));
            await dispatch(fetchProfsForAdmin());
            console.log("ID del profecional a bannear", banned);

            update.push(banned.data);
          }
        })
      );
      setSelectedData(update);
    } catch (error) {}
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  const handlePopUp = (prof) => {
    setSelectedProfessional(prof);
    console.log(prof);
    !isModalVisible ? setIsModalVisible(true) : setIsModalVisible(false);
    console.log("PopUp de " + prof.userName);
  };

  const handleClosePopUp = () => {
    setSelectedProfessional(null);
    setIsModalVisible(false);
  };

  function showLoading() {
    setLoading(true);
    setTimeout(function () {
      setLoading(false);
    }, 950);
  }
  function showLongLoading() {
    setLoading(true);
    setTimeout(function () {
      setLoading(false);
    }, 1250);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <div>
        <div>
          <select
            name="user"
            id="user type"
            onChange={(e) => handleUserType(e.target.value)}
          >
            <option value="professionals">Profesionales</option>
            <option value="clients">Clientes</option>
            <option value="ads">Anuncios</option>
          </select>
          {selectedData !== clients && selectedData !== ads && (
            <select
              name="profession"
              id="profession"
              onChange={(e) => handleSelentProfession(e)}
            >
              <option key="0" value="Todas las Profesiones">
                Todas las Profesiones
              </option>
              {profession.map((prof, index) => (
                <option key={index} value={prof}>
                  {prof}
                </option>
              ))}
            </select>
          )}
          {showButton && (
            <div>
              <button
                style={{ backgroundColor: "#3b7ba4" }}
                onClick={(e) => handleBanProf(e)}
              >
                Suspender Profesión
              </button>
              <button
                style={{ backgroundColor: "#3b7ba4" }}
                onClick={(e) => handleUnbanProf(e)}
              >
                Dessuspender Profesión
              </button>
            </div>
          )}
        </div>
        {selectedData.length > 0 ? (
          currentData?.map((prof, index) => (
            <tr key={prof.id}>
              <th
                style={{
                  backgroundColor: prof.isDeleted ? "#edd55e" : "#9bdb92",
                }}
                scope="row"
              >
                {index + 1}
              </th>
              <td
                style={{
                  backgroundColor: prof.isDeleted ? "#edd55e" : "#9bdb92",
                }}
              >
                {prof.creator ? (
                  <img
                    src={prof.creator[0].image}
                    alt=""
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "100%",
                    }}
                  />
                ) : (
                  <img
                    src={
                      prof.image ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCMq4cGfAmaJAYVpXFPLY57EzVip1FTMK-ETQH1aU24VD-bYx5wJ4srHFP99zAgqXBvfQ&usqp=CAU"
                    }
                    alt="Default Image"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "100%",
                    }}
                  />
                )}
              </td>
              <td
                style={{
                  backgroundColor: prof.isDeleted ? "#edd55e" : "#9bdb92",
                  width: "100px",
                }}
              >
                {prof.userName || prof.creator[0].userName}
              </td>
              <td
                style={{
                  backgroundColor: prof.isDeleted ? "#edd55e" : "#9bdb92",
                  width: "120px",
                }}
              >
                {prof.locationJob ||
                  prof.province ||
                  prof.postingDate?.substring(0, 10)}
              </td>
              <td
                style={{
                  backgroundColor: prof.isDeleted ? "#edd55e" : "#9bdb92",
                  width: "250px",
                }}
              >
                {prof.email || prof.creator[0].email}
              </td>

              <td
                style={{
                  backgroundColor: prof.isDeleted ? "#edd55e" : "#9bdb92",
                  width: "100px",
                }}
              >
                {prof.profession ? prof.profession : "Cliente"}
              </td>
              <td
                style={{
                  backgroundColor: prof.isDeleted ? "#edd55e" : "#9bdb92",
                  width: "70px",
                }}
              >
                <button
                  style={{
                    backgroundColor: prof.isDeleted ? "#9bdb92" : "#edd55e",
                  }}
                  onClick={(e) => handleDelete(e, prof)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-x-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d={
                        prof.isDeleted
                          ? "M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"
                          : "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"
                      }
                    ></path>
                  </svg>
                </button>
                <button
                  style={{
                    backgroundColor: "#3B7BA4",
                    height: "25px",
                    width: "75px",
                    fontSize: "13px",
                    paddingTop: "3px",
                  }}
                  onClick={() => handlePopUp(prof)}
                >
                  Soporte
                </button>
                {isModalVisible && selectedProfessional === prof && (
                  <div className={style.vemos}>
                    <SupportPopUp
                      isVisible={isModalVisible}
                      professional={selectedProfessional}
                      onClose={handleClosePopUp}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="9">No se encontraron profecionales</td>
          </tr>
        )}
      </div>
      <div
        style={{
          marginTop: "auto",
          padding: "20px",
        }}
      >
        {selectedData.length !== 0 ? (
          <Pagination
            currentPage={currentPage}
            adsPerPage={dataPerPage}
            totalAds={selectedData.length}
            onPageChange={paginate}
            currentAds={currentData}
          />
        ) : null}
      </div>
      <div
        className={style.loadingMessage}
        style={{ display: loading ? "flex" : "none" }}
      >
        <div className={style.loadingText}>Loading...</div>
      </div>
    </div>
  );
};

export default ProfsForAdmin;
