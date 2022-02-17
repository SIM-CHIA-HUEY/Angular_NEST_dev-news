import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css']
})
export class GooglemapComponent implements OnInit {
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;
  locationChosen = false; 

  constructor() { }

  onChoseLocation(event: { coords: { lat: number; lng: number; }; }) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }
  
  getCurrentLocation() {
    
   
  }

  ngOnInit(): void {
    if ("geolocation" in navigator) {
      console.log("la géolocalisation est disponible");
      navigator.geolocation.getCurrentPosition(position => {
        try {
          const latt = position.coords.latitude;
          const lngg = position.coords.longitude;
          let url = 'https://api-adresse.data.gouv.fr/reverse/?lon=' + lngg + '&lat=' + latt
          fetch(url)
            .then(response => response.json())
            .then(data => {
              console.log(data.features[0].properties.city);
              let city = data.features[0].properties.city;
              document.getElementById('latitude').textContent = city;
            })
        } catch (err) {
          console.error(err);
        }

        console.log(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.log("la géolocalisation est indisponible")
    }

   

  }


}
