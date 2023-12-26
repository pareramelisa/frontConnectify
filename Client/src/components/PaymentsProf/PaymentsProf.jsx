import { Avatar, Card, CardContent, Grid, List, ListSubheader, Typography } from "@mui/material"
import { AttachMoney } from "@mui/icons-material";

export default function PaymentsProf({ payments }) {
    return (
        <List
            sx={{
                width: "800px",
                fontSize: "15px",
                boxShadow: 20,
                padding: "15px",
                height: "auto",
                marginTop: "20px",
            }}
        >
            <ListSubheader sx={{ fontSize: "25px", color: "black", padding: "10px" }}>
                <span style={{ display: "flex", alignItems: "center" }}>
                    <AttachMoney sx={{ marginRight: 1 }} fontSize="medium" />
                    <Typography variant="body2" color="black" sx={{ fontSize: "25px" }}>
                        Mis pagos
                    </Typography>
                </span>
            </ListSubheader>
            {payments.length > 0 ? payments.map(pay => (
                <Card key={pay._id}>
                    <Grid container spacing={2} style={{ alignItems: 'center', margin: '0px', padding: '2px' }}>
                        <Typography color="textSecondary" style={{ margin: '5px', padding: '6px' }}>
                            {new Date(pay.date).toLocaleDateString()}
                        </Typography>
                        <Avatar src={pay.clientData.image} />
                        <CardContent>
                            <Typography variant="body2">
                                {pay.clientData.name} {pay.clientData.lastName}
                            </Typography>
                            <Typography variant="body2">
                                <a href={`mailto:${pay.clientData.email}`}>{pay.clientData.email}</a>
                            </Typography>
                        </CardContent>
                    </Grid>
                </Card>
            ))
                :
                <Typography variant="body2" color="black" sx={{ fontSize: "15px", p: '15px' }}>
                    No hay pagos disponibles
                </Typography>
            }
        </List>
    )
}