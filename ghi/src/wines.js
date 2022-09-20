import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuthContext } from './auth';

function WineColumn(props) {
  const { id } = useParams();

  async function delete_wine(wine_id) {
    // const host = `${process.env.REACT_APP_WINERY_API}`;
    const host = "http://localhost:8000"
    const url = host + `/api/wines/${wine_id}/delete/`;
    const response = await fetch(url, { method: 'DELETE' });

    if (response.ok) {
      window.location.reload();
    }
  }

  return (
    <div className="col">
      {props.list.map((wine) => {
        return (
          <div key={wine.id} className="card col-lg-10 mb-3 shadow mt-4">
            <img src={wine.picture_url} alt="" className="card-img-top mt-3" />
            <div className="card-body">
              <h5 className="d-flex justify-content-center card-title">
                {wine.year}
              </h5>
              <h6 className="d-flex justify-content-center card-subtitle mb-2 text-muted">
                {wine.varietal}
              </h6>
              <p className="d-flex justify-content-center card-text">
                <Link
                  to={`/wineries/${id}/wines/${wine.id}`}
                  className="btn p-2 mb-1 mt-1"
                  style={{ backgroundColor: 'orchid' }}
                >
                  Learn More & Order Here
                </Link>
              </p>
            </div>
            <div className="d-flex justify-content-center card-footer">
              <div>Alcohol By Volume: {wine.abv}%</div>
              <div className="px-1">
                <span>
                  <Link
                    to={`/wines/${wine.id}/edit`}
                    className={
                      'btn btn-warning p-2 mb-1 mt-1' +
                      (props.staff ? '' : ' d-none')
                    }
                  >
                    Edit
                  </Link>
                </span>
                <span className="px-1">
                  <button
                    onClick={() => {
                      delete_wine(wine.id);
                    }}
                    className={
                      'btn btn-danger p-2 mb-1 mt-1' +
                      (props.staff ? '' : ' d-none')
                    }
                  >
                    Delete
                  </button>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function WineList() {
  const [wineColumns, setWineColumns] = useState([[], [], []]);
  const [wineryName, setWineryName] = useState('');
  const [staff, setStaff] = useState(false);
  const { id } = useParams();
  const { token } = useAuthContext();

  async function fetchWines() {
    // const host = `${process.env.REACT_APP_WINERY_API}`;
    const host = "http://localhost:8000"
    const url = host + `/api/wineries/${id}/wines/`;

    try {
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        const wineryName = data.wines[0].winery.name;
        const wineColumns = [[], [], []];
        let list = [];

        for (let wine of data.wines) {
          list.push(wine);
        }

        let i = 0;
        for (const wine of list) {
          if (wine) {
            wineColumns[i].push(wine);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          } else {
            console.error(wine);
          }
        }

        setWineryName(wineryName);
        setWineColumns(wineColumns);
      }
    } catch (e) {
      console.error(e);
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
  /*eslint-disable */

  useEffect(() => {
    fetchWines(token);
  }, []);
  /*eslint-enable */

  return (
    <>
      <div className="px-4 py-5 my-5 mt-4 text-center bg-light">
        <h1 className="display-5 fw-bold">Our Wines</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Please enjoy a selection of our finest wines from {wineryName}.
          </p>
          <p className="display-9" style={{ color: 'orchid' }}>
            Login or Sign Up above to get a discount at checkout!
          </p>
          <p>
            <Link
              to={`/wineries/${id}/wines/new/`}
              className={
                'btn btn-success p-2 mb-1 mt-1' + (staff ? '' : ' d-none')
              }
            >
              Add A New Wine
            </Link>
          </p>
        </div>
      </div>
      <div className="container">
        <div className="row mt-2">
          {wineColumns.map((wineList, index) => {
            return (
              <WineColumn id={id} key={index} list={wineList} staff={staff} />
            );
          })}
        </div>
      </div>
    </>
  );
}
export default WineList;
