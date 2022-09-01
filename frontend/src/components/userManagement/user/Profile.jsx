import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import countries from "react-select-country-list";

function Profile() {
  const [userData, setUserData] = useState("");

  /**
   * If the user has a date of birth, then create a new date object from the date of birth, convert it to
   * ISO string, and then take the first 10 characters of that string and assign it to a new property
   * called dobEdited.
   */
  async function getData() {
    try {
      const result = await axios.get("http://localhost:8000/user/profile");
      if (result.data.dob) {
        const dobEdited = new Date(result.data.dob)
          .toISOString()
          .substring(0, 10);
        result.data.dob = dobEdited;
      }
      setUserData(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  /* Calling the getData function when the component is mounted. */
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="main">
      {userData ? (
        <>
          <div>
            <h1>Profile</h1>
            <hr />
          </div>
          <table>
            <tbody>
              <tr key={1}>
                <td>
                  <h3>First Name</h3>
                </td>
                <td>
                  <h3>{userData.firstName}</h3>
                </td>
              </tr>
              <tr key={2}>
                <td>
                  <h3>Last Name</h3>
                </td>
                <td>
                  <h3>{userData.lastName}</h3>
                </td>
              </tr>
              <tr key={3}>
                <td>
                  <h3>E-mail</h3>
                </td>
                <td>
                  <h3>{userData.email}</h3>
                </td>
              </tr>
              <tr key={4}>
                <td>
                  <h3>Mobile</h3>
                </td>
                <td>
                  <h3>{userData.mobile}</h3>
                </td>
              </tr>
              <tr key={5}>
                <td>
                  <h3>Date of birth</h3>
                </td>
                <td>
                  <h3>{userData.dob}</h3>
                </td>
              </tr>
              <tr key={6}>
                <td>
                  <h3>Country</h3>
                </td>
                <td>
                  <h3>{countries().getLabel(userData?.country)}</h3>
                </td>
              </tr>
              <tr key={7}>
                <td>
                  <h3>User Type</h3>
                </td>
                <td>
                  <h3>{userData.userType}</h3>
                </td>
              </tr>
              <tr key={8}>
                <td>
                  <h3>Verified</h3>
                </td>
                {userData.verified === true && (
                  <td>
                    <h3>E-mail Verified</h3>
                  </td>
                )}
                {userData.verified === false && (
                  <td>
                    <h3>E-mail Not Verified</h3>
                  </td>
                )}
              </tr>
              <tr key={9}>
                <td>
                  <h3>Created by</h3>
                </td>
                {userData.adminCreated === true && (
                  <td>
                    <h3>Admin</h3>
                  </td>
                )}
                {userData.adminCreated === false && (
                  <td>
                    <h3>User</h3>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default Profile;