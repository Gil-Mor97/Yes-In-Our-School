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

<<<<<<< HEAD
// [1,2,2,3].unique() = [1,2,3]
=======
//hehe
>>>>>>> f2fece9 (most of ReportInjustice UI's frame, more css and submission to come)
declare global {
  interface Array<T> {
    unique(): Array<T>;
  }
}
Array.prototype.unique = function () {
  return Array.from(new Set(this));
};

<<<<<<< HEAD
//begone, inline hebrew!
const localization = {
  no_schools_found: "לא נמצאו מוסדות במאגר!",
  city: "עיר",
  school: "מוסד",
  no_city_selected: "אנא בחרו עיר קודם!",
  prelude_title: "פרטי המוסד ועובד ההוראה",
  name_of_school_worker: "שם עובד ההוראה",
  title: "דיווח",
  phone_of_school_worker_label: "מספר טלפון של עובד ההוראה",
  email_of_school_worker_label: 'כתובת הדוא"ל של עובד ההוראה',
  date_of_occurrence_label: "תאריך התקרית",
  content_of_occurrence_label: "פרטי התקרית",
  report_button: "דיווח",
  report_anon_button: "דיווח באנונימיות",
};

=======
>>>>>>> f2fece9 (most of ReportInjustice UI's frame, more css and submission to come)
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
<<<<<<< HEAD
        : [localization.no_schools_found]
=======
        : ["לא נמצאו בתי ספר במאגר!"]
>>>>>>> f2fece9 (most of ReportInjustice UI's frame, more css and submission to come)
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
<<<<<<< HEAD
          renderInput={(params) => (
            <TextField {...params} label={localization.city} />
          )}
=======
          renderInput={(params) => <TextField {...params} label="עיר" />}
>>>>>>> f2fece9 (most of ReportInjustice UI's frame, more css and submission to come)
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
<<<<<<< HEAD
              label={
                selectedSchool.city
                  ? localization.school
                  : localization.no_city_selected
              }
=======
              label={selectedSchool.city ? "בית ספר" : "אנא בחרו עיר קודם!"}
>>>>>>> f2fece9 (most of ReportInjustice UI's frame, more css and submission to come)
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
<<<<<<< HEAD
=======
  helperText: string;
>>>>>>> f2fece9 (most of ReportInjustice UI's frame, more css and submission to come)
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
<<<<<<< HEAD
=======
      helperText={props.helperText}
>>>>>>> f2fece9 (most of ReportInjustice UI's frame, more css and submission to come)
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
<<<<<<< HEAD
  state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
=======
  helperText: string;
>>>>>>> f2fece9 (most of ReportInjustice UI's frame, more css and submission to come)
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
<<<<<<< HEAD
=======
      helperText={props.helperText}
>>>>>>> f2fece9 (most of ReportInjustice UI's frame, more css and submission to come)
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
<<<<<<< HEAD
      />
    </div>
  );
}
function TeacherDetails(props: { phoneLabel: string; emailLabel: string }) {
  return (
    <FormGroup className="teacher-details">
      <FormControl className="teacher-name">
        <TextField label={localization.name_of_school_worker} />{" "}
        {/* replace with autocomplete when we have more data */}
      </FormControl>
      <FormControl className="teacher-phone-number">
        <PhoneNumberInput label={props.phoneLabel} icon={<ContactPhone />} />
      </FormControl>
      <FormControl className="teacher-email">
        <EmailInput label={props.emailLabel} icon={<AlternateEmail />} />
=======
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
>>>>>>> f2fece9 (most of ReportInjustice UI's frame, more css and submission to come)
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
<<<<<<< HEAD
    const payload = {
      city: "",
      school: "",
      schoolWorkerName: "",
      schoolWorkerPhone: "",
      schoolWorkerEmail: "",
      dateOfOccurence: new Date(),
      occurrenceContent: "",
    };
=======
    // const payload = {
    //   city: "",
    //   school: "",
    //   schoolWorkerName: "",
    //   schoolWorkerPhone: "",
    //   schoolWorkerEmail: "",
    //   dateOfOccurence: new Date(),
    //   occurrenceContent: "",
    // };
>>>>>>> f2fece9 (most of ReportInjustice UI's frame, more css and submission to come)
  }

  return (
    <div className="report-injustice">
<<<<<<< HEAD
      <span>{localization.title}</span>
=======
      <span>PLACEHOLDER</span>
>>>>>>> f2fece9 (most of ReportInjustice UI's frame, more css and submission to come)
      <form>
        <div className="prelude">
          <Card>
            <Typography
              variant="h6"
              color="text.secondary"
              onClick={() => setExpandPrelude(!expandPrelude)}
            >
              {expandPrelude ? <ExpandLess /> : <ExpandMore />}
<<<<<<< HEAD
              {localization.prelude_title}
=======
              פרטי בית הספר ועובד ההוראה
>>>>>>> f2fece9 (most of ReportInjustice UI's frame, more css and submission to come)
            </Typography>
            <Collapse in={expandPrelude}>
              <CityAndSchool cities={cities} />
              <TeacherDetails
<<<<<<< HEAD
                phoneLabel={localization.phone_of_school_worker_label}
                emailLabel={localization.email_of_school_worker_label}
=======
                phoneLabel="PLACEHOLDER"
                phoneHelperText="PLACEHOLDER"
                emailLabel="PLACEHOLDER"
                emailHelperText="PLACEHOLDER"
>>>>>>> f2fece9 (most of ReportInjustice UI's frame, more css and submission to come)
              />
            </Collapse>
          </Card>
        </div>

        <DateContentInput
          setExpandPreludeRef={setExpandPrelude}
          containerClassName="content"
<<<<<<< HEAD
          dateLabel={localization.date_of_occurrence_label}
          contentLabel={localization.content_of_occurrence_label}
=======
          dateLabel="PLACEHOLDER"
          contentLabel="PLACEHOLDER"
>>>>>>> f2fece9 (most of ReportInjustice UI's frame, more css and submission to come)
        />
      </form>
      <div className="submit">
        <Button color="primary" variant="outlined" onClick={() => submit()}>
<<<<<<< HEAD
          {localization.report_button}
=======
          דיווח
>>>>>>> f2fece9 (most of ReportInjustice UI's frame, more css and submission to come)
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => submit(true)}
        >
<<<<<<< HEAD
          {localization.report_anon_button}
=======
          דיווח באנונימיות
>>>>>>> f2fece9 (most of ReportInjustice UI's frame, more css and submission to come)
        </Button>
      </div>
    </div>
  );
}
