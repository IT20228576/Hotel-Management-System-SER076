import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import PrintIcon from "@mui/icons-material/Print";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ReservationReport() {
  const [details, setDetails] = useState([]);
  const componentRef = useRef();
  const navigate = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Reservations-Report",
  });

  const handleBack = () => {
    navigate("/reservations");
  };

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

  var dataList = details.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.referenceNumber}</td>
        <td>{item.firstName + " " + item.lastName}</td>
        <td>{item.mobile}</td>
        <td>{item.checkinDate.substring(0, 10)}</td>
        <td>{item.checkoutDate.substring(0, 10)}</td>
      </tr>
    );
  });

  return (
    <div className="container">
      <div className="mt-5">
        <Button className="btn btn-light ms-2" onClick={handleBack}>
          <ArrowBackIcon />
        </Button>
        <Button className="btn btn-secondary ms-2" onClick={handlePrint}>
          <PrintIcon />
        </Button>
      </div>
      <div ref={componentRef}>
        <div className="container-fluid mt-3">
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
              </tr>
            </thead>
            <tbody>{dataList}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ReservationReport;
