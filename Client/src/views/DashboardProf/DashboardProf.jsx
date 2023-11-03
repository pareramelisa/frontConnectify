import { Divider, Grid, Stack } from "@mui/material";
import AdsProfesional from "../../components/AdsProfessional/AdsProfessional";
import BookingProf from "../../components/BookingProf/BookingProf";
import { CardProfileProf } from "../../components/CardProfileProf/CardProfileProf";
// import NavBarDemo2 from "../../components/NavBarDemo2/NavBarDemo2";
import NavBar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer";

const DashboardProf = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <h1 style={{ marginLeft: "65px", fontSize: "30px", fontWeight: 300 }}>Mi perfil</h1>
      <Divider />
      <Grid container justifyContent={"space-evenly"} sx={{ pb: 25 }}>
        <Grid item>
          <CardProfileProf />
        </Grid>
        <Grid item>
          <AdsProfesional />
          <BookingProf />
        </Grid>
      </Grid>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardProf;
