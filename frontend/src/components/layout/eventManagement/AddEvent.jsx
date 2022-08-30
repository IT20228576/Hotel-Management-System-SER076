import React, { Component } from 'react';
import axios from 'axios';

export default class AddEvent extends Component {

constructor(props){
super(props);
this.state={
    EventName:"",
    EventType:"",
    EventDate:"",
    ClientName:"",
    EventStartDate:"",
    EventEndDate:"",
    NoOfParticipants:"",
    EventStatus:"",
    EventLocation:"",
    EventDescription:"",
    EventImage:""

}
}

handleInputChange = (e) =>{
const {name,value} = e.target;

this.setState({
...this.state,
[name]:value
})
}

onSubmit = (e) =>{
e.preventDefault();

const {EventName,EventType,EventDate,ClientName,EventStartDate,EventEndDate,NoOfParticipants,EventStatus,EventLocation,EventDescription,EventImage} = this.state;

const data ={
    EventName:EventName,
  EventType:EventType,
  EventDate:EventDate,
  ClientName:ClientName,
  EventStartDate:EventStartDate,
  EventEndDate:EventEndDate,
  NoOfParticipants:NoOfParticipants,
  EventStatus:EventStatus,
  EventLocation:EventLocation,
  EventDescription:EventDescription,
  EventImage:EventImage

}
console.log(data)

axios.post("http://localhost:8000/event/save",data).then((res) =>{
if(res.data.success){
  alert("New Event Details Successfully Added")
this.setState(
{
  EventName:"",
  EventType:"",
  EventDate:"",
  ClientName:"",
  EventStartDate:"",
  EventEndDate:"",
  NoOfParticipants:"",
  EventStatus:"",
  EventLocation:"",
  EventDescription:"",
  EventImage:""
 
}
)
}
})
}

render() {
return (



<div>




    <h1 >Add New Event Details</h1>
    <form noValidate style={{marginTop:"50px"}}>
    

 

<label style={{marginBottom:'5px'}}>Event Title</label>
<input style={{marginLeft:'46px', border: '1px solid #4CAF50'}} type="text"
className="form-contorl"
name="EventName"
placeholder="Enter Event Title"
value={this.state.EventName}
onChange={this.handleInputChange} required/>





<input style={{marginLeft:'24px', border: '1px solid #4CAF50'}} type="text"
className="form-contorl"
name="EventType"
placeholder="Enter Event Number"
value={this.state.EventType}
onChange={this.handleInputChange} required/>



<input style={{marginLeft:'8px', border: '1px solid #4CAF50'}} type="text"
className="form-contorl"
name="EventDate"
placeholder="Enter Event Short Code"
value={this.state.EventDate}
onChange={this.handleInputChange} required/>

<input style={{marginLeft:'8px', border: '1px solid #4CAF50'}} type="text"
className="form-contorl"
name="ClientName"
placeholder="Enter Event Short Code"
value={this.state.ClientName}
onChange={this.handleInputChange} required/>

<input style={{marginLeft:'8px', border: '1px solid #4CAF50'}} type="text"
className="form-contorl"
name="EventStartDate"
placeholder="Enter Event Short Code"
value={this.state.EventStartDate}
onChange={this.handleInputChange} required/>

<input style={{marginLeft:'8px', border: '1px solid #4CAF50'}} type="text"
className="form-contorl"
name="EventEndDate"
placeholder="Enter Event Short Code"
value={this.state.EventEndDate}
onChange={this.handleInputChange} required/>

<input style={{marginLeft:'8px', border: '1px solid #4CAF50'}} type="text"
className="form-contorl"
name="NoOfParticipants"
placeholder="Enter Event Short Code"
value={this.state.NoOfParticipants}
onChange={this.handleInputChange} required/>

<input style={{marginLeft:'8px', border: '1px solid #4CAF50'}} type="text"
className="form-contorl"
name="EventStatus"
placeholder="Enter Event Short Code"
value={this.state.EventStatus}
onChange={this.handleInputChange} required/>

<input style={{marginLeft:'8px', border: '1px solid #4CAF50'}} type="text"
className="form-contorl"
name="EventLocation"
placeholder="Enter Event Short Code"
value={this.state.EventLocation}
onChange={this.handleInputChange} required/>

<input style={{marginLeft:'8px', border: '1px solid #4CAF50'}} type="text"
className="form-contorl"
name="EventDescription"
placeholder="Enter Event Short Code"
value={this.state.EventDescription}
onChange={this.handleInputChange} required/>

<input style={{marginLeft:'8px', border: '1px solid #4CAF50'}} type="text"
className="form-contorl"
name="EventImage"
placeholder="Enter Event Short Code"
value={this.state.EventImage}
onChange={this.handleInputChange} required/>






<button type="submit" style={{marginTop:'15px', marginLeft:"200px", width:"200px"}} onClick={this.onSubmit}>
    
&nbsp; SAVE
</button>

<a href="/addevent"><button type="submit" style={{marginTop:'15px', marginLeft:"200px", width:"200px", background:"blue"}}>
    
    &nbsp; RESET
</button></a>





</form>
</div>
)
}
}
