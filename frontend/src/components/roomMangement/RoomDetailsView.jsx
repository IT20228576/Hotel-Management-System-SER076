import React from 'react'
import { Container } from 'react-bootstrap'
import room from '../image/r1.png'

const RoomDetailsView = () => {
  const mystyle = {
    display:"flex",
    flexDirection:"row",
    gap:"2rem",
    border: "solid",
    padding:"3rem"
  };
  return (
    <Container>
      <h2>Rooms</h2>
      <div style={{display:"flex", justifyContent:"center"}}>
      <div style={mystyle}>
        <div style={{width:"45rem"}}>
          <div> <p>Premium Terrace King Room</p></div>
          <div> <p>Room Name: Premium Terrace</p></div>
          <div> <p>Room Type: King Room</p></div>
          <div> <p>Room Price: 10,000 LKR</p></div>
          <div> <p>Description: masterfully designed to bring you exceptional luxuries & comforts, our seven premium rooms promise an idyllic stay.</p></div>
        </div>
        <div><img src={room} style={{width:"30rem"}}/></div>
      </div>
      </div>
      
    </Container>
  )
}

export default RoomDetailsView