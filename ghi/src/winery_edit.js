import './App.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './auth.css';
import { useAuthContext } from './auth';

function EditWinery() {
  const [data, setData] = useState({
    name: '',
    url: '',
    address: '',
    description: '',
    owner: '',
  });
  const [staff, setStaff] = useState(false);
  const { id } = useParams();
  const { token } = useAuthContext();
  const { name, url, address, description, owner } = data;
  const navigate = useNavigate();

  async function fetchWinery() {
    // const host = `${process.env.REACT_APP_WINERY_API}`;
    const host = "http://localhost:8000"
    const url = host + `/api/wineries/${id}/`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();

      setData({
        name: data.winery.name,
        url: data.winery.url,
        address: data.winery.address,
        description: data.winery.description,
        owner: data.winery.owner,
      });
    }
  }

  async function getCurrentUser() {
    // const host = `${process.env.REACT_APP_WINERY_API}`;
    const host = "http://localhost:8000"
    const url = host + `/api/accounts/user/`;
    const response = await fetch(url, {
      credentials: 'include',
    });
    if (response.ok) {
      const user = await response.json();

      if (user.user.employee === true && user.user.winery === parseInt(id)) {
        setStaff(true);
      }
    }
  }
  if (token) {
    getCurrentUser();
  }

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  async function updateWinery(event) {
    event.preventDefault();
    const updateForm = { ...data };
    // const host = `${process.env.REACT_APP_WINERY_API}`;
    const host = "http://localhost:8000"
    const locationUrl = host + `/api/wineries/${id}/edit/`;
    const fetchConfig = {
      method: 'put',
      mode: 'cors',
      body: JSON.stringify(updateForm),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      navigate(`/wineries/${id}`);
    }
  }
  /*eslint-disable */
  useEffect(() => {
    fetchWinery(token);
  }, []);
  /*eslint-enable */
  return (
    <>
      <div className={'wrapper fadeInDown' + (staff ? ' d-none' : '')}>
        Sorry, you are not authorized to view this page
      </div>
      <div className={'wrapper fadeInDown' + (staff ? '' : ' d-none')}>
        <div id="formContent" className="fadeIn first">
          <form onSubmit={updateWinery}>
            {/* <h3 className= 'mt-4 display-3'>Signup Here</h3> */}
            <div className="fadeIn second">
              <div className="display-6 text-secondary mt-3">Winery Name</div>
              <input
                className="form-control"
                type="text"
                defaultValue={name}
                name="name"
                onChange={changeHandler}
                placeholder="Winery Name"
              />
            </div>
            <div className="fadeIn second">
              <div className="display-6 text-secondary mt-3">URL for Photo</div>
              <input
                className="form-control"
                type="url"
                value={url}
                name="url"
                onChange={changeHandler}
                placeholder="Enter URL"
              />
            </div>
            <div className="fadeIn third">
              <div className="display-6 text-secondary mt-3">Address</div>
              <input
                className="form-control"
                type="text"
                name="address"
                value={address}
                onChange={changeHandler}
                placeholder="Enter Address"
              />
            </div>
            <div className="fadeIn third">
              <div className="display-6 text-secondary mt-3">Owner Name</div>
              <input
                className="form-control"
                type="text"
                name="owner"
                value={owner}
                onChange={changeHandler}
                placeholder="Owner Name"
              />
            </div>
            <div className="fadeIn fourth">
              <div className="display-6 text-secondary mt-3">Description</div>
              <textarea
                className="form-control textarea mt-3"
                type="text"
                name="description"
                value={description}
                onChange={changeHandler}
                placeholder="Enter Description"
              />
            </div>

            <input type="submit" className="fadeIn fourth" value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default EditWinery;
