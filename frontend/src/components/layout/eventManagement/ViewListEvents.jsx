import React, { Component } from 'react';
import axios from 'axios';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SummarizeIcon from '@mui/icons-material/Summarize';




export default class ViewListEvents extends Component{
constructor(props){
super(props);
this.state={
posts:[]
};
}

componentDidMount(){
this.retrievePosts();
}

retrievePosts(){
axios.get("http://localhost:8000/event").then(res =>{
if(res.data.success){
this.setState({
posts:res.data.existingRoom,
});
console.log(this.state.posts)
} 
});
}

onDelete = (id) =>{
axios.delete(`http://localhost:8000/event/delete/${id}`).then((res) =>{
alert("Event Delete Successfully")
this.retrievePosts();  
})
}

filterData(posts,searchKey){
    const result = posts.filter((post) =>
    post.EventName.toLowerCase().includes(searchKey)||
    post.EventDate.toLowerCase().includes(searchKey)||
    post.NoOfParticipants.toLowerCase().includes(searchKey)
    )
    this.setState({posts:result})
    }
    
    handleSearchArea = (e) =>{
        const searchKey=e.currentTarget.value;
        axios.get(`http://localhost:8000/event`).then(res =>{
    if(res.data.success){
        this.filterData(res.data.existingRoom,searchKey)
    }
    });
    }

render() {
return (

<div>
<div>

<div>


    <nav class="navbar navbar-expand-lg navbar-light">
  <h1 class="navbar-brand" style={{marginRight:"100px", marginLeft:"100px"}}>Events</h1>
  <a href="/add" style={{marginRight:"10px"}}><button class="btn btn-outline-success my-1 my-sm-0" type="submit"><AddCircleIcon/> Add</button></a>
  <a href="/add" style={{marginRight:"10px"}}><button class="btn btn-outline-primary my-2 my-sm-0" type="submit"><SummarizeIcon/> Report</button></a>

  <div style={{marginLeft:"500px"}}>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2"
      placeholder="Search" 
      type="search"
    name="searchQuery"
    onChange={this.handleSearchArea}></input>
    </form>
  </div>
</nav>

    </div>

 </div>
 <table class="table table-hover" style={{textAlign:"center"}}>
 <thead>
    <tr>
<th scope="col"><b>Event ID</b></th>
<th scope="col"><b>Event Name</b></th>
<th scope="col"><b>Actions</b></th>
</tr>
</thead>
  <tbody>
{this.state.posts.map((posts,index) =>(
<tr key={index} style={{}}>
    <th scope="row">{index+1}</th> 
<td>
<a href={`/event/${posts._id}`}>
{posts.EventName}
</a>
</td>
<td>
<a href={`/event/${posts._id}`} style={{textDecoration:"none"}}><button>aaaa</button>
<i class="btn btn-outline-secondary"><RemoveRedEyeIcon/></i>&nbsp;
</a>
&nbsp;
<a  href={`/updateevent/${posts._id}`} style={{textDecoration:"none"}}>
<i class="btn btn-outline-warning"><EditIcon/></i>&nbsp;
</a>
&nbsp;
<a href="/ViewListEvents" onClick={() =>this.onDelete(posts._id)} style={{textDecoration:"none"}}>
<i class="btn btn-outline-danger"><DeleteIcon/></i>&nbsp;
</a>
</td>
</tr>
))}
</tbody>
</table>
</div>
)
}
}
