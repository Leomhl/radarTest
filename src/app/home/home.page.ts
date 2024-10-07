import { ChangeDetectorRef, Component } from '@angular/core';
import { Radar } from 'capacitor-radar';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public intervalInput = 10;
  public currentInterval = 10;
  public locationUpdates: Array<string> = [];
  private listenerRegistered = false;
  intervalStopper: any;
  
  constructor(private cd: ChangeDetectorRef) {
    const userId = '11223344';
    const description = 'Just ignore it, tests purposes here';
    Radar.setUserId({userId});
    Radar.setDescription({description});
    this.requestLocationPermission();
  }

  requestLocationPermission(): void {
    Radar.getLocationPermissionsStatus().then((result) => {
      if(result.status == 'DENIED') {
        Radar.requestLocationPermissions({background: true});
        return;
      }

      if(!this.listenerRegistered)this.startLocationListener();
    });
  }

  getCurrentDateTime(): string {
    var currentdate = new Date();
    var datetime = currentdate.getDay() + "/" + currentdate.getMonth() 
    + "/" + currentdate.getFullYear() + " @ " 
    + currentdate.getHours() + ":" 
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    return datetime;
  }

  startLocationListener(): void {
    this.listenerRegistered = true;
    void Radar.addListener('location', () => {
      const dateTime = this.getCurrentDateTime();
      this.locationUpdates.unshift(`Location update: ${dateTime}`);
      this.cd.detectChanges();
    });

    void Radar.addListener('error', (result) => {
      const dateTime = this.getCurrentDateTime();
      this.locationUpdates.unshift(`Error: ${dateTime} - ${JSON.stringify(result)}`);
      this.cd.detectChanges();
    });
  }

  start(): void {
    /**
     *  The following approach isn't respecting our time intervals and frequency update
     */
      this.requestLocationPermission();
      Radar.startTrackingVerified({interval: this.currentInterval, beacons: false})
    
    
    /**
     *  The following approach works fine respecting our time intervals and frequency update.
     * To use it, uncomment the following lines and comment the Radar.startTrackingVerified command above
     */

      // this.stop();
      // this.intervalStopper = setInterval(() => {
      //   Radar.trackVerified({
      //     beacons: false
      //   });
      // }, this.currentInterval*1000);

      this.currentInterval = this.intervalInput;
      // const logText = `Radar.trackVerified() -> ${this.currentInterval} sec`;
      const logText = `Radar.startTrackingVerified() -> ${this.currentInterval} sec`;
      this.locationUpdates.unshift(logText);
      this.cd.detectChanges();    
  }

  stop(): void {
    Radar.stopTrackingVerified();

    /**
     * If you want to use the manual approach to control the setInterval, please uncomment the following
     * line and comment Radar.stopTrackingVerified() above
     */
    
    // clearInterval(this.intervalStopper);

    // const logText = 'clearInterval() - Interval Stopped';
    const logText = 'Radar.stopTrackingVerified()';
    this.locationUpdates.unshift(logText);
  }
}
