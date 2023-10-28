import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProfsForAdmin,
  deleteProfByIdAdmin,
} from "../../redux/Slices/professionalSlice";

const ProfsForAdmin = () => {
  const professionals = useSelector(
    (state) => state.professionals.professionals
  );
  const deleted = useSelector((state) => state.deleted);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProfsForAdmin());
      } catch (error) {
        console.error("falló el fetchear los profs:", error);
      }
    };

    fetchData();
  }, [deleted]);
  const handleDelete = async (e, id) => {
    e.preventDefault();
    console.log("ID del profecional a bannear", id);
    await dispatch(deleteProfByIdAdmin(id));
    dispatch(fetchProfsForAdmin());
  };
  //   console.log(professionals);
  return (
    <>
      {professionals.length > 0 ? (
        professionals?.map((prof, index) => (
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
              <img
                src={prof.image}
                alt=""
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "100%",
                }}
              />
            </td>
            <td
              style={{
                backgroundColor: prof.isDeleted ? "#edd55e" : "#9bdb92",
                width: "100px",
              }}
            >
              {prof.userName}
            </td>
            <td
              style={{
                backgroundColor: prof.isDeleted ? "#edd55e" : "#9bdb92",
                width: "120px",
              }}
            >
              {prof.province}
            </td>
            <td
              style={{
                backgroundColor: prof.isDeleted ? "#edd55e" : "#9bdb92",
                width: "250px",
              }}
            >
              {prof.email}
            </td>

            <td
              style={{
                backgroundColor: prof.isDeleted ? "#edd55e" : "#9bdb92",
                width: "100px",
              }}
            >
              {prof.profession}
            </td>
            <td
              style={{
                backgroundColor: prof.isDeleted ? "#edd55e" : "#9bdb92",
                width: "70px",
              }}
            >
              <button
                className="btn btn-outline-danger"
                onClick={(e) => handleDelete(e, prof._id)}
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
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="9">No se encontraron profecionales</td>
        </tr>
      )}
    </>
  );
};

export default ProfsForAdmin;
