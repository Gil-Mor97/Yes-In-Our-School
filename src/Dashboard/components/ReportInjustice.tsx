import React, { useEffect, useState } from "react";
import {
  FormGroup,
  FormControl,
  Autocomplete,
  TextField,
  InputAdornment,
  Button,
  Card,
  Collapse,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/he";
import { AsYouType, isValidNumberForRegion } from "libphonenumber-js";
import db from "../../data/Db";
import "./ReportInjustice.css";
import {
  ContactPhone,
  AlternateEmail,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";

//hehe
declare global {
  interface Array<T> {
    unique(): Array<T>;
  }
}
Array.prototype.unique = function () {
  return Array.from(new Set(this));
};

function CityAndSchool(props: { cities: readonly string[] }) {
  //fetch from db
  const [schools, setSchools] = useState([""]);
  async function getSchools(city: string) {
    const schoolsRef = db.collection("schools");
    console.log("pinging schools!");
    const schools = (await schoolsRef.where("SETL_NAME", "==", city).get())
      .docs;
    setSchools(
      schools.length > 0
        ? schools.map((school) => school.data().NAME).unique()
        : ["לא נמצאו בתי ספר במאגר!"]
    );
  }

  // first pick city, then pick school
  const [selectedSchool, setSchool] = useState({ school: "", city: "" });
  const changeCity = (e: any, value: any) => {
    setSchool({
      school: "",
      city: value,
    });
    getSchools(value);
  };
  const changeSchool = (e: any, value: string | null) => {
    if (!selectedSchool.city) return;
    setSchool({
      school: (value ||= ""),
      city: selectedSchool.city,
    });
  };

  return (
    <FormGroup className="select-city-school">
      <FormControl className="select-city">
        <Autocomplete
          freeSolo
          options={props.cities}
          renderInput={(params) => <TextField {...params} label="עיר" />}
          onChange={changeCity}
        />
      </FormControl>
      <FormControl className="select-school">
        <Autocomplete
          freeSolo
          disabled={selectedSchool.city ? false : true}
          options={schools}
          renderInput={(params) => (
            <TextField
              {...params}
              label={selectedSchool.city ? "בית ספר" : "אנא בחרו עיר קודם!"}
            />
          )}
          onChange={changeSchool}
        />
      </FormControl>
    </FormGroup>
  );
}

function PhoneNumberInput(props: {
  label: string;
  helperText: string;
  icon: JSX.Element;
  variant?: "standard" | "filled" | "outlined" | undefined;
}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [invalidPhoneNumber, setInvalidPN] = useState(false);
  const handleInput = (e: any) => {
    setPhoneNumber(new AsYouType("IL").input(e.target.value));
  };
  const validateInput = (e: any) => {
    if (!phoneNumber) return setInvalidPN(false);
    isValidNumberForRegion(phoneNumber, "IL")
      ? setInvalidPN(false)
      : setInvalidPN(true);
  };

  return (
    <TextField
      error={invalidPhoneNumber}
      label={props.label}
      helperText={props.helperText}
      variant={props.variant}
      id="phone-number"
      onChange={handleInput}
      onBlur={validateInput}
      value={phoneNumber}
      placeholder="000-000-0000"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{props.icon}</InputAdornment>
        ),
      }}
    />
  );
}

function EmailInput(props: {
  helperText: string;
  label: string;
  icon: JSX.Element;
  variant?: "standard" | "filled" | "outlined" | undefined;
}) {
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [email, setEmail] = useState("");
  const handleInput = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };
  const validateInput = (e: any) => {
    if (!email || email == "") return setInvalidEmail(false);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailRegex)) setInvalidEmail(true);
  };

  return (
    <TextField
      label={props.label}
      helperText={props.helperText}
      error={invalidEmail}
      variant={props.variant}
      id="email"
      onChange={handleInput}
      onBlur={validateInput}
      value={email}
      placeholder="example@domain.xyz"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{props.icon}</InputAdornment>
        ),
      }}
    />
  );
}

function DateContentInput(props: {
  setExpandPreludeRef: any;
  containerClassName: string;
  dateLabel: string;
  contentLabel: string;
}) {
  const collapsePrelude = () => {
    props.setExpandPreludeRef(false);
  };
  return (
    <div className={props.containerClassName}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
        <DatePicker label={props.dateLabel} className="date-content" />
      </LocalizationProvider>
      <TextField
        onFocus={collapsePrelude}
        multiline={true}
        className="text-field-content"
        label={props.contentLabel}
        minRows={5}
        maxRows={15}
      ></TextField>
    </div>
  );
}
function TeacherDetails(props: {
  phoneHelperText: string;
  phoneLabel: string;
  emailHelperText: string;
  emailLabel: string;
}) {
  return (
    <FormGroup className="teacher-details">
      <FormControl className="teacher-name">
        <TextField label="שם עובד ההוראה" />{" "}
        {/* replace with autocomplete when we have more data */}
      </FormControl>
      <FormControl className="teacher-phone-number">
        <PhoneNumberInput
          label={props.phoneLabel}
          helperText={props.phoneHelperText}
          icon={<ContactPhone />}
        />
      </FormControl>
      <FormControl className="teacher-email">
        <EmailInput
          helperText={props.emailHelperText}
          label={props.emailLabel}
          icon={<AlternateEmail />}
        />
      </FormControl>
    </FormGroup>
  );
}

export default function ReportInjustice() {
  const [cities, setCities] = useState([""]);
  useEffect(() => {
    //fetch cities on load
    async function getCities() {
      const citiesRef = db.collection("cities");
      console.log("pinging cities!");
      const cities = (await citiesRef.get()).docs;
      setCities(cities.map((city) => city.data().name));
    }
    getCities().catch(console.error);
  }, []);

  const [expandPrelude, setExpandPrelude] = useState(true);
  function submit(anon: boolean = false) {
    anon ? console.log("submitted anonymously!") : console.log("submitted!");
    // const payload = {
    //   city: "",
    //   school: "",
    //   schoolWorkerName: "",
    //   schoolWorkerPhone: "",
    //   schoolWorkerEmail: "",
    //   dateOfOccurence: new Date(),
    //   occurrenceContent: "",
    // };
  }

  return (
    <div className="report-injustice">
      <span>PLACEHOLDER</span>
      <form>
        <div className="prelude">
          <Card>
            <Typography
              variant="h6"
              color="text.secondary"
              onClick={() => setExpandPrelude(!expandPrelude)}
            >
              {expandPrelude ? <ExpandLess /> : <ExpandMore />}
              פרטי בית הספר ועובד ההוראה
            </Typography>
            <Collapse in={expandPrelude}>
              <CityAndSchool cities={cities} />
              <TeacherDetails
                phoneLabel="PLACEHOLDER"
                phoneHelperText="PLACEHOLDER"
                emailLabel="PLACEHOLDER"
                emailHelperText="PLACEHOLDER"
              />
            </Collapse>
          </Card>
        </div>

        <DateContentInput
          setExpandPreludeRef={setExpandPrelude}
          containerClassName="content"
          dateLabel="PLACEHOLDER"
          contentLabel="PLACEHOLDER"
        />
      </form>
      <div className="submit">
        <Button color="primary" variant="outlined" onClick={() => submit()}>
          דיווח
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => submit(true)}
        >
          דיווח באנונימיות
        </Button>
      </div>
    </div>
  );
}
