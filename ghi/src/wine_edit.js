import './App.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './auth.css';
import { useAuthContext } from './auth';

function EditWine() {
  const [data, setData] = useState({
    brand: '',
    year: '',
    varietal: '',
    description: '',
    region: '',
    abv: '',
    volume: '',
    city_state: '',
    price: '',
    picture_url: '',
    quantity: '',
  });
  const [winery, setWinery] = useState(null);
  const [staff, setStaff] = useState(false);
  const { id } = useParams();
  const { token } = useAuthContext();
  const {
    brand,
    year,
    varietal,
    description,
    region,
    abv,
    volume,
    city_state,
    price,
    picture_url,
    quantity,
  } = data;
  const navigate = useNavigate();

  async function fetchWine() {
    // const host = `${process.env.REACT_APP_WINERY_API}`;
    const host = "http://localhost:8000"
    const url = host + `/api/wines/${id}/`;
    const response = await fetch(url, { credentials: 'include' });

    if (response.ok) {
      const data = await response.json();
      const wine = data.wine[0];

      setData({
        brand: wine.brand,
        year: wine.year,
        varietal: wine.varietal,
        description: wine.description,
        region: wine.region,
        abv: wine.abv,
        volume: wine.volume,
        city_state: wine.city_state,
        price: wine.price,
        picture_url: wine.picture_url,
        quantity: wine.quantity,
      });

      setWinery(wine.winery.id);
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

      if (user.user.employee === true && user.user.winery === winery) {
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

  async function updateWine(event) {
    event.preventDefault();
    const updateForm = { ...data };
    // const host = `${process.env.REACT_APP_WINERY_API}`;
    const host = "http://localhost:8000"
    const locationUrl = host + `/api/wines/${id}/`;
    const fetchConfig = {
      method: 'put',
      mode: 'cors',
      body: JSON.stringify(updateForm),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      navigate(`/wineries/${winery}/wines/`);
    }
  }
  /*eslint-disable */
  useEffect(() => {
    fetchWine(token);
  }, []);
  /*eslint-enable */

  return (
    <>
      <div className={'wrapper fadeInDown' + (staff ? ' d-none' : '')}>
        Sorry, you are not authorized to view this page
      </div>
      <div className={'wrapper fadeInDown' + (staff ? '' : ' d-none')}>
        <div id="formContent" className="fadeIn first">
          <form onSubmit={updateWine}>
            <div className="fadeIn second">
              <div className="display-6 text-secondary mt-3">
                Brand or Wine Name
              </div>
              <input
                className="form-control"
                type="text"
                defaultValue={brand}
                name="brand"
                onChange={changeHandler}
                placeholder="Brand"
              />
            </div>
            <div className="fadeIn third">
              <div className="display-6 text-secondary mt-3">
                Year or Vintage
              </div>
              <input
                className="form-control"
                type="number"
                name="year"
                value={year}
                onChange={changeHandler}
                placeholder="Enter Year"
              />
            </div>
            <div className="fadeIn third">
              <div className="display-6 text-secondary mt-3">Varietal</div>
              <input
                className="form-control"
                type="text"
                name="varietal"
                value={varietal}
                onChange={changeHandler}
                placeholder="Enter Varietal"
              />
            </div>
            <div className="fadeIn third">
              <div className="display-6 text-secondary mt-3">
                Growing Region
              </div>
              <input
                className="form-control"
                type="text"
                name="region"
                value={region}
                onChange={changeHandler}
                placeholder="Enter Region"
              />
            </div>
            <div className="fadeIn third">
              <div className="display-6 text-secondary mt-3">
                Alcohol by Volume
              </div>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="abv"
                value={abv}
                onChange={changeHandler}
                placeholder="Enter ABV"
              />
            </div>
            <div className="fadeIn fourth">
              <div className="display-6 text-secondary mt-3">
                Bottle Volume - ml
              </div>
              <input
                className="form-control"
                type="number"
                name="volume"
                value={volume}
                onChange={changeHandler}
                placeholder="Enter Volume"
              />
            </div>
            <div className="fadeIn third">
              <div className="display-6 text-secondary mt-3">
                City, State of Bottling
              </div>
              <input
                className="form-control"
                type="text"
                name="city_state"
                value={city_state}
                onChange={changeHandler}
                placeholder="Enter City/State"
              />
            </div>
            <div className="fadeIn third">
              <div className="display-6 text-secondary mt-3">Price</div>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="price"
                value={price}
                onChange={changeHandler}
                placeholder="Enter Price"
              />
            </div>
            <div className="fadeIn third">
              <div className="display-6 text-secondary mt-3">Quantity</div>
              <input
                className="form-control"
                type="number"
                name="quantity"
                value={quantity}
                onChange={changeHandler}
                placeholder="Enter Quantity"
              />
            </div>
            <div className="fadeIn second">
              <div className="display-6 text-secondary mt-3">Picture URL</div>
              <input
                className="form-control"
                type="url"
                value={picture_url}
                name="picture_url"
                onChange={changeHandler}
                placeholder="Enter Picture URL"
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
            <p className="forgot-password text-center">
              Change your mind about editing?{' '}
              <a href={`/wineries/${winery}/wines/`}>Back to Wine List</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditWine;
