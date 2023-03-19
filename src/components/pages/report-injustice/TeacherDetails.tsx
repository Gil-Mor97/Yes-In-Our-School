import { ContactPhone, AlternateEmail } from "@mui/icons-material";
import {
  TextField,
  InputAdornment,
  FormGroup,
  FormControl,
} from "@mui/material";
import { AsYouType, isValidNumberForRegion } from "libphonenumber-js";
import React, { SetStateAction, useState } from "react";
import { localization } from "./util";

function PhoneNumberInput(props: {
  state: [string, React.Dispatch<SetStateAction<string>>];
  errorState: [string[], React.Dispatch<SetStateAction<string[]>>];
  label: string;
  icon: JSX.Element;
  variant?: "standard" | "filled" | "outlined" | undefined;
}) {
  const [phoneNumber, setPhoneNumber] = props.state;
  const [invalidPhoneNumber, setInvalidPN] = useState(false);
  const [checkAgains, setCheckAgains] = props.errorState;
  const handleInput = (e: any) => {
    setPhoneNumber(new AsYouType("IL").input(e.target.value));
    setCheckAgains(checkAgains.filter((entry) => entry != "schoolWorkerPhone"));
  };
  const validateInput = (e: any) => {
    if (!phoneNumber) return setInvalidPN(false);
    isValidNumberForRegion(phoneNumber, "IL")
      ? setInvalidPN(false)
      : setInvalidPN(true);
  };

  return (
    <TextField
      error={checkAgains.includes("schoolWorkerPhone") || invalidPhoneNumber}
      label={props.label}
      variant={props.variant}
      id="phone-number"
      helperText={invalidPhoneNumber ? localization.invalid_phone : null}
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
  errorState: [string[], React.Dispatch<SetStateAction<string[]>>];
  label: string;
  icon: JSX.Element;
  variant?: "standard" | "filled" | "outlined" | undefined;
}) {
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [email, setEmail] = props.state;
  const [checkAgains, setCheckAgains] = props.errorState;
  const handleInput = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
    setCheckAgains(checkAgains.filter((entry) => entry != "schoolWorkerEmail"));
  };
  const validateInput = (e: any) => {
    if (!email || email == "") return setInvalidEmail(false);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailRegex)) setInvalidEmail(true);
  };

  return (
    <TextField
      label={props.label}
      error={checkAgains.includes("schoolWorkerEmail") || invalidEmail}
      variant={props.variant}
      id="email"
      onChange={handleInput}
      onBlur={validateInput}
      value={email}
      helperText={invalidEmail ? localization.invalid_email : null}
      placeholder="example@domain.xyz"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{props.icon}</InputAdornment>
        ),
      }}
    />
  );
}

export default function TeacherDetails(props: {
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
  invalidity: [string[], React.Dispatch<SetStateAction<string[]>>];
  phoneLabel: string;
  emailLabel: string;
}) {
  const [name, setName] = props.states.name;
  const [checkAgains, setCheckAgains] = props.invalidity;

  return (
    <FormGroup className="teacher-details">
      <FormControl className="teacher-name">
        <TextField
          error={checkAgains.includes("schoolWorkerName")}
          label={localization.name_of_school_worker}
          onChange={(e) => {
            setCheckAgains(
              checkAgains.filter((entry) => entry != "schoolWorkerName")
            );
            setName(e.target.value);
          }}
        />
        {/* replace with autocomplete when we have more data maybe */}
      </FormControl>
      <FormControl className="teacher-phone-number">
        <PhoneNumberInput
          errorState={props.invalidity}
          state={props.states.phone}
          label={props.phoneLabel}
          icon={<ContactPhone />}
        />
      </FormControl>
      <FormControl className="teacher-email">
        <EmailInput
          errorState={props.invalidity}
          state={props.states.email}
          label={props.emailLabel}
          icon={<AlternateEmail />}
        />
      </FormControl>
    </FormGroup>
  );
}
