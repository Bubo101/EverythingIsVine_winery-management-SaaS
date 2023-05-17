import './App.css';
import React,{useState} from 'react';
import { useToken } from './auth';
import { useParams } from 'react-router-dom';
import './auth.css';


function Signup() {
const [data,setData] = useState({
username:"",
password:"",
full_name:"",
address:"",
phone:"",
email:"",
winery:"",
employee: false
})

const {id} = useParams()

const {username,password, full_name, address, phone, email, employee} = data;
 /*eslint-disable */
const [token,login,logout, signup] = useToken();
 /*eslint-enable */


const changeHandler = e => {
setData({...data,[e.target.name]:[e.target.value]});
}

    const submitHandler = e => {
    e.preventDefault();
    let winery = {id}.id
        console.log(data)

    signup(
        data.username[0], 
        data.password[0],
        data.full_name[0],
        data.address[0],
        data.phone[0],
        data.email[0],
        data.employee,
        winery
        )
}

// useEffect(() => {

// })

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent" className='fadeIn first'>
                <form onSubmit={submitHandler}>
                    {/* <h3 className= 'mt-4 display-3'>Signup Here</h3> */}
                    <div className="fadeIn second">
                        <input className="form-control" 
                            type="text" 
                            value={username}
                            name="username"
                            onChange={changeHandler}
                            placeholder="Enter Username"
                            required />
                    </div>
                    <div className="fadeIn second">
                        <input className="form-control" 
                            type="password"
                            value={password}
                            name="password"
                            onChange={changeHandler}
                            placeholder="Enter Password"
                            required
                        />
                    </div>
                    <div className="fadeIn third">
                        <input className="form-control" 
                            type="text"
                            name="full_name" 
                            value={full_name}
                            onChange={changeHandler}
                            placeholder="Enter Full Name"
                            required />
                    </div>
                    <div className="fadeIn third">
                        <input className="form-control" 
                            type="text" 
                            name="address"
                            value={address}
                            onChange={changeHandler}
                            placeholder="Enter Address"
                            required />
                    </div>
                    <div className="fadeIn fourth">
                        <input className="form-control" 
                            type="text" 
                            name="phone"
                            maxLength={10}
                            value={phone}
                            onChange={changeHandler}
                            placeholder="Enter Phone Number"
                            required />
                    </div>

                    <div className="fadeIn fourth">
                        <input className="form-control" 
                            type="email" 
                            name="email"
                            value={email}
                            onChange={changeHandler}
                            placeholder="Enter Email"
                            required />
                    </div>
                    <div className='fadeIn fourth text-secondary mt-2'>Check box to test employee functionality today!</div>
                    <span><input type="checkbox" className='fadeIn fourth' value={employee} onClick={() => {setData({...data, employee:!data.employee})}} name="employee"/></span>
                    <div>
                    <input type="submit" className="fadeIn fourth" value="Sign Up" />
                    </div>
                    <p className="forgot-password text-center">
                        Already Registered? <a href={`/wineries/${id}/login/`}>Login Here Now!</a>
                    </p>
                </form>
            </div>
        </div>
        );
}


export default Signup
