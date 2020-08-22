import React, { Component } from "react";
import axios from "axios";
import { Radar,Scatter,Bar } from "react-chartjs-2";


class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
     
    };
  }

  async componentDidMount() {
    let casesPerOneMillion = [];
    let deathsPerOneMillion = [];
    let testsPerOneMillion = [];
    let states = [];

    await axios
      .get("https://disease.sh/v3/covid-19/states?sort=todayCases")
      .then((res) => {
        console.log("res summary--- ", res.data);
        // let recordList = res.data;
    //    let  recordArr = recordList.sort((a, b) =>
    //                 a.casesPerOneMillion > casesPerOneMillion ? 1 : -1
    //               )


    //         console.log('recordArr --- ',recordArr);
        for (let i = 0; i < res.data.length-10; i++) {
            casesPerOneMillion.push(res.data[i].casesPerOneMillion);
            deathsPerOneMillion.push(res.data[i].deathsPerOneMillion);
            testsPerOneMillion.push(res.data[i].testsPerOneMillion);
          states.push(res.data[i].state);
        }
      });

      console.log('casesPerOneMillion ---- ',casesPerOneMillion);
      console.log('deathsPerOneMillion ---- ',deathsPerOneMillion);
      console.log('testsPerOneMillion ---- ',testsPerOneMillion);
      console.log('states -- ',states);
   
    this.getChartData(casesPerOneMillion, deathsPerOneMillion, testsPerOneMillion,states);
  }

 getChartData(casesPerOneMillion, deathsPerOneMillion, testsPerOneMillion,states) {
    this.setState({
        chartData: {
      labels: states,
      datasets: [
        // These two will be in the same stack.
       
        //   {
        //     label: 'Deaths Per Million',
        //     backgroundColor: 'rgba(255,99,132,0.2)',
        //     borderColor: 'rgba(255,99,132,0.2)',
        //     pointBackgroundColor: 'rgba(255,99,132,0.2)',
        //     pointBorderColor: '#fff',
        //     pointHoverBackgroundColor: '#fff',
        //     pointHoverBorderColor: 'rgba(255,99,132,0.2)',
        //     data:deathsPerOneMillion
        //   },
         
          {
            label: 'Tests Per Million',
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 0.6)',
            pointBorderColor: 'rgba(54, 162, 235, 0.6)',
            pointBackgrounColor: 'rgba(54, 162, 235, 0.6)',
            pointRadius: 1,
            data:testsPerOneMillion,
        },
          {
            label: 'Cases Per Million',
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor:  'rgba(255, 99, 132, 0.6)',
            pointBorderColor: 'rgba(255, 99, 132, 0.6)',
            pointBackgrounColor: 'rgba(255, 99, 132, 0.6)',
            pointRadius: 1,
            data: casesPerOneMillion
          }
    ],
}
    })
    
    }

    

  render() {
      let {chartData} = this.state;
      console.log("chartData in redner --- ",chartData);
   return <div>  
      {  chartData ?   
        <Radar data={chartData} />

    :null}</div>;
  }
}
export default  Chart ;
