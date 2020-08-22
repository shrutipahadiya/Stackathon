import React, { Component } from "react";
import axios from "axios";
import { HorizontalBar } from "react-chartjs-2";


class HorizontalBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
     
    };
  }

  async componentDidMount() {
    let todaysCase = [];
    let todaysDeath = [];
    let totalCases = [];
    let states = [];

    await axios
      .get("https://disease.sh/v3/covid-19/states?sort=todayCases")
      .then((res) => {
        console.log("res summary--- ", res.data);
        for (let i = 0; i < res.data.length; i++) {
          todaysCase.push(res.data[i].todayCases);
          todaysDeath.push(res.data[i].todayDeaths);
          totalCases.push(res.data[i].cases);
          states.push(res.data[i].state);
        }
      });

    this.getChartData(todaysCase, todaysDeath, totalCases,states);
  }

 getChartData(todaysCase, todaysDeath, totalCases,states) {
    this.setState({
        chartData: {
      labels: states,
      datasets: [
        // These two will be in the same stack.
        {
          label: "todays Cases",
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 0.6)",
          borderWidth: 1,
          //stack: 1,
          hoverBackgroundColor: "rgba(255, 99, 132, 0.6)",
          hoverBorderColor: "rgba(255, 99, 132, 0.6)",
          data: todaysCase,
        },
        {
          label: "todays Deaths",
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 0.6)",
          borderWidth: 1,
          //stack: 1,
          hoverBackgroundColor: "rgba(54, 162, 235, 0.6)",
          hoverBorderColor: "rgba(54, 162, 235, 0.6)",
          data: todaysDeath,
        },
           
    ],
}
    })
    
    }

    

  render() {
      let {chartData} = this.state;
      console.log("chartData in redner --- ",chartData);
   return <div>  
      {  chartData ?   
       <HorizontalBar data={chartData} />

    :null}</div>;
  }
}
export default  HorizontalBarChart ;
