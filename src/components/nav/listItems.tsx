import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReportIcon from "@mui/icons-material/Report";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import TocIcon from "@mui/icons-material/Toc";
import { Link } from "react-router-dom";
import mdTheme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "./listitems.css";

export const mainListItems = (
  <ThemeProvider theme={mdTheme}>
    <CssBaseline />
    <React.Fragment>
      <ListItemButton component={Link} to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText sx={{ textAlign: "right" }} primary="דף הבית" />
      </ListItemButton>
      <ListItemButton component={Link} to="/report-injustice">
        <ListItemIcon>
          <ReportIcon />
        </ListItemIcon>
        <ListItemText
          sx={{ textAlign: "right" }}
          primary="דיווח על תקרית בביה''ס"
        />
      </ListItemButton>
      <ListItemButton component={Link} to="/democratic-content">
        <ListItemIcon>
          <TocIcon />
        </ListItemIcon>
        <ListItemText
          sx={{ textAlign: "right" }}
          primary="חיפוש תכנים דמוקרטיים"
        />
      </ListItemButton>
      <ListItemButton component={Link} to="/schools">
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText sx={{ textAlign: "right" }} primary="קבוצת הורים" />
      </ListItemButton>
      <ListItemButton component={Link} to="/schools">
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText
          sx={{ textAlign: "right" }}
          primary="חיפוש מידע על עמותות"
        />
      </ListItemButton>
    </React.Fragment>
  </ThemeProvider>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </React.Fragment>
);
