import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { auth } from "../../data/Db";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert, AlertTitle, Snackbar } from "@mui/material";

const theme = createTheme();

const errorDictionary = {
  "auth/wrong-password": "אימייל או סיסמה שגויים",
  "auth/user-not-found": "אימייל אינו קיים במערכת.",
  "auth/too-many-requests":
    "חשבונך נחסם עקב נסיונות כניסה מרובים ללא הצלחה. נא לאפס סיסמה או לנסות להתחבר מאוחר יותר.",
};

export default function SignIn() {
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      console.error(error);
      setError(errorDictionary[error.code] ?? error.message);
      setOpen(true);
    }
    setLoading(false);
  };

  const signOut = async () => {
    await auth.signOut();
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const user = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // const email = data.get("email")?.toString();
    // const password = data.get("password")?.toString();
    console.log({ email, password });
    if (email && password) {
      if (!email || email == "") return setInvalidEmail(false);
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!email.match(emailRegex)) return setInvalidEmail(true);
      signIn(email, password);
    }
  };

  const updateEmail = (email) => {
    setEmail(email);
    if (!email || email == "") return setInvalidEmail(false);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailRegex)) return setInvalidEmail(true);
    setInvalidEmail(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          // sx={{ height: "100%" }}
        >
          <Alert severity="error" sx={{ width: "100%", dir: "rtl" }}>
            <AlertTitle>שגיאה</AlertTitle>
            {error}
          </Alert>
        </Snackbar>
        {!loading && (
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              התחברות
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                value={email}
                onChange={(event) => updateEmail(event.target.value)}
                error={invalidEmail}
                helperText={invalidEmail ? "נא למלא כתובת מייל תקינה" : ""}
                margin="normal"
                required
                fullWidth
                id="email"
                label="כתובת מייל"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="סיסמה"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                התחברות
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    שכחת סיסמה?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/#/signup" variant="body2">
                    {"אין לך חשבון? להרשמה נלחץ כאן"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
        {loading && (
          <Box
            sx={{
              height: "100%",
              minHeight: "500px",
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}
