import React, { Component } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartdata: {},
    };
  }

  async componentDidMount() {
    let recovered = [];
    let deaths = [];
    let cases = [];
    let active = [];
    let state = [];

    await axios.get("https://disease.sh/v3/covid-19/states").then((res) => {
      console.log("response -- ", res.data);
      for (let i = 0; i < res.data.length; i++) {
        recovered.push(res.data[i].recovered);
        deaths.push(res.data[i].deaths);
        cases.push(res.data[i].cases);
        active.push(res.data[i].active);
        state.push(res.data[i].state);
      }
    });
    this.setState({
        chartdata: {
      labels: state,
      datasets: [
        // These two will be in the same stack.
        {
          label: "Cases",
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 0.6)",
          borderWidth: 1,
          //stack: 1,
          hoverBackgroundColor: "rgba(255, 99, 132, 0.6)",
          hoverBorderColor: "rgba(255, 99, 132, 0.6)",
          data: cases,
        },
        {
          label: "Active",
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 0.6)",
          borderWidth: 1,
          //stack: 1,
          hoverBackgroundColor: "rgba(54, 162, 235, 0.6)",
          hoverBorderColor: "rgba(54, 162, 235, 0.6)",
          data: active,
        },
        {
          label: "Recovered",
          backgroundColor: "rgba(255, 206, 86, 0.6)",
          borderColor: "rgba(255, 206, 86, 0.6)",
          borderWidth: 1,
          //stack: 1,
          hoverBackgroundColor: "rgba(255, 206, 86, 0.6)",
          hoverBorderColor: "rgba(255, 206, 86, 0.6)",
          data: recovered,
        },
        {
          label: "Death",
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 0.6)",
          borderWidth: 1,
          //stack: 1,
          hoverBackgroundColor: "rgba(75, 192, 192, 0.6)",
          hoverBorderColor: "rgba(75, 192, 192, 0.6)",
          data: deaths,
        },
    ],
}
    })
     
    }

   
  

  render() {
    console.log("render is called ==", this.state);
    let { chartdata } = this.state;
    // const options = {
    //   responsive: true,
    //   legend: {
    //     display: false,
    //   },
    //   type: "bar",
    //  };
    return (
      <div>
   {  chartdata ?   <Bar data={chartdata}  />:null}
   {/* {  chartdata ?   <Bar data={chartdata} width={null} height={null} options={options} />:null} */}
      </div>
    );
  }
}
export default BarChart;
