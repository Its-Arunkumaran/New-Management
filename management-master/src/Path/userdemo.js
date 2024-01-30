import {
  Box,
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
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
const tableStyle = {
  marginTop: "200px",
};

const initialValues = {
  employeeName: "",
  date: "",
  timeIn: "",
  timeOut: "",
  taskInformation: "",
};
const lablename = [
  "Employee Name",
  "Date",
  "Time In",
  "Time Out",
  "Task Information",
  "Actions",
];
const Content = () => {
  const [open, setopen] = useState(false);
  const functionopenpopup = () => {
    setopen(true);
  };
  const closepopup = () => {
    setopen(false);
  };
  const [values, setValues] = useState(initialValues);
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // const [tableData, setTableData] = useState([]);
  // const [tableView, setTableView] = useState(false);
  // const tableDataView = () => {
  //   setTableView(true);
  // };
  const handleinputchange = (e, label) => {
    console.log(e, "value");
    setValues({ ...values, [label]: e.target.value });
  };
  const handleDatechange = (e) => {
    console.log(e);
    const getDate = e.$d.toLocaleDateString("en-GB");
    setValues({ ...values, date: getDate });
    // console.log(e.$d.toLocaleDateString(), "event")
    // console.log(moment(values.date).format('DD-MM-YYYY'),"ak");
    // setValues({...values,date: e.$d })
  };

  const handleTimechange = (e, label) => {
    const getTime = e.$d.toLocaleTimeString([], {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    });
    setValues({ ...values, [label]: getTime });
  };

  useEffect(() => {
    fetch("http://localhost:4000")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    if (refresh) {
      fetch("http://localhost:4000")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPosts(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    setRefresh(false);
  }, [refresh]);
  console.log(posts);

  ///////
  const handleSubmit = async () => {
    console.log(values);
    if (
      values.employeeName &&
      values.date &&
      values.timeIn &&
      values.timeOut &&
      values.taskInformation
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
      }
      setValues("");
      closepopup();
      // const result = await response.json();
      // setTableData([...tableData, values]);
      // tableDataView();
    } else {
      alert("Please fill the details");
      // closepopup();
    }
  };
  const item = [
    {
      component: "DatePicker",
      label: (
        <DatePicker
          label="Date"
          required
          onChange={handleDatechange}
          format="DD-MM-YYYY"
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
        />
      ),
    },
  ];

  const handleEdit = async (row) => {
    try {
      console.log(row, "Edit clicked", posts);
      const response = await fetch(`http://localhost:4000/${row._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setRefresh(true);
      }
      // Handle success/failure based on the response from the backend
      console.log(data); // Response from the backend
    } catch (error) {
      console.error("Error:", error);
    }
  };

  ///////
  const handleDelete = async (row) => {
    try {
      // const updatedItems = posts.filter((item) => item._id !== row._id);
      // console.log(updatedItems, "updateitems");
      // // setValues(updatedItems);
      // setPosts(updatedItems);
      /////
      console.log(row, "delete clicked", posts);
      const response = await fetch(`http://localhost:4000/${row._id}`, {
        method: "DELETE",
        // Optionally, add headers or a request body if needed
      });
      const data = await response.json();
      if (response.ok) {
        setRefresh(true);
      }
      // Handle success/failure based on the response from the backend
      console.log(data); // Response from the backend
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //////
  // const handleDelete = (row) => {
  //   console.log(row, "delete clicked", posts);
  //   const updatedItems = posts.filter((item) => item._id !== row._id);
  //   console.log(updatedItems, "updateitems");
  //   setValues(updatedItems);
  //   setPosts(updatedItems);
  // };
  const customButtonStyle = {
    color: "white",
  };
  return (
    <Box variant="form" flex={3} mt={2}>
      <Button
        onClick={functionopenpopup}
        variant="contained"
        startIcon={<PersonAddIcon />}
      >
        Add user
      </Button>
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
              // defaultValue={values.employeeName}
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
              // defaultValue={values.employeeName}
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
                {lablename.map((lablename, index) => (
                  <TableCell style={customButtonStyle} align="center">
                    {lablename}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell align="center" component="th" scope="row">
                    {row.employeeName}
                  </TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">{row.timeIn}</TableCell>
                  <TableCell align="center">{row.timeOut}</TableCell>
                  <TableCell align="center">{row.taskInformation}</TableCell>
                  <TableCell align="center">
                    {" "}
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
