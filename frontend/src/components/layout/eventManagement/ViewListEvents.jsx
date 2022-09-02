import React, { useState, useEffect, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { adddata, deldata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider';

import AddCircleIcon from '@mui/icons-material/AddCircle';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SummarizeIcon from '@mui/icons-material/Summarize';




const ViewListEvents = () => {

    const [geteventdata, setEventdata] = useState([]);
    console.log(geteventdata);

    const { udata, setUdata } = useContext(adddata);

    const {updata, setUPdata} = useContext(updatedata);

    const {dltdata, setDLTdata} = useContext(deldata);

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
            {
                // udata ?
                //     <>
                //         <div class="alert alert-success alert-dismissible fade show" role="alert">
                //             <alert> added succesfully! </alert>
                //             <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                //         </div>
                //     </> : ""
            }
            {
                // updata ?
                //     <>
                //         <div class="alert alert-success alert-dismissible fade show" role="alert">
                //             <strong>{updata.name}</strong>  updated succesfully!
                //             <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                //         </div>
                //     </> : ""
            }

            {
                // dltdata ?
                //     <>
                //         <div class="alert alert-danger alert-dismissible fade show" role="alert">
                //             <strong>{dltdata.name}</strong>  deleted succesfully!
                //             <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                //         </div>
                //     </> : ""
            }
            </div>


            <div className="mt-5">

            <div>

<div>


    <nav class="navbar navbar-expand-lg navbar-light" style={{marginLeft:"100px"}}>
  <h1 class="navbar-brand" style={{marginRight:"100px", marginLeft:"100px"}}>Events</h1>
  <a href="/event/new" style={{marginRight:"10px"}}><button class="btn btn-outline-success my-1 my-sm-0" type="submit"><AddCircleIcon/> Add</button></a>
  <a href="/eventreport" style={{marginRight:"10px"}}><button class="btn btn-outline-primary my-2 my-sm-0" type="submit"><SummarizeIcon/> Report</button></a>

  <div style={{marginLeft:"500px"}}>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2"
      placeholder="Search" 
      type="search"
    name="searchQuery"></input>
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
                                {/* <th scope="col">Event Type</th>
                                <th scope="col">Event Start Date</th>
                                <th scope="col">Client Name</th> */}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                geteventdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td scope="row">{element.EventName}</td>
                                                {/* <td scope="row">{element.EventType}</td>
                                                <td scope="row">{element.EventStartTime}</td>
                                                <td scope="row">{element.ClientName}</td> */}
                                                <td>

                                               
                                                <NavLink to={`/view/${element._id}`}>  <i class="btn btn-outline-secondary"><RemoveRedEyeIcon/></i></NavLink>&nbsp;
                                                &nbsp;
                                                <NavLink to={`/edit/${element._id}`}><i class="btn btn-outline-warning"><EditIcon/></i></NavLink>&nbsp;
                                                &nbsp;
                                                <i class="btn btn-outline-danger" onClick={() => deleteevent(element._id)}><DeleteIcon/></i>&nbsp;
                                               </td>
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

















