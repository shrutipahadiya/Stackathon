import React,{Component} from 'react'
import { HashRouter, Route } from 'react-router-dom';
import Nav from './Nav';
import LineChart from './LineChart';
import PieChart from './PieChart';
import MapChart from './Map';
// import BarChart from './BarChart';



class App extends Component{
  constructor(){
    super();
  }
 
  render(){
return (
      <HashRouter>
        <h1>Covid Tracker</h1>
     
        <Route component={Nav} />
        <Route exact path="/linechart" component={LineChart} />
        <Route exact path="/piechart" component={PieChart} />
        <Route exact path="/mapchart" component={MapChart} />
       
       
       </HashRouter>
    );
  }
};


export default App
