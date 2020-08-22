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
      caseLabels: [],
      caseValues: [],
    };
  }

  handleChangeCountry(selectedcountry){
    console.log("country is --- ", selectedcountry);
    this.setState({selectedCountry:selectedcountry});
    console.log('Onchange country --- ',this.state.selectedCountry);
    this.getChartData(selectedcountry);
  }
 
   async  componentDidMount() {
    let countries = [];
   await  axios.get("https://api.covid19api.com/countries").then((res) => {
      console.log(res);
      for (const data of res.data) {
        countries.push(data.Country);
      }
      countries = countries.sort();
      console.log(countries);
    });
    this.setState({ countryList: countries });
    this.getChartData();
    
  }


  async getChartData(selectedcountry){
    let caseLabels = [];
    let caseValues = [];
    console.log('state country is --- ',this.state.selectedCountry);
    console.log('selectedcountry --- ',selectedcountry);
    if (selectedcountry === "Global" || selectedcountry === undefined) {
      await axios.get("https://api.covid19api.com/summary").then((res) => {
        console.log("res summary--- ", res);
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
     });
    }

    this.setState({
      chartData: {
        labels: caseLabels,
        datasets: [
          {
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

  render() {
   let { countryList, selectedCountry,chartData} = this.state;
      return (
      <div>
        <div>
          {countryList.length ? (
            <div>
              <select value={selectedCountry} name="selectedCountry"
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
