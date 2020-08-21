import React from "react";
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";
import { Map, CircleMarker, TileLayer, Tooltip } from "react-leaflet";



class MapChart extends React.Component {
  constructor(props) {
    super(props)
   this.state={
     data:[],
   }

  }
    
  
  async componentDidMount(){
      await axios.get("https://covid19.mathdro.id/api/confirmed").then((res) => {
        console.log(res);
      this.setState({data:res.data});
     // https://covid19.mathdro.id/api/confirmed
    });
  }



  render(){
    let {data} = this.state;
    return (
      <>
      <div className="map" style={{ borderRadius: "30px" }}>
      
          <Map
            style={{
              height: "450px",
              width: "95%",
              margin: "10px",
              top: "30px",
            }}
            zoom={1}
            center={[-0.09, 51.505]}
            worldCopyJump
          >
            <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {data !== undefined &&
              data.map((record) => {
                if (record.lat !== null) {
                  return (
                    <CircleMarker key={record.uid}
                      center={[record.lat, record.long]}
                      radius={5 * Math.log(record.confirmed / 1000)}
                      color="rgb(241, 85, 85)"
                    >
                      <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                        <span>
                          {record.countryRegion} {record.provinceState}
                        </span>
                        <br></br>
                        <span>Confirmed: {record.confirmed}</span>
                        <br></br>
                        <span>Recovered: {record.recovered}</span>
                        <br></br>
                        <span>Deaths: {record.deaths}</span>
                        <br></br>
                        <span>Active: {record.active}</span>
                      </Tooltip>
                    </CircleMarker>
                  );
                }
              })}
          </Map>
      
      </div>
    </>
    )
  }
}


export default MapChart;