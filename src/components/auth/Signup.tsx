import React, { useState } from "react";
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
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { db, auth } from "../../data/Db";
import { collection, addDoc } from "firebase/firestore";
import { Alert, AlertTitle, CircularProgress, Snackbar } from "@mui/material";

const theme = createTheme();

export default function SignUp() {
  const registerWithEmailAndPassword = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err: any) {
      console.error(err);
      setError(errorDictionary[err.code]);
      setOpen(true);
    }
    setLoading(false);
  };

  const errorDictionary = {
    "auth/weak-password": "הסיסמה צריכה להיות בת 6 תווים לפחות.",
    "auth/email-already-in-use":
      "כתובת האימייל כבר נמצאת בשימוש על ידי חשבון אחר.",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [eula, setEula] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const updateEmail = (email) => {
    setEmail(email);
    if (!email || email == "") return setInvalidEmail(false);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailRegex)) return setInvalidEmail(true);
    setInvalidEmail(false);
  };

  const updateName = () => {
    setName(fname + " " + lname);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(eula);
    if (!eula) {
      setOpen(true);
      return setError("נא לאשר את תנאי השימוש");
    }
    if (email && password && name && !invalidEmail) register();
  };

  const register = () => {
    if (!name) alert("נא להזין שם");
    registerWithEmailAndPassword(name, email, password);
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
              הרשמה
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={fname}
                    onChange={(event) => {
                      setFName(event.target.value);
                      updateName();
                    }}
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="שם פרטי"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    value={lname}
                    onChange={(event) => {
                      setLName(event.target.value);
                      updateName();
                    }}
                    fullWidth
                    id="lastName"
                    label="שם משפחה"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    value={email}
                    onChange={(event) => updateEmail(event.target.value)}
                    error={invalidEmail}
                    helperText={invalidEmail ? "נא למלא כתובת מייל תקינה" : ""}
                    fullWidth
                    id="email"
                    label="כתובת אימייל"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    fullWidth
                    name="password"
                    label="סיסמה"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        required
                        checked={eula}
                        onChange={(event) => {
                          console.log(event.target.checked);
                          setEula(event.target.checked);
                        }}
                        color="primary"
                      />
                    }
                    label="*אני מסכימ.ה לתנאי השימוש באתר"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/#/login" variant="body2">
                    יש לך חשבון? ניתן להתחבר כאן
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
