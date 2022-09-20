import './App.css';
import React, { useState } from 'react';
import { useToken } from './auth';
import { useParams, useNavigate } from 'react-router-dom';
import './auth.css';
function Request() {
  const [data, setData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const navigate = useNavigate();
  const { name, phone, email } = data;
  const { id } = useParams();
  const [, , request] = useToken();
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: [e.target.value] });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    request(data.name[0], data.phone[0], data.email[0], id);
    navigate("/");
  };
  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="fadeIn first"></div>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            id="name"
            className="fadeIn second"
            name="name"
            placeholder="Enter Name"
            value={name}
            onChange={changeHandler}
            required
          />
          <input
            maxLength={10}
            type="text"
            id="phone"
            className="fadeIn third"
            name="phone"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={changeHandler}
            required
          />
          <input
            type="email"
            id="email"
            className="fadeIn third"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={changeHandler}
            required
          />
          <input
            type="submit"
            className="fadeIn fourth"
            value="Submit Request"
          />
          <p className="forgot-password text-center">
            Change your mind? <a href={`/`}>Home</a>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Request;
