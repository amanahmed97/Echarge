// import { GoogleAPIWrapper, InfoWindow, Marker } from 'google-maps-react'

// export class MapContainer extends React.Component {

//     componentDidMount() {
//       this.loadMap();
//     }
//     loadMap() {
//       let map = new window.google.maps.Map(document.getElementById('map'), {
//         center: { lat: -33.8688, lng: 151.2195 },
//         zoom: 13,
//         mapTypeID: 'roadmap'
//       })
//     }
  
//     render() {
//       const style = {
//         width: "100%",
//         hight: "100%"
//       };
//       return (
//         <Map
//         google={this.props.google}
//         zoom={8}
//         style={mapStyles}
//         initialCenter={{ lat: 47.444, lng: -122.176}}
//       />
//       );
//     }
//   }
//   export default GoogleAPIWrapper(
//     {
//       apiKey: "AIzaSyCTqzS2NSx5h0atkgdlY0Ugp46F5cElX2E",
//     }
//   )(MapContainer);