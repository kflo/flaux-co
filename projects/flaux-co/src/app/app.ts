import { Component } from '@angular/core';
import { BgComponent } from '../components/bg/bg.component';

@Component({
  selector: 'app-root',
  imports: [BgComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'flaux-co';

}
