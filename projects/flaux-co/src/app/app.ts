import { Component } from '@angular/core';
import { BgComponent } from '@components/bg/bg.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { DropdownMenuComponent } from '@components/dropdown-menu/dropdown-menu.component';
import { FooterComponent } from '@components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [BgComponent, NavbarComponent, DropdownMenuComponent, RouterModule, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'flaux-co';
  protected logo = 'assets/logo/SVG/Logo-Set-4.svg';
}
