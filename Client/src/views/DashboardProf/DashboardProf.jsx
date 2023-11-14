import { Divider, Grid, Stack } from "@mui/material";
import AdsProfesional from "../../components/AdsProfessional/AdsProfessional";
import BookingProf from "../../components/BookingProf/BookingProf";
import { CardProfileProf } from "../../components/CardProfileProf/CardProfileProf";
import NavBar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import ModifyProfessionalData from "../../components/ModifyProfessionalData/ModifyProfessionalData";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetProfById } from "../../redux/Slices/modifyProfSlice";
import axios from "axios";
import PaymentsProf from "../../components/PaymentsProf/PaymentsProf";
const VITE_API_BASE = import.meta.env.VITE_API_BASE;

const DashboardProf = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.usersLogin.user)
  const [popUpModify, setPopUpModify] = useState(false)
  const [payments, setPayments] = useState(false)
  const [loading, setLoading] = useState(false)


  const fetchData = async () => {
    setLoading(true)
    try {
      const resp = await axios.get(
        VITE_API_BASE + `/payments/search/${users.userName}`
      );

      console.log('DATA FROM PAYMENT ENDPOINT------------------------------------:', resp.data);

      if (resp.status === 200) {
        setPayments(resp.data)
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, [users.userName]);

  useEffect(() => {
    dispatch(fetchGetProfById(users._id))
  }, [popUpModify])


  return (
    <div>
      <div>
        <NavBar />
      </div>
      <h1 style={{ marginLeft: "65px", fontSize: "30px", fontWeight: 300 }}>Mi perfil</h1>
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
        {popUpModify && <ModifyProfessionalData setPopUpModify={setPopUpModify} />}
      </Grid>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardProf;
