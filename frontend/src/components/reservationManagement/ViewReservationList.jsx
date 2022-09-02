import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ReservationPopup from "./ReservationPopup";
import axios from "axios";

function ViewReservationList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [details, setDetails] = useState([]);
  const [reservationInfo, setReservationInfo] = useState([]);

  async function getAllData() {
    try {
      await axios
        .get("http://localhost:8000/reservations/getAll")
        .then((res) => {
          if (res.status === 200) {
            setDetails(res.data.data);
          }
        });
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  useEffect(() => {
    getAllData();
  }, []);

  async function deleteReservation(detail) {
    try {
      if (window.confirm("This Reservation Will Be Deleted!")) {
        await axios
          .delete(`http://localhost:8000/reservations/delete/${detail._id}`)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              alert(res.data.message);
              getAllData();
            }
          });
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSearch = async (e) => {
    const searchTerm = e.target.value;
    try {
      if (searchTerm) {
        await axios
          .get(`http://localhost:8000/reservations/search/${searchTerm}`)
          .then((res) => {
            if (res.status === 200) {
              setDetails(res.data.data);
            }
          });
      } else {
        getAllData();
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  var dataList =
    details.length > 0 ? (
      details.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.referenceNumber}</td>
            <td>{item.firstName + " " + item.lastName}</td>
            <td>{item.mobile}</td>
            <td>{item.checkinDate.substring(0, 10)}</td>
            <td>{item.checkoutDate.substring(0, 10)}</td>
            <td className="d-flex justify-content-center">
              <button
                className="btn btn-outline-secondary"
                onClick={() => {
                  setModalOpen(true);
                  setReservationInfo(item);
                }}
              >
                <RemoveRedEyeIcon />
              </button>
              &nbsp;
              <a href={`/#`} style={{ textDecoration: "none" }}>
                <i className="btn btn-outline-warning">
                  <EditIcon />
                </i>
                &nbsp;
              </a>
              &nbsp;
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  deleteReservation(item);
                }}
              >
                <DeleteIcon />
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <div
        className="notify"
        style={{
          position: "absolute",
          left: "30%",
          right: "30%",
          top: "50%",
          bottom: "50%",
          fontSize: "40px",
          fontWeight: "bold",
        }}
      >
        No Result Found
      </div>
    );

  return (
    <div className="container">
      <div>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light">
            <h1
              className="navbar-brand"
              style={{
                marginRight: "80px",
                marginLeft: "80px",
                fontSize: "32px",
              }}
            >
              Reservations
            </h1>
            <a href="/reservations/add" style={{ marginRight: "10px" }}>
              <button
                className="btn btn-outline-success my-1 my-sm-0"
                type="submit"
              >
                <AddCircleIcon /> Add
              </button>
            </a>
            <a href="/#" style={{ marginRight: "10px" }}>
              <button
                className="btn btn-outline-primary my-2 my-sm-0"
                type="submit"
              >
                <SummarizeIcon /> Report
              </button>
            </a>

            <div style={{ marginLeft: "400px" }}>
              <form className="form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  placeholder="Search"
                  type="search"
                  name="searchQuery"
                  onChange={handleSearch}
                ></input>
              </form>
            </div>
          </nav>
        </div>
      </div>
      <table className="table table-hover" style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th scope="col">
              <b>Reference Number</b>
            </th>
            <th scope="col">
              <b>Name</b>
            </th>
            <th scope="col">
              <b>Phone Number</b>
            </th>
            <th scope="col">
              <b>Check-in</b>
            </th>
            <th scope="col">
              <b>Check-out</b>
            </th>
            <th scope="col">
              <b>Actions</b>
            </th>
          </tr>
        </thead>
        <tbody>{dataList}</tbody>
      </table>
      {modalOpen === true ? (
        <ReservationPopup
          handleModalClose={handleModalClose}
          reservationInfo={reservationInfo}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default ViewReservationList;
