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
            // height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Card className="landing-page-card">
              <CardMedia
                component="img"
                sx={{ height: "fit-content", maxHeight: "300px" }}
                image="/landing-page-image.png"
              />
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                {locale.title}
              </Typography>
              <Typography className="landing-page-lines">
                <p
                  style={{ padding: "2px 10px" }}
                  className="landing-page-lines-p"
                >
                  {locale.line1}..
                </p>
                <p
                  style={{ padding: "2px 10px" }}
                  className="landing-page-lines-p"
                >
                  {locale.line2}..
                </p>
                <p
                  style={{ padding: "2px 10px" }}
                  className="landing-page-lines-p"
                >
                  {locale.line3}..
                </p>
                <p
                  style={{ padding: "2px 10px" }}
                  className="landing-page-lines-p"
                >
                  {locale.line4}..
                </p>
                <p
                  style={{ padding: "2px 10px" }}
                  className="landing-page-lines-p"
                >
                  {locale.line5}..
                </p>
              </Typography>
              <Typography
                className="lets-begin"
                style={{ fontSize: 24, textAlign: "center" }}
                variant="h4"
              >
                {locale.you_came_to_the_right_place}
              </Typography>
              <Container sx={{ display: "flex", mb: 2, mt: 2 }}>
                <Button
                  href="/#/signup"
                  size="large"
                  sx={{
                    textAlign: "center",
                    marginTop: "0.8rem",
                    margin: "0 auto",
                  }}
                  color="secondary"
                  variant="outlined"
                >
                  {locale.lets_begin}
                </Button>
              </Container>
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
