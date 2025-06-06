import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styles: [
    `
:host {
  display: block;
  height: 100vh;
}
.app-container {
  min-height: 100vh;
  background-color: #f9f9fb;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}`
  ]
})
export class AppComponent {
  title = 'Tallerazo';
}
