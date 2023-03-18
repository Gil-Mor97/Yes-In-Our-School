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
import "./DemocraticContent.css";
import {
  ContactPhone,
  AlternateEmail,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import ICity from "../../../types/icity.types";
import { db } from "../../../data/Db";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";

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
const localization = {
  no_schools_found: "לא נמצאו מוסדות במאגר!",
  city: "עיר",
  school: "מוסד",
  no_city_selected: "אנא בחרו עיר קודם!",
  prelude_title: "פרטי המוסד ועובד ההוראה",
  name_of_school_worker: "שם עובד ההוראה",
  title: "חיפוש מערכי שיעור ותכנים בנושאי דמוקרטיה",
  phone_of_school_worker_label: "מספר טלפון של עובד ההוראה",
  email_of_school_worker_label: 'כתובת הדוא"ל של עובד ההוראה',
  date_of_occurrence_label: "תאריך התקרית",
  content_of_occurrence_label: "פרטי התקרית",
  report_button: "דיווח",
  report_anon_button: "דיווח באנונימיות",
  contentType: "מצאו לי",
  language: "שפה",
  languageEN: "אנגלית",
  languageHE: "עברית",
  video: "סרטון",
  movie: "סרט",
  lesson: "מערך שיעור",
  activity: "פעילות",
  presentation: "מצגת",
  info_source: "מקור מידע",
  keywords: "חיפוש לפי מילות מפתח",
  search: "חיפוש",
};

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
      />
    </div>
  );
}

interface IDemocraticContent {
  Authors: string;
  Content_type: string;
  Copyrights_type: string;
  Description: string;
  Keywords: string;
  Language: string;
  Last_update: string;
  Link: string;
  Name: string;
  Target_ages: string;
  id: string;
}

function SearchDetails(props) {
  const [contentType, setContentType] = useState<string[]>([]);
  const [language, setLanguage] = useState("");
  const [keywords, setKeywords] = useState("");
  const [results, setResults] = useState<IDemocraticContent[]>([]);

  const handleContentTypeChange = (
    event: SelectChangeEvent<typeof contentType>
  ) => {
    const {
      target: { value },
    } = event;
    setContentType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  async function searchPrograms(keyword: string) {
    const democraticContentRef = db.collection("Democratic_content");
    const democraticContentDocs = (
      await democraticContentRef
        .where("Keywords", ">=", keyword.toLocaleLowerCase())
        .where("Keywords", "<=", keyword.toLocaleLowerCase() + "~")
        .orderBy("Keywords", "asc")
        .get()
    ).docs;
    console.log("democraticContentDocs", democraticContentDocs);
    setResults(
      democraticContentDocs.map((x) => {
        const cont: IDemocraticContent = {
          ...(x.data() as IDemocraticContent),
          id: x.id,
        };
        return cont;
      })
    );
    console.log(results);
  }

  async function submit() {
    const payload = {
      contentType,
      language,
      keywords,
    };
    console.log("payload", payload);
    if (!keywords) return alert("נא להזין מילת מפתח");
    searchPrograms(keywords);
  }

  const cards = results.map((result, index) => {
    return (
      <Card key={"card_" + index} sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {localization[result.Content_type]}
          </Typography>
          <Typography variant="h5" component="div"></Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {result.Name}
          </Typography>
          <Typography variant="body2">{result.Description}</Typography>
        </CardContent>
        <CardActions>
          <Button href={result.Link} size="small">
            למעבר לתוכן
          </Button>
        </CardActions>
      </Card>
    );
  });

  return (
    <div>
      <FormGroup className="teacher-details">
        <Select
          multiple
          displayEmpty
          id="contentType-select"
          value={contentType}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>{localization.contentType}</em>;
            }

            return selected.map((x) => localization[x]).join(", ");
          }}
          onChange={handleContentTypeChange}
        >
          <MenuItem value="" disabled>
            <em>{localization.contentType}</em>
          </MenuItem>
          <MenuItem value={"movie"}>{localization.movie}</MenuItem>
          <MenuItem value={"video"}>{localization.video}</MenuItem>
          <MenuItem value={"lesson"}>{localization.lesson}</MenuItem>
          <MenuItem value={"activity"}>{localization.activity}</MenuItem>
          <MenuItem value={"presentation"}>
            {localization.presentation}
          </MenuItem>
          <MenuItem value={"info_source"}>{localization.info_source}</MenuItem>
        </Select>
        <InputLabel id="language-label">{localization.language}</InputLabel>
        <Select
          labelId="language-label"
          id="language-select"
          value={language}
          label={localization.language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          <MenuItem value="">{localization.language}</MenuItem>
          <MenuItem value={"EN"}>{localization.languageEN}</MenuItem>
          <MenuItem value={"HE"}>{localization.languageHE}</MenuItem>
        </Select>
        <FormControl>
          <TextField
            value={keywords}
            onChange={(event) => setKeywords(event.target.value)}
            label={localization.keywords}
          />{" "}
        </FormControl>
        <Button color="secondary" variant="outlined" onClick={() => submit()}>
          {localization.search}
        </Button>
      </FormGroup>
      <div className="results">{cards}</div>
    </div>
  );
}

export default function DemocraticContent() {
  const [expandPrelude, setExpandPrelude] = useState(true);

  return (
    <div>
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
              חיפוש תכנים דמוקרטיים
            </Typography>

            <Collapse in={expandPrelude}>
              <SearchDetails />
            </Collapse>
          </Card>
        </div>
      </form>
    </div>
  );
}
