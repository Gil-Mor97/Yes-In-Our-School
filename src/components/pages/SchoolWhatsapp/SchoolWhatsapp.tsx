import { db } from "../../../data/Db";
import React, { SetStateAction, useContext, useEffect, useState } from "react";
import {
  FormGroup,
  FormControl,
  Button,
  Card,
  Collapse,
  Typography,
} from "@mui/material";
import "dayjs/locale/he";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import "./SchoolWhatsapp.css";
import { getDatabase, ref, child, get } from "firebase/database";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import CityAndSchool from "../report-injustice/CityAndSchool";

declare global {
  interface Array<T> {
    unique(): Array<T>
  }
}
Array.prototype.unique = function () {
  return Array.from(new Set(this));
};

const localization =  {
  no_schools_found: "לא נמצאו מוסדות במאגר!",
  city: "עיר",
  school: "מוסד",
  no_city_selected: "אנא בחרו עיר קודם!",
  prelude_title: "פרטי המוסד",
  title: "חיפוש קבוצות הורים",
  findWhatsapp: "חיפוש קבוצה",
  no_whatsapp_found: "אין קבוצות וואטסאפ עבור המוסד",
  whatsapp_name: "שם הקבוצה",
  whatsapp_url: "קישור הקבוצה",
  whatsapp_description: "פרטי הקבוצה",
  submit_button: "שמירה",
  whatsapp_added_success: "הקבוצה נוצרה בהצלחה!"
};

interface IWhatsapp {
  whatsappId: string,
  school: string,
  whatsappName: string,
  whatsappUrl: string,
  whatsappDescription: string,
}

function SearchBySchool(props) {
  const [contentType, setContentType] = useState<string[]>([]);
  const [school, setSchool] = useState("");
  const [results, setResults] = useState<IWhatsapp[]>([]);
  const [schools, setSchools] = useState({ school: "", city: "" });
  const [cities, setCities] = useState([""]);
  const [checkAgains, setCheckAgains] = useState([""]);
  const [ready, setReady] = useState(false);
  const [expandPrelude, setExpandPrelude] = useState(true);

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

  async function searchWhatsapp(schoolName: string) {
    const whatsappRef = db.collection("whatsapp");
    schoolName = school;
    const whatsappDocs = (
      await whatsappRef
        .where("schoolName", "==", schoolName)
        .get()
    ).docs;
    console.log("whatsappDocs", whatsappDocs);
    setResults(
      whatsappDocs.map((x) => {
        const cont: IWhatsapp = {
          ...(x.data() as IWhatsapp),
          whatsappId: x.id,
        };
        return cont;
      })
    );
    console.log(results);
    console.log(schoolName , "schoolName");
  }

  async function search() {
    const payload = schools.school;
    console.log("payload", payload);
    searchWhatsapp(payload);
  }

  const cards = results.map((result, index) => {
    return (
      <Card key={"card_" + index} sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {localization[result.school]}
          </Typography>
          <Typography variant="h5" component="div"></Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {result.whatsappName}
          </Typography>
          <Typography variant="body2">{result.whatsappDescription}</Typography>
        </CardContent>
        <CardActions>
          <Button href={result.whatsappUrl} size="small">
            להצטרפות לקבוצה
          </Button>
        </CardActions>
      </Card>
    );
  });

  return  (
<div>
      <FormGroup className="teacher-details">
      <Collapse in={expandPrelude}>
                  <CityAndSchool
                    state={[schools, setSchools]}
                    cities={cities}
                    invalidity={[checkAgains, setCheckAgains]}                 
                  />
                  </Collapse>
        
        <FormControl>
          {" "}
        </FormControl>
        <Button color="secondary" variant="outlined" onClick={() => search()}>
          {localization.findWhatsapp}
        </Button>
      </FormGroup>
      <div className="results">{cards}</div>
    </div>
  );
}

export default function schoolWhatsapp() {
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
              בית ספר 
            </Typography>
            <Collapse in={expandPrelude}>
              <SearchBySchool />
            </Collapse>
          </Card>
        </div>
      </form>
    </div>
  );
}
