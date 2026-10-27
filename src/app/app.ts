import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  name = 'Star Mukesh';
  role = 'Frontend intern learning HTML, CSS, JavaScript, React and Angular';
  skills = ['HTML', 'CSS', 'JavaScript'];
  message = signal('');

  showMessage() {
    this.message.set('Hello! Welcome to my profile.');
  }
}