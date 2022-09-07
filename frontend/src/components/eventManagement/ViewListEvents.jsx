import React, { useState, useEffect, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { NavLink } from 'react-router-dom';
import { deldata } from './context/ContextProvider';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SummarizeIcon from '@mui/icons-material/Summarize';

const ViewListEvents = () => {

    const [geteventdata, setEventdata] = useState([]);
    console.log(geteventdata);

    const { setDLTdata} = useContext(deldata);
    const [searchTerm, setSearchTerm] = useState("");

    const getdata = async () => {
        const res = await fetch("http://localhost:8000/event/view", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            setEventdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteevent = async (id) => {
        const res2 = await fetch(`http://localhost:8000/event/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            alert("Deleted Event Details Successfully")
            console.log("event deleted");
            setDLTdata(deletedata)
            getdata();
        }
    }

    return (
        <>
            <div style={{marginLeft:"100px"}}>
            </div>
            <div className="mt-5">
            <div>
<div>
    <nav class="navbar navbar-expand-lg navbar-light" style={{marginLeft:"100px"}}>
  <h1 class="navbar-brand" style={{marginRight:"100px", marginLeft:"100px"}}>Events</h1>
  <a href="/event/new" style={{marginRight:"10px"}}><button class="btn btn-outline-success my-1 my-sm-0" style={{width: "100px"}} type="submit"><AddCircleIcon/> Add</button></a>
  <a href="/eventreport" style={{marginRight:"10px"}}><button class="btn btn-outline-primary my-2 my-sm-0" style={{width: "130px"}} type="submit"><SummarizeIcon/> Report</button></a>

  <div style={{}}>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2"
      style={{width: "430px", marginLeft: "100px", marginRight: "10px"}}
      placeholder="EventName / EventType / EventDate / EventStatus" 
      type="search"
    name="searchQuery"
    onChange={(event) => {
        setSearchTerm(event.target.value);
    }}></input>
    </form>
  </div>
</nav>
    </div>
 </div>

                <div className="container">
                    <table  class="table table-hover" style={{textAlign:"center"}}>
                        <thead>
                            <tr>
                                <th scope="col">Event ID</th>
                                <th scope="col">Event Name</th>
                                <th scope="col">Action</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                geteventdata.filter((element)=> {
                                    if(searchTerm === ""){
                                        return element
                                    }else if (element.EventName.toLowerCase().includes(searchTerm.toLowerCase()) 
                                    || element.EventType.toLowerCase().includes(searchTerm.toLowerCase())
                                 || element.EventDate.toLowerCase().includes(searchTerm.toLowerCase())
                                    || element.EventStatus.toLowerCase().includes(searchTerm.toLowerCase())){
                                        return element
                                    }
                                }).map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">E{id + 100 + 1}</th>
                                                <th scope="row">{element.EventName}</th>
                                                <th>
                                                <NavLink to={`/view/${element._id}`}>  <i class="btn btn-outline-secondary"><RemoveRedEyeIcon/></i></NavLink>&nbsp;
                                                &nbsp;
                                                <NavLink to={`/edit/${element._id}`}><i class="btn btn-outline-warning"><EditIcon/></i></NavLink>&nbsp;
                                                &nbsp;
                                                <i class="btn btn-outline-danger" onClick={() => deleteevent(element._id)}><DeleteIcon/></i>&nbsp;
                                               </th>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ViewListEvents
















