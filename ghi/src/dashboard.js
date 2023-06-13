import React from 'react';
import { Link } from 'react-router-dom';
import './card.css'

function WineColumn(props) {
  return (
    <div className="col">
      {props.list.map((data) => {
        const winery = data;
        return (
          <div key={winery.id} className="cards mb-3 mt-5 shadow">
            <img src={winery.url} className="card-img-top" alt="" />
            <div className="card-body">
              <h5 className="card-title">
                <Link
                  to={`/wineries/${winery.id}`}
                  className="d-flex justify-content-center btn btn-lg px-4 gap-3 text-light"
                  style={{ backgroundColor: 'orchid' }}
                >
                  {winery.name}
                </Link>
              </h5>
              <p className="d-flex justify-content-center card-text">
                {winery.address}
              </p>
            </div>
            <div className="d-flex justify-content-center card-footer">
              Owned by {winery.owner}
            </div>
          </div>
        );
      })}
    </div>
  );
}

class WineryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wineColumns: [[], [], []],
    };
  }

  async componentDidMount() {
    // const host = `${process.env.REACT_APP_WINERY_API}`;
    const host = "http://localhost:8000"
    const url = host + `/api/wineries/`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();

        const wineColumns = [[], [], []];
        let list = [];
        for (let winery of data.wineries) {
          list.push(winery);
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

        this.setState({ wineColumns: wineColumns });
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <>
        <div
          className="px-4 py-3 my-5 mt-2 text-center rounded-3"
          style={{ backgroundColor: 'darkorchid' }}
        >
          <h1 className="display-5 fw-bold text-white mt-5">
            Everything Is Vine
          </h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-5 text-light font-italic">
              The Premiere Winery Management Application!
            </p>
            <h5 className="card-title">
              <Link
                to={`/newwinery/`}
                className="d-flex justify-content-center btn btn-lg px-4 bg-light gap-3"
                style={{ color: 'mediumorchid' }}
              >
                Try it out here! Create a winery now!
              </Link>
            </h5>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {this.state.wineColumns.map((wineList, index) => {
              return <WineColumn key={index} list={wineList} />;
            })}
          </div>
        </div>
        <div className="px-2 py-2 bg-light mt-4 mb-2 rounded text-center">
          <p className="lead mb-3" style={{ color: 'black' }}>
            Please enjoy a selection of sample winery pages below!
          </p>
          <p className="lead mb-3" style={{ color: 'black' }}>
            Winery pages can be hosted as a collective or by individual winery &
            customized to your needs. Click the link below and one of our
            representatives will reach out.{' '}
          </p>
          <h5 className="card-title">
            <Link
              to={`/request/`}
              className="d-flex justify-content-center btn btn-lg px-4 gap-3 text-light"
              style={{ backgroundColor: 'mediumorchid' }}
            >
              Inquire More Info About Our Services Here!
            </Link>
          </h5>
        </div>
      </>
    );
  }
}

export default WineryList;
