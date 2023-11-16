import { Divider, Grid, Stack } from "@mui/material";
import AdsProfesional from "../../AdsProfessional/AdsProfessional";
import BookingProf from "../../BookingProf/BookingProf";
import { CardProfileProf } from "../../CardProfileProf/CardProfileProf";
import NavBar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { useEffect, useState } from "react";
import ModifyProfessionalData from "../../ModifyProfessionalData/ModifyProfessionalData";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetProfById } from "../../../redux/Slices/modifyProfSlice";
import axios from "axios";
import PaymentsProf from "../../PaymentsProf/PaymentsProf";
import { useNavigate } from "react-router-dom";

const VITE_API_BASE = import.meta.env.VITE_API_BASE;

const DashBoardProfessionalForAdmin = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = userId[0];
  //   const users = useSelector((state) => state.usersLogin.user);
  const [popUpModify, setPopUpModify] = useState(false);
  const [payments, setPayments] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(
        VITE_API_BASE + `/payments/search/professionals/${users._id}`
      );
      if (resp.status === 200) {
        setPayments(resp.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [users.userName]);

  useEffect(() => {
    dispatch(fetchGetProfById(users._id));
  }, [popUpModify]);
  const handlerBTP = () => {
    navigate(`/admin/dashboard`);
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <button onClick={() => handlerBTP()}>Volver al Panel De Control</button>
      <h1 style={{ marginLeft: "65px", fontSize: "30px", fontWeight: 300 }}>
        Perfil de {users.userName}
      </h1>
      <Divider />
      <Grid container justifyContent={"space-evenly"} sx={{ pb: 25 }}>
        <Grid item>
          <CardProfileProf setPopUpModify={setPopUpModify} />
        </Grid>
        <Grid item>
          <AdsProfesional />
          <BookingProf />
          <PaymentsProf payments={payments} />
        </Grid>
        {popUpModify && (
          <ModifyProfessionalData setPopUpModify={setPopUpModify} />
        )}
      </Grid>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default DashBoardProfessionalForAdmin;
