import './App.css';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './auth.css';
import { useAuthContext } from './auth';

function NewWine() {
  const { id } = useParams();
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
    winery: id,
  });
  const [staff, setStaff] = useState(false);
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

  async function newWine(event) {
    event.preventDefault();
    const newForm = { ...data };
    // const host = `${process.env.REACT_APP_WINERY_API}`;
    const host = "http://localhost:8000"
    const locationUrl = host + `/api/wines/new/`;

    const fetchConfig = {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify(newForm),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      navigate(`/wineries/${id}/wines/`);
    }
  }

  return (
    <>
      <div className={'wrapper fadeInDown' + (staff ? ' d-none' : '')}>
        Sorry, you are not authorized to view this page
      </div>
      <div className={'wrapper fadeInDown' + (staff ? '' : ' d-none')}>
        <div id="formContent" className="fadeIn first">
          <form onSubmit={newWine}>
            <div className="fadeIn second">
              <input
                className="form-control"
                type="text"
                defaultValue={brand}
                name="brand"
                onChange={changeHandler}
                placeholder="Enter Brand Name"
                required
              />
            </div>
            <div className="fadeIn third">
              <input
                className="form-control"
                type="number"
                name="year"
                value={year}
                onChange={changeHandler}
                placeholder="Enter Year/Vintage"
                required
              />
            </div>
            <div className="fadeIn third">
              <input
                className="form-control"
                type="text"
                name="varietal"
                value={varietal}
                onChange={changeHandler}
                placeholder="Enter Varietal"
                required
              />
            </div>
            <div className="fadeIn third">
              <input
                className="form-control"
                type="text"
                name="region"
                value={region}
                onChange={changeHandler}
                placeholder="Enter Region"
                required
              />
            </div>
            <div className="fadeIn third">
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="abv"
                value={abv}
                onChange={changeHandler}
                placeholder="Enter ABV"
                required
              />
            </div>
            <div className="fadeIn fourth">
              <input
                className="form-control"
                type="number"
                name="volume"
                value={volume}
                onChange={changeHandler}
                placeholder="Enter Volume"
                required
              />
            </div>
            <div className="fadeIn third">
              <input
                className="form-control"
                type="text"
                name="city_state"
                value={city_state}
                onChange={changeHandler}
                placeholder="Enter City, State"
                required
              />
            </div>
            <div className="fadeIn third">
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="price"
                value={price}
                onChange={changeHandler}
                placeholder="Enter Price"
                required
              />
            </div>
            <div className="fadeIn third">
              <input
                className="form-control"
                type="number"
                name="quantity"
                value={quantity}
                onChange={changeHandler}
                placeholder="Enter Quantity in Stock"
                required
              />
            </div>
            <div className="fadeIn second">
              <input
                className="form-control"
                type="url"
                value={picture_url}
                name="picture_url"
                onChange={changeHandler}
                placeholder="Enter Picture URL"
                required
              />
            </div>
            <div className="fadeIn fourth">
              <textarea
                className="form-control textarea mt-3"
                type="text"
                name="description"
                value={description}
                onChange={changeHandler}
                placeholder="Enter Description"
                required
              />
            </div>

            <input type="submit" className="fadeIn fourth" value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default NewWine;
