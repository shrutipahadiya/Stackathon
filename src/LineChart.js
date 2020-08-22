import React, { Component } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "Afghanistan",
      slug: "afghanistan",
      startDate:'2020-01-01',
      endDate:'2020-08-31',
      countryList: [],
      chartData: {},
    };
  }


  async handleChangeStartDate(selectedStartDate) {
    console.log("selectedStartDate in handleChangeStartDate is --- ", selectedStartDate);
    this.setState({startDate:selectedStartDate});
    console.log(this.state.startDate);
    console.log(this.state.endDate);
    console.log(this.state.slug);
    this.getChartData(this.state.slug,selectedStartDate,this.state.endDate);
  
}


async handleChangeEndDate(selectedEndDate) {
  console.log("selectedEndDate in handleChangeEndDate is --- ", selectedEndDate);
  this.setState({endDate:selectedEndDate});
  console.log(this.state.startDate);
  console.log(this.state.endDate);
  console.log(this.state.slug);
  this.getChartData(this.state.slug,this.state.startDate,selectedEndDate);

  
}

  async handleChangeCountry(inputSlug) {
    console.log("country is --- ", inputSlug);
    this.setState({slug:inputSlug});
    console.log(this.state.startDate);
    console.log(this.state.endDate);
    this.getChartData(inputSlug,this.state.startDate,this.state.endDate);
}

 
  async componentDidMount() {
    await axios.get("https://api.covid19api.com/countries").then((res) => {
      console.log("res.data --- ", res.data);
      this.setState({ countryList: res.data });
    });
    this.getChartData(this.state.slug,this.state.startDate,this.state.endDate);
  }


  async getChartData(inputSlug,inputStartDate,inputEndDate){
    console.log("inputSlug ---- ",inputSlug);
    console.log("inputStartDate ---- ",inputStartDate);
    console.log("inputEndDate ---- ",inputEndDate);
   
    console.log("state value is --- ", this.state.slug);
     console.log('startDate is --- ',this.state.startDate);
    console.log('endDate is --- ',this.state.endDate);

    // let newStartDate = this.state.startDate+'T00:00:00Z';
    // let newEndDate = this.state.endDate+'T00:00:00Z';

    let newStartDate = inputStartDate+'T00:00:00Z';
    let newEndDate = inputEndDate+'T00:00:00Z';

    console.log('newStartDate --- ',newStartDate);
    console.log('newEndDate --- ',newEndDate);

    let dateArr = [];
    let confirmedArr=[];
    let activeArr=[];
    let deathArr=[];
    let recoveredArr=[];
 //Returns all cases by case type for a country from the first recorded case
 //Returns all cases by case type for a country. Country must be the slug from /countries or /summary. Cases must be one of: confirmed, recovered, deaths
    console.log(`https://api.covid19api.com/country/${inputSlug}?from=${newStartDate}&to=${newEndDate}`);
// https://api.covid19api.com/country/south-africa?from=2020-01-01T00:00:00Z&to=2020-04-01T00:00:00Z
await axios .get(`https://api.covid19api.com/country/${inputSlug}?from=${newStartDate}&to=${newEndDate}`)
.then((res) => {
  console.log("res from dayone country status api--- ", res);
  console.log("res.data --- ", res.data);

  let newData = res.data.filter(record => record.Date >=inputStartDate && record.Date <= inputEndDate);
  //let newData = res.data;
  console.log('newData --- ',newData);

  for (let i = 0; i < newData.length; i++) {
         confirmedArr.push(newData[i].Confirmed);
         activeArr.push(newData[i].Active);
         deathArr.push(newData[i].Deaths);
         recoveredArr.push(newData[i].Recovered);
         dateArr.push(newData[i].Date.substring(0, 10));
        
  }
  console.log("confirmedArr --- ", confirmedArr);
  console.log("activeArr --- ", activeArr);
  console.log("deathArr --- ", deathArr);
  console.log("recoveredArr --- ", recoveredArr);
  console.log("dateArr --- ", dateArr);
//  / console.log("caseArr --- ", caseArr);
});

//call the Day one api to get status and country wise data and plot graph
this.setState({
chartData: {
  labels: dateArr,
  datasets: [
    {
      label: "Confirmed Cases",
    fill: false,
    lineTension: 0.2,
    backgroundColor: "#EC6B56",
    borderColor: "#EC6B56",
    borderDash: [],
    borderDashOffset: 0.0,
    pointBorderColor: "#EC6B56",
    pointBackgroundColor: "#fff",
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "#EC6B56",
    pointHoverBorderWidth: 2,
    pointRadius: 4,
    pointHitRadius: 10,
    data: confirmedArr
    },
    {
      label: "Active Cases",
    fill: false,
    lineTension: 0.2,
    backgroundColor: "#FFC154",
    borderColor: "#FFC154",
    borderDash: [],
    borderDashOffset: 0.0,
    pointBorderColor: "#FFC154",
    pointBackgroundColor: "#fff",
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "#FFC154",
    pointHoverBorderWidth: 2,
    pointRadius: 4,
    pointHitRadius: 10,
    data: activeArr
    },
    {
      label: "Death Cases",
    fill: false,
    lineTension: 0.2,
    backgroundColor: "#47B39C",
    borderColor: "#47B39C",
    borderDash: [],
    borderDashOffset: 0.0,
    pointBorderColor: "#47B39C",
    pointBackgroundColor: "#fff",
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "#47B39C",
    pointHoverBorderWidth: 2,
    pointRadius: 4,
    pointHitRadius: 10,
    data: deathArr
    },
    {
      label: "Recovered Cases",
    fill: false,
    lineTension: 0.2,
    backgroundColor: "#ff6384",
    borderColor: "#ff6384",
    borderDash: [],
    borderDashOffset: 0.0,
    pointBorderColor: "#ff6384",
    pointBackgroundColor: "#fff",
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor:"#ff6384",
    pointHoverBorderWidth: 2,
    pointRadius: 4,
    pointHitRadius: 10,
    data: recoveredArr
    },
  ],
},
});

  }


    render() {
    let { countryList, country,slug,chartData,startDate,endDate} = this.state;
    console.log("render should be called on change state", country);

    return (
      <div>
        <div>
          {countryList.length ? (
            <div>
              <select
                value={slug}
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
              {/* <select
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
              </select> */}

              <select
                value={startDate}
                onChange={(e) => this.handleChangeStartDate(e.target.value)}
              >
                <option value="2020-01-01" key="2020-01-01">
                2020-01-01
                </option>
                <option value="2020-02-01" key="2020-02-01">
                2020-02-01
                </option>
                <option value="2020-03-01" key="2020-03-01">
                2020-03-01
                </option>
                <option value="2020-04-01" key="2020-04-01">
                2020-04-01
                </option>
                <option value="2020-05-01" key="2020-05-01">
                2020-05-01
                </option>
                <option value="2020-06-01" key="2020-06-01">
                2020-06-01
                </option>
                <option value="2020-07-01" key="2020-07-01">
                2020-07-01
                </option>
                <option value="2020-08-01" key="2020-08-01">
                2020-08-01
                </option>
               </select>

               <select
                value={endDate}
                onChange={(e) => this.handleChangeEndDate(e.target.value)}
              >
                <option value="2020-01-31" key="2020-01-31">
                2020-01-31
                </option>
                <option value="2020-02-29" key="2020-02-29">
                2020-02-29
                </option>
                <option value="2020-03-31" key="2020-03-31">
                2020-03-31
                </option>
                <option value="2020-04-30" key="2020-04-30">
                2020-04-30
                </option>
                <option value="2020-05-31" key="2020-05-31">
                2020-05-31
                </option>
                <option value="2020-06-30" key="2020-06-30">
                2020-06-30
                </option>
                <option value="2020-07-31" key="2020-07-31">
                2020-07-31
                </option>
                <option value="2020-08-31" key="2020-08-31">
                2020-08-31
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
