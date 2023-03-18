import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import mdTheme from "../../../theme";
import { Card, CardMedia, Button } from "@mui/material";
import List from "@mui/material/List";
import { mainListItems } from "../../nav/listItems";

function DashboardContent() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Container className="landing-page-card">
              {/* <CardMedia
                component="img"
                sx={{ height: "fit-content", maxHeight: "300px" }}
                image="/landing-page-image.png"
              /> */}
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                דף הבית
              </Typography>
              <Typography
                sx={{ padding: "20px 10px", textAlign: "center" }}
                className="landing-page-lines"
              >
                <b>שלום שני!</b>
                <br />
                <br />
                תודה שאת.ה בוחר.ת להיות מעורב.ת בקידום הדמוקרטיה במערכת החינוך.
                <br />
                <br />
                <b>מה עושים היום?</b>
              </Typography>
              <List component="nav">{mainListItems}</List>
            </Container>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function HomePage() {
  return <DashboardContent />;
}
