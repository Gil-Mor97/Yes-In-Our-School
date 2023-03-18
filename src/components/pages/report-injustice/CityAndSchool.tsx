import { FormGroup, FormControl, Autocomplete, TextField } from "@mui/material";
import React, { SetStateAction, useState } from "react";
import { db } from "../../../data/Db";
import { localization } from "./util";

export default function CityAndSchool(props: {
  state: [
    { school: string; city: string },
    React.Dispatch<SetStateAction<{ school: string; city: string }>>
  ];
  invalidity: [string[], React.Dispatch<SetStateAction<string[]>>];
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
        : [localization.no_schools_found]
    );
  }

  const [checkAgains, setCheckAgains] = props.invalidity;

  // first pick city, then pick school
  const [selectedSchool, setSchool] = props.state;
  const changeCity = (_, value: string | null) => {
    setSchool({
      school: "",
      city: (value ||= ""),
    });
    setCheckAgains(checkAgains.filter((entry) => entry != "city"));
    getSchools(value);
  };
  const changeSchool = (_, value: string | null) => {
    if (!selectedSchool.city) return;
    setSchool({
      school: (value ||= ""),
      city: selectedSchool.city,
    });
    setCheckAgains(checkAgains.filter((entry) => entry != "school"));
  };

  return (
    <FormGroup className="select-city-school">
      <FormControl className="select-city">
        <Autocomplete
          options={props.cities}
          renderInput={(params) => (
            <TextField
              {...params}
              error={checkAgains.includes("city")}
              label={localization.city}
              value={selectedSchool.city}
            />
          )}
          onChange={changeCity}
        />
      </FormControl>
      <FormControl className="select-school">
        <Autocomplete
          disabled={selectedSchool.city ? false : true}
          value={selectedSchool.school}
          options={schools}
          renderInput={(params) => (
            <TextField
              {...params}
              error={checkAgains.includes("school")}
              label={
                selectedSchool.city
                  ? localization.school
                  : localization.no_city_selected
              }
            />
          )}
          onChange={changeSchool}
        />
      </FormControl>
    </FormGroup>
  );
}
