import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

declare global {
  interface Window { MyNamespace: any; }
}

window.MyNamespace = window.MyNamespace || {};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DarkX';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getIpAddress();
  }

  public getIpAddress() {

    var findIP = new Promise(r => {
      var w: any = window, a = new (w.RTCPeerConnection || w.mozRTCPeerConnection || w.webkitRTCPeerConnection)
        ({ iceServers: [] }), b = () => { };
      a.createDataChannel("");
      a.createOffer(c => a.setLocalDescription(c, b, b), b);
      a.onicecandidate = c => {
        try {
          c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)
        } catch (e) { }
      }
    })
    findIP.then(ip =>
      this.checkUniqGuest(ip)
    ).catch(e =>
      console.error(e))
  }

  public checkUniqGuest(data: any) {
    var information = {
      visitDate: Date,
      ip: data
    }
    return this.http.post(environment.apiUrl + "/statistics/uniq-guest", information)
      .subscribe(response => {
      });
  }
}
