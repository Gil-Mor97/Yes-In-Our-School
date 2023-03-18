import { AuthContext } from "../../../context/AuthContext";
import { db } from "../../../data/Db";
import Incident from "../../../types/iincident.types";
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
import "dayjs/locale/he";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { ScaleLoader } from "react-spinners";

import "./ReportInjustice.css";
import { localization } from "./util";
import CityAndSchool from "./CityAndSchool";
import TeacherDetails from "./TeacherDetails";
import DateContentInput from "./DateAndContent";

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
  const [expandDateAndContent, setExpandDateAndContent] = useState(false);
  const [school, setSchool] = useState({ school: "", city: "" });
  const [schoolWorkerName, setSchoolWorkerName] = useState("");
  const [schoolWorkerPhone, setSchoolWorkerPhone] = useState("");
  const [schoolWorkerEmail, setSchoolWorkerEmail] = useState("");
  const [dateOfIncident, setDateOfIncident] = useState(new Date());
  const [incidentContent, setIncidentContent] = useState("");

  const [incidentSent, setIncidentSent] = useState(false);
  const [checkAgains, setCheckAgains] = useState([""]);
  const addIncident = async (payload: Incident) => {
    return await db.collection("incidents").add(payload);
  };
  const validatePayload = (
    payload: Incident
  ): { valid: boolean; invalids: string[] } => {
    let validFlag: boolean = true;
    let invalids: string[] = [];
    Object.entries(payload).forEach(([key, value]) => {
      if (["", undefined, null].includes(value)) {
        validFlag = false;
        invalids.push(key);
      }
    });
    return { valid: validFlag, invalids };
  };

  function submit(anon: boolean = false) {
    const payload_anon: Incident = {
      city: school.city,
      school: school.school,
      schoolWorkerName,
      schoolWorkerPhone,
      schoolWorkerEmail,
      dateOfIncident,
      incidentContent,
    };
    let validation = validatePayload(payload_anon);
    if (!validation.valid) {
      setCheckAgains(validation.invalids);
      setExpandPrelude(
        validation.invalids.includes(
          "city" ||
            "school" ||
            "schoolWorkerName" ||
            "schoolWorkerPhone" ||
            "schoolWorkerEmail"
        )
      );
      setExpandDateAndContent(
        validation.invalids.includes("incidentContent" || "dateOfIncident")
      );
      return console.warn(
        "invalid payload! not submitted:",
        validation.invalids
      );
    }

    addIncident(
      anon || !user || user.isAnonymous
        ? payload_anon
        : ({
            ...payload_anon,
            reporter: {
              uid: user.uid,
              email: user.email,
            },
          } as Incident)
    ).then((res) => {
      console.info("added new incident: ", res.id);

      setIncidentSent(true);
    });
  }

  return (
    <div className="report-injustice-container">
      {ready ? (
        <Card className="report-injustice">
          <h2>{localization.title}</h2>
          <form>
            <div className="prelude">
              <Card>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  onClick={() => setExpandPrelude(!expandPrelude)}
                >
                  {expandPrelude ? <ExpandLess /> : <ExpandMore />}
                  {localization.prelude_title}
                </Typography>
                <Collapse in={expandPrelude}>
                  <CityAndSchool
                    state={[school, setSchool]}
                    cities={cities}
                    invalidity={[checkAgains, setCheckAgains]}
                  />
                  <TeacherDetails
                    states={{
                      name: [schoolWorkerName, setSchoolWorkerName],
                      phone: [schoolWorkerPhone, setSchoolWorkerPhone],
                      email: [schoolWorkerEmail, setSchoolWorkerEmail],
                    }}
                    invalidity={[checkAgains, setCheckAgains]}
                    phoneLabel={localization.phone_of_school_worker_label}
                    emailLabel={localization.email_of_school_worker_label}
                  />
                </Collapse>
              </Card>
            </div>
            <Card>
              <Typography
                variant="h6"
                color="text.secondary"
                onClick={() => setExpandDateAndContent(!expandDateAndContent)}
              >
                {expandDateAndContent ? <ExpandLess /> : <ExpandMore />}
                {localization.date_and_content_title}
              </Typography>{" "}
              <Collapse in={expandDateAndContent}>
                <DateContentInput
                  states={{
                    date: [dateOfIncident, setDateOfIncident],
                    content: [incidentContent, setIncidentContent],
                  }}
                  invalidity={[checkAgains, setCheckAgains]}
                  setExpandPreludeRef={setExpandPrelude}
                  containerClassName="content"
                  dateLabel={localization.date_of_occurrence_label}
                  contentLabel={localization.content_of_occurrence_label}
                />
              </Collapse>
            </Card>
          </form>
          <div className="submit">
            <Button color="primary" variant="outlined" onClick={() => submit()}>
              {localization.report_button}
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => submit(true)}
            >
              {localization.report_anon_button}
            </Button>
          </div>
          <div className="feedback">
            {incidentSent ? (
              <Card>{localization.incident_reported_success}</Card>
            ) : null}
          </div>
        </Card>
      ) : (
        <span className="loading">
          <ScaleLoader />
        </span>
      )}
    </div>
  );
}
