import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import theme from "../../../theme";
import { Card, CardMedia } from "@mui/material";

const locale = {
  title: "אם גם את.ה...",
  line1: "מודאג.ת מהתוכן שהילדים",
};

function DashboardContent() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Card>
              <CardMedia
                component="img"
                height={"fit-content"}
                image="/landing-page-image.png"
              />
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                {locale.title}
              </Typography>
              <Typography>test</Typography>
            </Card>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function LandingPage() {
  return <DashboardContent />;
}
