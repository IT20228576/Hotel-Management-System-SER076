import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams,useNavigate } from 'react-router-dom'
import { updatedata } from './context/ContextProvider'


const UpdateEvent = () => {

    // const [geteventdata, setEventdata] = useState([]);
    // console.log(geteventdata);

   const {updata, setUPdata} = useContext(updatedata)

    const navigate = useNavigate("");

    const [inpval, setINP] = useState({
        EventName: "",
        EventType: "",
        EventDate: "",
        ClientName: "",
        EventStartDate: "",
        EventEndDate: "",
        NoOfParticipants: ""
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`http://localhost:8000/event/vew/${id}`, {
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
            setINP(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateevent = async(e)=>{
        e.preventDefault();

        const {EventName,EventType,EventStartDate,EventEndDate,ClientName,NoOfParticipants,EventDate} = inpval;

        const res2 = await fetch(`http://localhost:8000/event/update/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                EventName,EventType,EventStartDate,EventEndDate,ClientName,NoOfParticipants,EventDate
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            navigate("/")
            setUPdata(data2);
        }

    }

    return (
        <div className="container">
            {/* <NavLink to="/"></NavLink> */}
            <form className="mt-4">
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">Event Name</label>
                        <input type="text" value={inpval.EventName} onChange={setdata} name="EventName" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Event Type</label>
                        <input type="email" value={inpval.EventType} onChange={setdata} name="EventType" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Event Date</label>
                        <input type="text" value={inpval.EventDate} onChange={setdata} name="EventDate" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Client Name</label>
                        <input type="number" value={inpval.ClientName} onChange={setdata} name="ClientName" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Event Start Date</label>
                        <input type="text" value={inpval.EventStartDate} onChange={setdata} name="EventStartDate" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">EventEndDate</label>
                        <input type="text" value={inpval.EventEndDate} onChange={setdata} name="EventEndDate" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label for="exampleInputPassword1" class="form-label">No Of Participants</label>
                        <textarea name="NoOfParticipants" value={inpval.NoOfParticipants} onChange={setdata} className="form-control" id="" cols="30" rows="5"></textarea>
                    </div>

                    <button type="submit" onClick={updateevent} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateEvent;





