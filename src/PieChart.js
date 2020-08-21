import React, { Component } from "react";
import axios from "axios";
import { Line, Bar, Pie } from "react-chartjs-2";

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList: [],
      chartData: {},
      selectedCountry: "Global",
      globalData: [],
      countryData: [],
      caseLabels: [],
      caseValues: [],
    };
  }

  async handleChangeCountry(selectedcountry) {
    console.log("country is --- ", selectedcountry);
    let country = [];
    let confirmed = [];
    let caseLabels = [];
    let caseValues = [];
    this.setState({ selectedCountry: selectedcountry });


    console.log('Onchange country --- ',this.state.selectedCountry);


    if (selectedcountry === "Global") {
      await axios.get("https://api.covid19api.com/summary").then((res) => {
        console.log("res summary--- ", res);
        console.log("global data --- ", res.data.Global);
        for (const [key, value] of Object.entries(res.data.Global)) {
          caseLabels.push(key);
          caseValues.push(value);
        }
      });
    } else {
      await axios.get("https://api.covid19api.com/summary").then((res) => {
        let ans1 = res.data.Countries.filter(
          (country) => country.Country === selectedcountry
        );

        for (const [key, value] of Object.entries(ans1[0])) {
          //["NewConfirmed", "TotalConfirmed", "NewDeaths", "TotalDeaths", "NewRecovered", "TotalRecovered"]
          if (
            key === "NewConfirmed" ||
            key === "TotalConfirmed" ||
            key === "NewDeaths" ||
            key === "TotalDeaths" ||
            key === "NewRecovered" ||
            key === "TotalRecovered"
          ) {
            caseLabels.push(key);
            caseValues.push(value);
          }
        }
        console.log("11111111111");
        console.log(",caseValues ---- ", caseValues);
        console.log("caseLabels ---- ", caseLabels);
      });
    }

    this.setState({
      chartData: {
        labels: caseLabels,
        datasets: [
          {
            // label:'Confirmed cases',
            data: caseValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ],
          },
        ],
      },
    });
    console.log("onChange state has been set ---", this.state.chartData);
  }

  async componentDidMount() {
    let countries = [];
    let caseLabels = [];
    let caseValues = [];
    //let confirmed = [];
    await axios.get("https://api.covid19api.com/countries").then((res) => {
      console.log(res);
      for (const data of res.data) {
        countries.push(data.Country);
      }
      countries = countries.sort();
      console.log(countries);
    });
    this.setState({ countryList: countries });

    await axios.get("https://api.covid19api.com/summary").then((res) => {
      console.log("res summary--- ", res);
      console.log("global data --- ", res.data.Global);
      for (const [key, value] of Object.entries(res.data.Global)) {
        caseLabels.push(key);
        caseValues.push(value);
      }
    });
    // this.setState({ caseLabels: caseLabels });
    // this.setState({ caseValues: caseValues });

    this.setState({
      chartData: {
        labels: caseLabels,
        datasets: [
          {
            // label:'Confirmed cases',
            data: caseValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ],
          },
        ],
      },
    });
  }

  render() {
    console.log("render should be called on change state");
    let { countryList, chartData ,selectedCountry} = this.state;
    console.log("countryList in render is ---", countryList);
    // console.log("caseLabels in render is ---", caseLabels);
    // console.log("caseValues in render is ---", caseValues);
    return (
      <div>
        <div>
          {countryList.length ? (
            <div>
              <select value={selectedCountry}
                onChange={(e) => this.handleChangeCountry(e.target.value)}
              >
                <option value="Global">Global</option>
                {countryList.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </div>
        <div>
          <Pie data={chartData} />
        </div>
      </div>
    );
  }
}
export default PieChart;
