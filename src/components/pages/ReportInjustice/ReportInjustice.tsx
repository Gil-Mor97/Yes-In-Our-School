import React, { SetStateAction, useContext, useEffect, useState } from "react";
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
import { db } from "../../../data/Db";
import "./ReportInjustice.css";
import {
  ContactPhone,
  AlternateEmail,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { AuthContext } from "../../../context/AuthContext";
import { ScaleLoader } from "react-spinners";

// [1,2,2,3].unique() = [1,2,3]
declare global {
  interface Array<T> {
    unique(): Array<T>;
  }
}
Array.prototype.unique = function () {
  return Array.from(new Set(this));
};

//begone, inline hebrew!
const _localization = {
  no_schools_found: "לא נמצאו מוסדות במאגר!",
  city: "עיר",
  school: "מוסד",
  no_city_selected: "אנא בחרו עיר קודם!",
  prelude_title: "פרטי המוסד ועובד ההוראה",
  name_of_school_worker: "שם עובד ההוראה",
  title: "דיווח על מורה שנפגע",
  phone_of_school_worker_label: "מספר טלפון של עובד ההוראה",
  email_of_school_worker_label: 'כתובת הדוא"ל של עובד ההוראה',
  date_of_occurrence_label: "תאריך התקרית",
  content_of_occurrence_label: "פרטי התקרית",
  report_button: "דיווח",
  report_anon_button: "דיווח באנונימיות",
};

function CityAndSchool(props: {
  state: [
    { school: string; city: string },
    React.Dispatch<SetStateAction<{ school: string; city: string }>>
  ];
  cities: readonly string[];
}) {
  //fetch from db
  const [schools, setSchools] = useState([""]);
  async function getSchools(city: string) {
    const schoolsRef = db.collection("schools");
    const schools = (await schoolsRef.where("SETL_NAME", "==", city).get())
      .docs;
    setSchools(
      schools.length > 0
        ? schools.map((school) => school.data().NAME).unique()
        : [_localization.no_schools_found]
    );
  }

  // first pick city, then pick school
  const [selectedSchool, setSchool] = props.state;
  const changeCity = (_, value: any) => {
    setSchool({
      school: "",
      city: value,
    });
    getSchools(value);
  };
  const changeSchool = (_, value: string | null) => {
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
          renderInput={(params) => (
            <TextField {...params} label={_localization.city} />
          )}
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
              label={
                selectedSchool.city
                  ? _localization.school
                  : _localization.no_city_selected
              }
            />
          )}
          onChange={changeSchool}
        />
      </FormControl>
    </FormGroup>
  );
}

function PhoneNumberInput(props: {
  state: [string, React.Dispatch<SetStateAction<string>>];
  label: string;
  icon: JSX.Element;
  variant?: "standard" | "filled" | "outlined" | undefined;
}) {
  const [phoneNumber, setPhoneNumber] = props.state;
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
  state: [string, React.Dispatch<React.SetStateAction<string>>];
  label: string;
  icon: JSX.Element;
  variant?: "standard" | "filled" | "outlined" | undefined;
}) {
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [email, setEmail] = props.state;
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
  states: {
    date: [
      dateOfOccurence: Date,
      setDateOfOccurence: React.Dispatch<SetStateAction<Date>>
    ];
    content: [
      occurrenceContent: string,
      setOccurenceContent: React.Dispatch<SetStateAction<string>>
    ];
  };
  setExpandPreludeRef: any;
  containerClassName: string;
  dateLabel: string;
  contentLabel: string;
}) {
  const collapsePrelude = () => {
    props.setExpandPreludeRef(false);
  };
  const [date, setDate] = props.states.date;
  const [content, setContent] = props.states.content;
  return (
    <div className={props.containerClassName}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
        <DatePicker
          label={props.dateLabel}
          className="date-content"
          onChange={(e: any, ctx: any) => {
            // console.log(e.$d);
            setDate(e.$d);
          }}
        />
      </LocalizationProvider>
      <TextField
        onFocus={collapsePrelude}
        multiline={true}
        className="text-field-content"
        label={props.contentLabel}
        minRows={5}
        maxRows={15}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}

function TeacherDetails(props: {
  states: {
    name: [
      schoolWorkerName: string,
      setSchoolWorkerName: React.Dispatch<SetStateAction<string>>
    ];
    phone: [
      schoolWorkerPhone: string,
      setSchoolWorkerPhone: React.Dispatch<SetStateAction<string>>
    ];
    email: [
      schoolWorkerEmail: string,
      setSchoolWorkerEmail: React.Dispatch<SetStateAction<string>>
    ];
  };
  phoneLabel: string;
  emailLabel: string;
}) {
  const [name, setName] = props.states.name;
  const [phone, setPhone] = props.states.phone;
  const [email, setEmail] = props.states.email;

  return (
    <FormGroup className="teacher-details">
      <FormControl className="teacher-name">
        <TextField
          label={_localization.name_of_school_worker}
          onChange={(e) => setName(e.target.value)}
        />
        {/* replace with autocomplete when we have more data */}
      </FormControl>
      <FormControl className="teacher-phone-number">
        <PhoneNumberInput
          state={props.states.phone}
          label={props.phoneLabel}
          icon={<ContactPhone />}
        />
      </FormControl>
      <FormControl className="teacher-email">
        <EmailInput
          state={props.states.email}
          label={props.emailLabel}
          icon={<AlternateEmail />}
        />
      </FormControl>
    </FormGroup>
  );
}

export default function ReportInjustice() {
  //init
  const user = useContext(AuthContext);
  const [ready, setReady] = useState(false);
  const [cities, setCities] = useState([""]);
  useEffect(() => {
    //fetch cities on load
    async function getCities() {
      const citiesRef = db.collection("cities");
      const cities = (await citiesRef.get()).docs;
      setCities(cities.map((city) => city.data().name));
    }
    getCities()
      .catch(console.error)
      .then(() => setReady(true));
  }, []);

  //states
  const [expandPrelude, setExpandPrelude] = useState(true);
  const [school, setSchool] = useState({ school: "", city: "" });
  const [schoolWorkerName, setSchoolWorkerName] = useState("");
  const [schoolWorkerPhone, setSchoolWorkerPhone] = useState("");
  const [schoolWorkerEmail, setSchoolWorkerEmail] = useState("");
  const [dateOfOccurence, setDateOfOccurence] = useState(new Date());
  const [occurrenceContent, setOccurenceContent] = useState("");

  const addIncident = async (payload: Object) => {
    return await db
      .collection("incidents")
      .doc(crypto.randomUUID())
      .set(payload)
      .catch((e) => console.error);
  };

  function submit(anon: boolean = false) {
    const payload_anon = {
      city: school.city,
      school: school.school,
      schoolWorkerName,
      schoolWorkerPhone,
      schoolWorkerEmail,
      dateOfOccurence,
      occurrenceContent,
    };
    addIncident(
      anon || !user || user.isAnonymous
        ? payload_anon
        : {
            ...payload_anon,
            reporter: {
              uid: user.uid,
              email: user.email,
            },
          }
    );
    alert("Added new incident!");
  }

  return (
    <div className="report-injustice-container">
      {ready ? (
        <Card className="report-injustice">
          <span>{_localization.title}</span>
          <form>
            <div className="prelude">
              <Card>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  onClick={() => setExpandPrelude(!expandPrelude)}
                >
                  {expandPrelude ? <ExpandLess /> : <ExpandMore />}
                  {_localization.prelude_title}
                </Typography>
                <Collapse in={expandPrelude}>
                  <CityAndSchool state={[school, setSchool]} cities={cities} />
                  <TeacherDetails
                    states={{
                      name: [schoolWorkerName, setSchoolWorkerName],
                      phone: [schoolWorkerPhone, setSchoolWorkerPhone],
                      email: [schoolWorkerEmail, setSchoolWorkerEmail],
                    }}
                    phoneLabel={_localization.phone_of_school_worker_label}
                    emailLabel={_localization.email_of_school_worker_label}
                  />
                </Collapse>
              </Card>
            </div>
            <DateContentInput
              states={{
                date: [dateOfOccurence, setDateOfOccurence],
                content: [occurrenceContent, setOccurenceContent],
              }}
              setExpandPreludeRef={setExpandPrelude}
              containerClassName="content"
              dateLabel={_localization.date_of_occurrence_label}
              contentLabel={_localization.content_of_occurrence_label}
            />
          </form>
          <div className="submit">
            <Button color="primary" variant="outlined" onClick={() => submit()}>
              {_localization.report_button}
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => submit(true)}
            >
              {_localization.report_anon_button}
            </Button>
          </div>
        </Card>
      ) : (
        <ScaleLoader />
      )}
    </div>
  );
}
