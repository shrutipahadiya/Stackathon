import React, { Component } from "react";
import axios from "axios";
import { Line, Bar, Pie } from "react-chartjs-2";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStatus: "confirmed",
      selectedCountry: "Afghanistan",
      selectedSlug: "afghanistan",
      countryList: [],
      chartData: {},
    };
  }

  async handleChangeCountry(inputSlug) {
    console.log("country is --- ", inputSlug);

    let caseArr = [];
    let dateArr = [];
    this.setState({selectedSlug:inputSlug});
    console.log(" chnage slug --- ", this.state.selectedSlug);
    console.log("chnage status --", this.state.selectedStatus);

    await axios
      .get(
        `https://api.covid19api.com/dayone/country/${this.state.selectedSlug}/status/${this.state.selectedStatus}`
      )
      .then((res) => {
        console.log("res from dayone country status api--- ", res);
       // console.log("res.data --- ", res.data);

        for (let i = 0; i < res.data.length; i++) {
          dateArr.push(res.data[i].Date);
          caseArr.push(res.data[i].Cases);
        }
      //  console.log("dateArr --- ", dateArr);
        console.log("caseArr --- ", caseArr);
      });
    this.setState({
      chartData: {
        labels: dateArr,
        datasets: [
          {
            label: this.state.selectedStatus,
            data: caseArr,
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
          },
        ],
      },
    });
  }

  async handleChangeStatus(selectedStatus) {
    console.log("selectedStatus in handleChangeStatus is --- ", selectedStatus);

    let caseArr = [];
    let dateArr = [];
    this.setState({ selectedStatus: selectedStatus });
    console.log(" chnage slug --- ", this.state.selectedSlug);
    console.log("chnage status --", this.state.selectedStatus);

    await axios
      .get(
        `https://api.covid19api.com/dayone/country/${this.state.selectedSlug}/status/${this.state.selectedStatus}`
      )
      .then((res) => {
        console.log("res from dayone country status api--- ", res);
        console.log("res.data --- ", res.data);

        for (let i = 0; i < res.data.length; i++) {
          dateArr.push(res.data[i].Date);
          caseArr.push(res.data[i].Cases);
        }
      //  console.log("dateArr --- ", dateArr);
        console.log("caseArr --- ", caseArr);
      });
    this.setState({
      chartData: {
        labels: dateArr,
        datasets: [
          {
            label: this.state.selectedStatus,
            data: caseArr,
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
          },
        ],
      },
    });
  }

  async componentDidMount() {
    let caseArr = [];
    let dateArr = [];
    await axios.get("https://api.covid19api.com/countries").then((res) => {
      console.log("res.data --- ", res.data);
      this.setState({ countryList: res.data });
    });

    console.log("state value is --- ", this.state.selectedSlug);
    console.log("status value is --- ", this.state.selectedStatus);

    await axios
      .get(
        `https://api.covid19api.com/dayone/country/${this.state.selectedSlug}/status/${this.state.selectedStatus}`
      )
      .then((res) => {
        console.log("res from dayone country status api--- ", res);
        console.log("res.data --- ", res.data);

        for (let i = 0; i < res.data.length; i++) {
          dateArr.push(res.data[i].Date);
          caseArr.push(res.data[i].Cases);
        }
        console.log("dateArr --- ", dateArr);
        console.log("caseArr --- ", caseArr);
      });

    //call the Day one api to get status and country wise data and plot graph
    this.setState({
      chartData: {
        labels: dateArr,
        datasets: [
          {
            label: "Cases",
            data: caseArr,
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
          },
        ],
      },
    });
  }

  render() {
    let {
      countryList,
      selectedCountry,
      selectedSlug,
      selectedStatus,
      chartData,
    } = this.state;
    console.log("render should be called on change state", selectedCountry);

    return (
      <div>
        <div>
          {countryList.length ? (
            <div>
              <select
                value={selectedSlug}
                onChange={(e) => this.handleChangeCountry(e.target.value)}
              >
                {countryList
                  .sort((a, b) =>
                    a.Country.toLowerCase() > b.Country.toLowerCase() ? 1 : -1
                  )
                  .map((country) => (
                    <option key={country.Slug} value={country.Slug}>
                      {country.Country}
                    </option>
                  ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => this.handleChangeStatus(e.target.value)}
              >
                <option value="confirmed" key="confirmed">
                  confirmed
                </option>
                <option value="recovered" key="recovered">
                  recovered
                </option>
                <option value="deaths" key="deaths">
                  deaths
                </option>
              </select>
            </div>
          ) : null}
        </div>
        <div>
          <Line data={chartData} />
        </div>
      </div>
    );
  }
}
export default LineChart;
