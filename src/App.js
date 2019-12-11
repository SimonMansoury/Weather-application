import React from "react";
import Info from "./components/info"
import Form from "./components/form"
import Weather from "./components/weather"


const API_ID = "be0b48fd9f116e3c3d29a8ceb7f0462c";

class App extends React.Component
{

      state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error:undefined
      }

      gettingWeather = async (e) => {


      e.preventDefault();
      var city = e.target.elements.city.value;

      if(city)
      {
        const api_url = await
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_ID}`);
        const data = await api_url.json();
        /*
        var date = new Date();
        date.setTime(sunset);
        var sunset_date = date.getHours() + ":" + date.getMinutes();
        */
        var sunset = data.sys.sunset;

        const time = ms =>{
                var date = new Date(ms*1000);
                var hours = date.getHours();
                // Minutes part from the timestamp
                var minutes = "0" + date.getMinutes();
                // Seconds part from the timestamp
                return hours + ':' + minutes.substr(-2);
            }

            var sunset_date = time(sunset);
      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunset: sunset_date,
        error: ""

      });
      }
      else {
        this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          pressure: undefined,
          sunset: undefined,
          error: "Enter a city!"
        });
      }
  }
  render()
  {
    return(
<div className="wrapper">
   <div className="main">
      <div className="container">
         <div className="row">
            <div className="col-sm-5">
               <Info/>
            </div>
            <div className="col-sm-7 form">
               <Form weatherMethod={this.gettingWeather}/>
               <Weather
               temp = {Math.round(this.state.temp - 273.15 )}
               city = {this.state.city}
               country = {this.state.country}
               pressure = {this.state.pressure}
               sunset = {this.state.sunset}
               error = {this.state.error}/>
            </div>
         </div>
      </div>
   </div>
</div>
)}
}
export default App;
