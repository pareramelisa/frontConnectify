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

const DashboardProf = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.usersLogin.user)
  const [popUpModify, setPopUpModify] = useState(false)

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
          <CardProfileProf setPopUpModify={setPopUpModify}/>
        </Grid>
        <Grid item>
          <AdsProfesional />
          <BookingProf />
        </Grid>
        {
          popUpModify &&
          <ModifyProfessionalData setPopUpModify={setPopUpModify}/>
        }
      </Grid>
      
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardProf;
