import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAd } from "../../redux/Slices/createAdsSlice";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";

function CreateAdForm() {
  const dispatch = useDispatch();
  const { _id: userId, image: userImage } = useSelector(
    (state) => state.usersLogin.user
  );
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("formData");
    return savedFormData
      ? JSON.parse(savedFormData)
      : {
          title: "",
          description: "",
          location: "",
          price: "",
          requiredSkills: [],
          postingDate: "",
          expirationDate: "",
          categories: [],
          contractType: "",
          workLocation: "",
          profession: "",
        };
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = (e) => {
    const userInput = {
      ...formData,
      creatorId: userId,
      creatorImage: userImage,
    };
    e.preventDefault();
    dispatch(createAd(userInput));
  };

  return (
    <div
      style={{
        columns: "2",
        columnGap: ".5rem",
        padding: "10rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <TextField
              label="Título"
              variant="standard"
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <TextField
              label="Descripción"
              variant="standard"
              multiline // Habilita el modo multiline
              rows={3} // Puedes ajustar la cantidad de filas deseadas
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>
          <div>
            <TextField
              label="Locación"
              variant="standard"
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
          </div>
          <div>
            <TextField
              label="Precio"
              variant="standard"
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
          </div>
          <div>
            <TextField
              label="Habilidades"
              variant="standard"
              multiline // Habilita el modo multiline
              rows={3}
              type="text"
              id="requiredSkills"
              name="requiredSkills"
              value={formData.requiredSkills}
              onChange={(e) =>
                setFormData({ ...formData, requiredSkills: e.target.value })
              }
              required
            />
          </div>
        </div>
        <div>
          <div>
            <TextField
              label="Fecha de creación"
              variant="standard"
              type="date"
              id="postingDate"
              name="postingDate"
              value={formData.postingDate}
              InputLabelProps={{ shrink: true }}
              onChange={(e) =>
                setFormData({ ...formData, postingDate: e.target.value })
              }
              required
            />
          </div>
          <div>
            <TextField
              label="Fecha de finalización"
              variant="standard"
              type="date"
              id="expirationDate"
              name="expirationDate"
              value={formData.expirationDate}
              InputLabelProps={{ shrink: true }}
              onChange={(e) =>
                setFormData({ ...formData, expirationDate: e.target.value })
              }
              required
            />
          </div>
          <div>
            <TextField
              label="Categorías"
              variant="standard"
              type="text"
              id="categories"
              name="categories"
              value={formData.categories}
              onChange={(e) =>
                setFormData({ ...formData, categories: e.target.value })
              }
              required
            />
          </div>
          <div>
            <InputLabel id="contractType">Tipo de contratación</InputLabel>
            <Select
              label="Tipo de contratación"
              variant="standard"
              name="contractType"
              value={formData.contractType}
              onChange={(e) =>
                setFormData({ ...formData, contractType: e.target.value })
              }
            >
              <MenuItem value="Full-time">Full-time</MenuItem>
              <MenuItem value="Part-time">Part-time</MenuItem>
              <MenuItem value="Freelance">Freelance</MenuItem>
              <MenuItem value="Other">Otro</MenuItem>
            </Select>
          </div>
          <InputLabel id="workLocation">Modalidad de trabajo:</InputLabel>
          <Select
            label="Modalidad de trabajo"
            variant="standard"
            name="workLocation"
            value={formData.workLocation}
            onChange={(e) =>
              setFormData({ ...formData, workLocation: e.target.value })
            }
          >
            <MenuItem value="Presencial">Presencial</MenuItem>
            <MenuItem value="Remoto">Remoto</MenuItem>
          </Select>
          <div>
            <TextField
              label="Profesion"
              variant="standard"
              type="text"
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={(e) =>
                setFormData({ ...formData, profession: e.target.value })
              }
              required
            />
          </div>
        </div>
        <button type="submit">Crear Anuncio</button>
      </form>
    </div>
  );
}

export default CreateAdForm;
