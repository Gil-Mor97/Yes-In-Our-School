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
import mdTheme from "../../../theme";
import { Card, CardMedia, Button } from "@mui/material";

const locale = {
  title: "אם גם את.ה...",
  line1: "מודאג.ת מהתוכן שהילדים לומדים בבתי הספר",
  line2: "רוצה להכניס יותר תכנים דמוקרטיים לתכנית הלימודים",
  line3:
    "מכיר.ה עובד או עובדת הוראה שנפגעו בשל הצגת תכנים דמוקרטיים בכיתות הלימוד",
  line4: "מחפש.ת רעיונות לחינוך לדמוקרטיה",
  line5: "רוצה לחבור להורים נוספים בבית הספר ולפעול יחד לשינוי",
  you_came_to_the_right_place: "הגעת למקום הנכון!",
  lets_begin: "שנתחיל?",
};

function DashboardContent() {
  return (
    <ThemeProvider theme={mdTheme}>
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
            <Card className="landing-page-card">
              <CardMedia
                component="img"
                sx={{ height: "fit-content", maxHeight: "300px" }}
                image="/landing-page-image.png"
              />
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                {locale.title}
              </Typography>
              <Typography
                className="landing-page-lines"
                sx={{
                  fontSize: "1rem",
                  "@media (min-width: 600px)": {
                    fontSize: "0.2rem",
                  },
                }}
              >
                <p>{locale.line1}..</p>
                <p>{locale.line2}..</p>
                <p>{locale.line3}..</p>
                <p>{locale.line4}..</p>
                <p>{locale.line5}..</p>
              </Typography>
              <Typography className="lets-begin" variant="h4">
                {locale.you_came_to_the_right_place}
                <Button
                  size="large"
                  sx={{ marginTop: "0.8rem" }}
                  color="secondary"
                  variant="outlined"
                >
                  {locale.lets_begin}
                </Button>
              </Typography>
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
