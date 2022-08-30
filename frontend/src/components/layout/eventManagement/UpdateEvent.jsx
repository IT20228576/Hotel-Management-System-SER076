import React, { Component } from 'react';
import axios from 'axios';

export default class UpdateEvent extends Component {


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
        const id = this.props.match.params.id;
        
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
        
       
            
              


        axios.put(`http://localhost:8000/event/update/${id}`,data).then((res) =>{
        if(res.data.success){
alert("Room Details Updated Successfully")

        this.setState(
        {EventName:"",
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
        


    // componentDidMount(){

    //     const id = this.props.match.params.id;
    
    //     axios.get(`http://localhost:8000/event/${id}`).then((res) =>{
    // if(res.data.success){
    // this.setState({
    //     EventName:res.data.post.EventName,
    //     EventType:res.data.post.EventType,
    //     EventDate:res.data.post.EventDate,
    //     ClientName:res.data.post.ClientName,
    //     EventStartDate:res.data.post.EventStartDate,
    //     EventEndDate:res.data.post.EventEndDate,
    //     NoOfParticipants:res.data.post.NoOfParticipants,
    //     EventStatus:res.data.post.EventStatus,
    //     EventLocation:res.data.post.EventLocation,
    //     EventDescription:res.data.post.EventDescription,
    //     EventImage:res.data.post.EventImage,
    // });
    // console.log(this.state.post);  
    // }
    //     });
    // }
    




render() {
return (
<div>
    <h1>Update excisting Room Details</h1>
    <form>
    <div>

 
<div>
<label>Room Title</label>
<input type="text"
className="form-contorl"
name="EventName"
placeholder="Enter Room Title"
value={this.state.EventName}
onChange={this.handleInputChange} required/>
</div>



<div>
<label>Room Number</label>
<input type="text"
className="form-contorl"
name="EventType"
placeholder="Enter Room Number"
value={this.state.EventType}
onChange={this.handleInputChange} required/>
</div>

<div>
<label>Room Short Code</label>
<input type="text"
className="form-contorl"
name="EventDate"
placeholder="Enter Room Short Code"
value={this.state.EventDate}
onChange={this.handleInputChange} required/>
</div>

</div>


<div>
<div>
<label>Bed Type</label>
<input type="text"
className="form-contorl"
name="ClientName"
placeholder="Enter Bed Type"
value={this.state.ClientName}
onChange={this.handleInputChange} required/>
</div>

<div>
<label>Bed Type</label>
<input type="text"
className="form-contorl"
name="NoOfParticipants"
placeholder="Enter Bed Type"
value={this.state.NoOfParticipants}
onChange={this.handleInputChange} required/>
</div>








<div>
<label>Base Price</label>
<input type="text"
className="form-contorl"
name="EventLocation"
placeholder="Enter Base Price"
value={this.state.EventLocation}
onChange={this.handleInputChange} required/>
</div>


<div>
<label>Extra Bed Price</label>
<input type="text"
className="form-contorl"
name="EventImage"
placeholder="Enter Extra Bed Price"
value={this.state.EventImage}
onChange={this.handleInputChange} required/>
</div>
</div>


<div>
<div>
<label>No Of Max Persons</label>
<input type="text"
className="form-contorl"
name="EventEndDate"
placeholder="Enter No Of Max Persons"
value={this.state.EventEndDate}
onChange={this.handleInputChange} required/>
</div>

<div>
<label>No Of Max Persons</label>
<input type="text"
className="form-contorl"
name="EventStatus"
placeholder="Enter No Of Max Persons"
value={this.state.EventStatus}
onChange={this.handleInputChange} required/>
</div>







<div>
<label>Addi. Person Price</label>
<input type="text"
className="form-contorl"
name="EventDescription"
placeholder="Additional Person Price"
value={this.state.EventDescription}
onChange={this.handleInputChange} required/>
</div>

</div>


<div>
<label>EventStartDate</label>
<textarea type="text"
className="form-contorl"
name="EventStartDate"
placeholder="Enter EventStartDate"
value={this.state.EventStartDate}
onChange={this.handleInputChange} required/>
</div>

<a href="/AvailableRooms"><button type="button">
       <i></i>
    &nbsp; BACK
    </button></a>
<button type="submit"  onClick={this.onSubmit}>
    <i></i>
&nbsp; UPDATE
</button>
<a href=""><button type="submit">
    <i></i>
&nbsp; RESET
</button></a>





</form>
</div>







)
}
}
