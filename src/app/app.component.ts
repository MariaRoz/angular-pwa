import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register('/ngsw-worker.js').then((registration) => { console.log('ServiceWorker registration successful with scope:', registration.scope); })
        .catch(err => console.log('ServiceWorker registration failed:', err));
    }
  }

}
