import { Divider, Grid } from "@mui/material"
import AdsProfesional from "../../components/AdsProfessional/AdsProfessional"
import BookingProf from "../../components/BookingProf/BookingProf"
import { CardProfileProf } from "../../components/CardProfileProf/CardProfileProf"

const DashboardProf = () => {
    return (
      <div>
        <h1 style={{ margin: "5px 0", padding: "20px" }} >Mi perfil</h1>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CardProfileProf />
          </Grid>
          <Grid item xs={4}>
            <AdsProfesional />
          </Grid>
          <Grid item xs={4}>
            <BookingProf />
          </Grid>
        </Grid>
      </div>
    );
  };

export default DashboardProf