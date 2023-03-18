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

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="דף הבית" />
    </ListItemButton>
    <ListItemButton component={Link} to="/report-injustice">
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="דיווח על מורה שנפגע" />
    </ListItemButton>
    <ListItemButton component={Link} to="/democratic-content">
      <ListItemIcon>
        <TocIcon />
      </ListItemIcon>
      <ListItemText primary="תוכן דמוקרטי" />
    </ListItemButton>
    <ListItemButton component={Link} to="/schools">
      <ListItemIcon>
        <SchoolIcon />
      </ListItemIcon>
      <ListItemText primary="בתי ספר" />
    </ListItemButton>
  </React.Fragment>
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
