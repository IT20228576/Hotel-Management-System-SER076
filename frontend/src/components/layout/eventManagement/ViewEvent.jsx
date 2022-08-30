import React, { Component } from 'react';
import axios from 'axios';

export default class ViewEvent extends Component {
    constructor(props){
        super(props);
        
        this.state={
        post:{}
        };
        }

componentDidMount(){

    const id = this.props.match.params.id;

    axios.get(`http://localhost:8000/event/${id}`).then((res) =>{
if(res.data.success){
this.setState({
post:res.data.post
});
console.log(this.state.post);


}
    });


}

render() {
const {EventName,EventType,EventDate,ClientName,EventStartDate,EventEndDate,NoOfParticipants,EventStatus,EventLocation,EventDescription,EventImage} = this.state.post;

return (



<div>
    
    <div>
    <h1>View event detail #{EventType}</h1>
    <hr/>






<div>

<label style={{}}>EventName</label>
    <label>{EventName}</label>
<br></br>

    <label>EventType</label>
    <label>{EventType}</label>
    <br></br>

    <label>EventDate</label>
    <label>{EventDate}</label>
    <br></br>

    <label>ClientName</label>
    <label>{ClientName}</label>
    <br></br>

    
    <label>EventEndDate</label>
    <label>{EventEndDate}</label>
    <br></br>

    <label>EventStartDate<p>{EventStartDate}</p></label>
    <br></br>

</div>

<div>


    <label>NoOfParticipants</label>
    <label>{NoOfParticipants}</label>
    <br></br>

    <label>EventStatus</label>
    <label>{EventStatus}</label>
    <br></br>

    <label>EventLocation</label>
    <label>{EventLocation}</label>
    <br></br>

    <label>EventDescription</label>
    <label>{EventDescription}</label>
    <br></br>

    <label>EventImage</label>
    <label>{EventImage}</label>
    <br></br>

    </div>

    <div>

</div>



</div>

<div>
<a href="/AvailableRooms"><input type="button" value="BACK"></input></a>
<a href="/addroom"><input type="button" value="ADD NEW ROOM"></input></a>
</div>
</div>
)
}
}
