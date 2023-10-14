import React, { Component } from 'react';
import { ReactBingmaps } from 'react-bingmaps';
import './App.css';

class App extends Component {
  
  AddPushPinOnClick(location){
    //Outputs latitude and longitude
    
  }
  
  render() {
    return (
    <div>
    <h1 style={{textAlign:'center'}}>ECharge</h1>
     <div className="mapo">
     <ReactBingmaps className="maps"
     bingmapKey = "AqkY1TYoFDVY2YN_YfMhW0m6z1aPqElSo3B7dIlTmbuk99XVTana35dZu63eomun" 
     center = {[12.9716, 77.5946]}
     zoom = {13}
  
    infoboxesWithPushPins = {[
      {
        "location":[12.850956,77.657249], 
        "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
        "infoboxOption": { title: 'HSR Charging', description: 'Fast Charger' },
        "pushPinOption":{color: 'green', title: 'HSR Charging', description: 'Fast Charger' },
        "infoboxAddHandler": {"type" : "click", callback: this.callBackMethod },
        "pushPinAddHandler": {"type" : "click", callback: this.callBackMethod }
      },
      {
        "location":[12.9716, 77.5946], 
        "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
        "infoboxOption": { title: 'HSR Charging', description: 'Fast Charger' },
        "pushPinOption":{color: 'green', title: 'HSR Charging', description: 'Fast Charger' },
        "infoboxAddHandler": {"type" : "click", callback: this.callBackMethod },
        "pushPinAddHandler": {"type" : "click", callback: this.callBackMethod }
      },
      {
        "location":[12.972956,77.617249], 
        "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
        "infoboxOption": { title: 'HSR Charging', description: 'Fast Charger' },
        "pushPinOption":{color: 'green', title: 'HSR Charging', description: 'Fast Charger' },
        "infoboxAddHandler": {"type" : "click", callback: this.callBackMethod },
        "pushPinAddHandler": {"type" : "click", callback: this.callBackMethod }
      },
      {
        "location":[12.916540,77.630780], 
        "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
        "infoboxOption": { title: 'HSR Charging', description: 'Fast Charger' },
        "pushPinOption":{color: 'green', title: 'HSR Charging', description: 'Fast Charger' },
        "infoboxAddHandler": {"type" : "click", callback: this.callBackMethod },
        "pushPinAddHandler": {"type" : "click", callback: this.callBackMethod }
      }
      ,
      {
        "location":[12.976540,77.550780], 
        "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
        "infoboxOption": { title: 'HSR Charging', description: 'Fast Charger' },
        "pushPinOption":{color: 'green', title: 'HSR Charging', description: 'Fast Charger' },
        "infoboxAddHandler": {"type" : "click", callback: this.callBackMethod },
        "pushPinAddHandler": {"type" : "click", callback: this.callBackMethod }
      },
      {
        "location":[12.956540,77.550780], 
        "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
        "infoboxOption": { title: 'HSR Charging', description: 'Fast Charger' },
        "pushPinOption":{color: 'green', title: 'HSR Charging', description: 'Fast Charger' },
        "infoboxAddHandler": {"type" : "click", callback: this.callBackMethod },
        "pushPinAddHandler": {"type" : "click", callback: this.callBackMethod }
      }
    ]
    }
    getLocation = {
      {addHandler: "click", callback:this.AddPushPinOnClick}
    }

    // boundary = {
    //   {
    //     "location":['bangalore'],
    //     "option":{
    //       entityType: 'PopulatedPlace'
    //     },
    //     "polygonStyle" :{
    //       fillColor: 'rgba(161,224,255,0.4)',
    //       strokeColor: '#a495b2',
    //       strokeThickness: 2
    //     }
    //   }
    // }

     > 
   </ReactBingmaps>
   </div>
    </div>
    );
    }
   }

export default App;


   /*
     pushPins = {
      [
        {
          "location":[12.9716, 77.5946], "option":{ color: 'green' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
        },
        {
          "location":[12.972956,77.617249], "option":{ color: 'green' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
        },
        {
          "location":[12.916540,77.630780], "option":{ color: 'green' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
        },
        {
          "location":[12.976540,77.550780], "option":{ color: 'green' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
        },
        {
          "location":[12.956540,77.550780], "option":{ color: 'green' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
        }
      ]
    }
    disableStreetside={true}
    infoboxes = {
      [
        {
          "location":[12.950956,77.607249], "option":{ title: 'HSR Charging', description: 'Fast Charger' }, "addHandler": {"type" : "click", callback: this.callBackMethod}
        } 
      ]
    }
    */


/////////////////////////////////////////////////////////
/////////////////////////TESTING MAPS

// import React from 'react';
// // import logo from './logo.svg';
// import './App.css';
// // import { Map, GoogleApiWrapper } from 'google-maps-react';
// import { ReactBingmaps } from 'react-bingmaps';
// import { render } from '@testing-library/react';

// function App() {
  
//   return (
//     <div className="App">
//       <header className="App-header">
//       {/* <h1 style={{textAlign:'center'}}>ECharge</h1> */}
//       </header>
//       {/* <body>  */}
//       {/* <Map
//         google={this.props.google}
//         zoom={8}
//         style={mapStyles}
//         initialCenter={{ lat: 47.444, lng: -122.176}}
//       /> */}
//       <ReactBingmaps className="maps"
//   bingmapKey = "AqkY1TYoFDVY2YN_YfMhW0m6z1aPqElSo3B7dIlTmbuk99XVTana35dZu63eomun" 
//   // center = {[12.9716, 77.5946]}
//   > 
// </ReactBingmaps>
//       {/* </body> */}
//     </div>
//   );
    
// }

// const mapStyles = {
//   width: '100%',
//   height: '100%',
// };


// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyCTqzS2NSx5h0atkgdlY0Ugp46F5cElX2E'
// })(App);


// export default App;

/////////////////////////////////////////////////

// import React, { Component } from 'react';
// // import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
// import { ReactBingmaps } from 'react-bingmaps';
// import './App.css';

// class App extends Component {

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     stores: [{lat: 12.9716, lng: 77.5946},
  //             {latitude: 11.4716, longitude: 77.8946},
  //             {latitude: 12.5716, longitude: 77.6546},
  //             {latitude: 12.7716, longitude: 77.446},
  //             {latitude: 12.3716, longitude: 77.3946},
  //             {latitude: 13.5716, longitude: 76.5946}]
  //   }
  // }

  // displayMarkers = () => {
  //   return this.state.stores.map((store, index) => {
  //     return <Marker key={index} id={index} position={{
  //      lat: store.latitude,
  //      lng: store.longitude
  //    }}
  //    onClick={() => console.log("You clicked me!")} />
  //   })
  // }  

//  render() {
//  return (
//  <div>
//  <h1 style={{textAlign:'center'}}>ECharge</h1>
//  {/* <Map google={this.props.google} 
//         zoom={12}
//         style={mapStyles}
//         initialCenter={{ lat: 12.9716, lng: 77.5946}} >
//   {this.displayMarkers()}
//   <Marker />
//   </Map> */}
//   {/* <Marker /> */}
//   <div className="mapo">
//   <ReactBingmaps className="maps"
//   bingmapKey = "AqkY1TYoFDVY2YN_YfMhW0m6z1aPqElSo3B7dIlTmbuk99XVTana35dZu63eomun" 
//   center = {[12.9716, 77.5946]}
//   > 
// </ReactBingmaps>
// </div>
//  </div>
//  );
//  }
// }

// const mapStyles = {
//   width: '80%',
//   height: '80%',
//   marginLeft: '140px',  
// };

// export default GoogleApiWrapper({
//  apiKey: ('AIzaSyCTqzS2NSx5h0atkgdlY0Ugp46F5cElX2E')
// //  AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk
// // Mine : AIzaSyCTqzS2NSx5h0atkgdlY0Ugp46F5cElX2E
// })(App);

// export default App;