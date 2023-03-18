import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";
import { SetStateAction } from "react";

export default function DateContentInput(props: {
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
  invalidity: [string[], React.Dispatch<SetStateAction<string[]>>];
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
  const [checkAgains, setCheckAgains] = props.invalidity;

  return (
    <div className={props.containerClassName}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
        <DatePicker
          label={props.dateLabel}
          className="date-content"
          onChange={(e: any, ctx: any) => {
            setDate(e.$d);
          }}
          defaultValue={dayjs(Date.now())}
          value={dayjs(date)}
          maxDate={dayjs(Date.now())}
        />
      </LocalizationProvider>
      <TextField
        error={checkAgains.includes("incidentContent")}
        onFocus={collapsePrelude}
        multiline={true}
        className="text-field-content"
        label={props.contentLabel}
        minRows={5}
        maxRows={15}
        onChange={(e) => {
          setCheckAgains(
            checkAgains.filter((entry) => entry != "incidentContent")
          );
          setContent(e.target.value);
        }}
      />
    </div>
  );
}
