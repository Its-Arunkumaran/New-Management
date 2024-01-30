import {
  Box,
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  // Autocomplete,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import React, { useState, useEffect } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
//STYLES
const tableStyle = {
  marginTop: "110px",
};
const customButtonStyle = {
  color: "white",
};
//DATE
const date = new Date();
const formattedDate = dayjs(date).format("MM-DD-YYYY");
console.log(formattedDate);
///time
// const now = new Date();
// const localTime = now.toLocaleTimeString([], {
//       hour12: true,
//       hour: "2-digit",
//       minute: "2-digit",
//     });
const initialValues = {
  employeeName: "",
  date: "",
  timeIn: "",
  timeOut: "",
  taskInformation: "",
};
// const lablename = [
//   "Employee Name",
//   "Date",
//   "Time In",
//   "Time Out",
//   "Task Information",
//   "Actions",
// ];

const Content = () => {
  const [open, setopen] = useState(false);
  const functionopenpopup = () => {
    setopen(true);
  };

  const closepopup = () => {
    setopen(false);
    setValues({});
    seteditValue(false);
  };

  const [values, setValues] = useState(initialValues);
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [editValue, seteditValue] = useState(false);
  // const [search, setSearch] = useState("");
  const [header, setheader] = useState([]);
  const [filteredPost, setFilteredPost] = useState(posts);
  const [searchInput, setSearchInput] = useState("");

  const onchangePosts = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchInput(inputValue);
    if (inputValue === "") {
      setFilteredPost(posts);
    } else {
      const filteredData = posts.filter((post) =>
        Object.values(post).some((value) =>
          value.toString().toLowerCase().includes(inputValue)
        )
      );
      setFilteredPost(filteredData);
    }
  };
  ///////////////////
  const filteredKeys = (data) =>
    Object.keys(data).filter(
      (key) => !["_id", "createdAt", "updatedAt", "__v"].includes(key)
    );
  /////fetch data
  const refreshState = () => {
    fetch("http://localhost:4000")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
        if (searchInput === "") {
          setFilteredPost(data);
        } else {
          const filteredData = posts.filter((post) =>
            Object.values(post).some((value) =>
              value.toString().toLowerCase().includes(searchInput)
            )
          );
          setFilteredPost(filteredData);
        }
        setheader(filteredKeys(data[0]));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  console.log(header, "filt");
  ///HANDLE INPUT CHANGE
  const handleinputchange = (e, label) => {
    console.log(e, "value");
    setValues({ ...values, [label]: e.target.value });
  };
  ///HANDLE DATE CHANGE
  const handleDatechange = (e) => {
    console.log(e);
    const getDate = e.$d.toLocaleDateString("en-GB");
    setValues({ ...values, date: getDate });
  };
  ///HANDLE TIME CHANGE
  const handleTimechange = (e, label) => {
    const getTime = e.$d.toLocaleTimeString([], {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    });
    console.log(e);
    setValues({ ...values, [label]: getTime });
  };

  /// Convert time for EDIT

  function convertTimeToISO(timeString, dateString) {
    const time = dayjs(timeString, "hh:mm A");
    const date = dayjs(dateString);

    const combinedDateTime = date
      .set("hour", time.hour())
      .set("minute", time.minute());

    return combinedDateTime.format("YYYY-MM-DDTHH:mm");
  }
  ///ITEM MAPPING
  const item = [
    {
      component: "DatePicker",
      label: (
        <DatePicker
          label="Date"
          required={false}
          onChange={handleDatechange}
          format="DD-MM-YYYY"
          defaultValue={values.date ? dayjs(values.date) : dayjs(formattedDate)}
        />
      ),
    },
    {
      component: "TimePicker",
      name: "timeIn",
      label: (
        <TimePicker
          label="Time In"
          required
          onChange={(e) => handleTimechange(e, "timeIn")}
          defaultValue={
            values.timeIn ? dayjs(values.timeIn) : dayjs("2022-04-17T10:00")
          }
        />
      ),
    },
    {
      component: "TimePicker",
      name: "timeOut",
      label: (
        <TimePicker
          label="Time Out"
          required
          onChange={(e) => handleTimechange(e, "timeOut")}
          defaultValue={
            values.timeIn ? dayjs(values.timeOut) : dayjs("2022-04-17T19:00")
          }
        />
      ),
    },
  ];
  //RESPONSE
  useEffect(() => {
    refreshState();
  }, []);

  useEffect(() => {
    if (refresh) {
      refreshState();
    }
    setRefresh(false);
  }, [refresh]);
  console.log(posts);
  //HANDLE SUBMIT
  const handleSubmit = async () => {
    console.log(values);
    if (
      values.employeeName &&
      // values.date &&
      values.timeIn &&
      values.timeOut &&
      values.taskInformation &&
      !editValue
    ) {
      const response = await fetch("http://localhost:4000", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response, "response");
      if (response.ok) {
        setRefresh(true);
        setValues({});
        closepopup();
      }
    } else if (editValue) {
      ////EDIT VALUE---------
      try {
        // console.log(row, "Edit clicked", posts);
        const response = await fetch(`http://localhost:4000/${values.id}`, {
          method: "PATCH",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setRefresh(true);
        }
        console.log(values.timeIn);

        console.log(data);
        setValues({});
        seteditValue(false);
        closepopup();
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please fill the details");
    }
  };
  //HANDLE EDIT
  const handleEdit = async (row) => {
    setopen(true);
    setValues({
      id: row._id,
      employeeName: row.employeeName,
      date: dayjs(row.date, "DD-MM-YYYY").format("MM-DD-YYYY"),
      // timeIn: row.timeIn,
      // timeOut: row.timeOut,
      timeIn: convertTimeToISO(row.timeIn, formattedDate),
      timeOut: convertTimeToISO(row.timeOut, formattedDate),
      taskInformation: row.taskInformation,
    });
    console.log(convertTimeToISO(row.timeIn, date));
    seteditValue(true);
    console.log(row, "row");
  };
  ///HANDLE DELETE
  const handleDelete = async (row) => {
    try {
      console.log(row, "delete clicked", posts);
      const response = await fetch(`http://localhost:4000/${row._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        setRefresh(true);
      }
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(values, "value");
  return (
    <Box variant="form" flex={3} mt={2}>
      <Box display="flex" justifyContent="space-between">
        <TextField
          // value={search.toLocaleLowerCase()}
          onChange={onchangePosts}
          id="outlined-search"
          label="Search Name"
          type="search"
        />

        <Button
          onClick={functionopenpopup}
          variant="contained"
          startIcon={<PersonAddIcon />}
        >
          Add user
        </Button>
      </Box>
      <Dialog open={open}>
        <DialogTitle>Daily Activity Report</DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <TextField
              id="outlined-basic"
              label="Employee Name"
              variant="outlined"
              name="employeeName"
              require
              defaultValue={values.employeeName}
              onChange={(e) => handleinputchange(e, "employeeName")}
            />{" "}
            {item.map((item, index) => (
              <LocalizationProvider dateAdapter={AdapterDayjs} key={index}>
                <DemoContainer components={[item.component]}>
                  {item.label}
                </DemoContainer>
              </LocalizationProvider>
            ))}
            <TextField
              id="outlined-basic"
              label="Task"
              variant="outlined"
              required
              defaultValue={values.taskInformation}
              onChange={(e) => handleinputchange(e, "taskInformation")}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
          <Button onClick={closepopup} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {
        <TableContainer component={Paper} style={tableStyle}>
          <Table
            sx={{ minWidth: 1000 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead
              style={{ backgroundColor: "rgb(21, 101, 192)", color: "red" }}
            >
              <TableRow>
                {header.map((key) => (
                  <TableCell style={customButtonStyle} align="center" key={key}>
                    {key}
                  </TableCell>
                ))}
                <TableCell
                  style={customButtonStyle}
                  align="center"
                  key="actions"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPost.map((row, index) => (
                <TableRow key={index}>
                  {header.map((data, dataIndex) => (
                    <TableCell align="center" key={dataIndex}>
                      {row[data]}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <span
                      onClick={() => handleEdit(row)}
                      style={{ color: "green", padding: 15 }}
                      variant="contained"
                    >
                      <EditNoteIcon />
                    </span>
                    <span
                      onClick={() => handleDelete(row)}
                      style={{ color: "red" }}
                      variant="contained"
                    >
                      <DeleteIcon />
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </Box>
  );
};

export default Content;
