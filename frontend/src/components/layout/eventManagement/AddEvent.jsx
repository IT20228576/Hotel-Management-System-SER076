import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { adddata } from './context/ContextProvider';

const AddEvent = () => {

    const { udata, setUdata } = useContext(adddata);

    const navigate  = useNavigate();

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


    const addinpdata = async (e) => {
        e.preventDefault();

        const { EventName, EventType, EventStartDate, EventEndDate, ClientName, NoOfParticipants, EventDate } = inpval;

        const res = await fetch("http://localhost:8000/event/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                EventName, EventType, EventStartDate, EventEndDate, ClientName, NoOfParticipants, EventDate
            })
        });

        const data = await res.json();
        console.log(data);
        // alert("Success");

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            navigate("/")
            setUdata(data)
            console.log("data added");

        }
    }

    return (
        <div className="container">
            <NavLink to="/">Add Event</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label class="form-label">Event Name</label>
                        <input type="text" value={inpval.EventName} onChange={setdata} name="EventName" class="form-control" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label class="form-label">Event Type</label>
                        <input type="text" value={inpval.EventType} onChange={setdata} name="EventType" class="form-control" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label class="form-label">Event Date</label>
                        <input type="text" value={inpval.EventDate} onChange={setdata} name="EventDate" class="form-control" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label class="form-label">Client Name</label>
                        <input type="text" value={inpval.ClientName} onChange={setdata} name="ClientName" class="form-control" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label class="form-label">Event Start Date</label>
                        <input type="text" value={inpval.EventStartDate} onChange={setdata} name="EventStartDate" class="form-control" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label class="form-label">Event End Date</label>
                        <input type="text" value={inpval.EventEndDate} onChange={setdata} name="EventEndDate" class="form-control" />
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label class="form-label">No Of Participants</label>
                        <textarea type="text" value={inpval.NoOfParticipants} onChange={setdata} name="NoOfParticipants" className="form-control" cols="30" rows="5"></textarea>
                    </div>

                    <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default AddEvent;
