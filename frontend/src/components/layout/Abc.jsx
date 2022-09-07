import React from "react";
import "../layout/Styles/PopUpStyles.css";
import { Modal, Button, Table } from "react-bootstrap";

function PopUpViewTemplate(props) {
  const { handleModalClose } = props;
  // const sampleData = [
  //   { title: "a", data: "AB" },
  //   { title: "sample2", data: "CD" },
  //   { title: "sample3", data: "EF" },
  // ];

  // var listData = sampleData.map((item, index) => {
  //   return (
  //     <tr key={index}>
  //       <td style={{ backgroundColor: "#D3D3D3" }}>
  //         <b>{item.title}</b>
  //       </td>
  //       <td>{item.data}</td>
  //     </tr>
  //   );
  // });

  return (
    <>
      <Modal
        dialogClassName="my-modal"
        show={true}
        onHide={handleModalClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>View Template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered responsive>
            <tbody>
              <tr>
         <td style={{ backgroundColor: "#D3D3D3" }}>
           <b>a</b>
         </td>
        <td>b</td>
       </tr>
       <tr>
         <td style={{ backgroundColor: "#D3D3D3" }}>
           <b>a</b>
         </td>
        <td>b</td>
       </tr>
       </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <a href='/'><Button variant="danger" onClick={handleModalClose}>
            Close
          </Button></a>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopUpViewTemplate;
