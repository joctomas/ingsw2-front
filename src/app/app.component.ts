import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public nombreRegion: String;

  onRegionAdded = (region: String) => {
    this.nombreRegion = region;
  }
}
