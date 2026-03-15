import { Component } from '@angular/core';
import { MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { ToolbarMainComponent } from '../toolbar-main/toolbar-main.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterOutlet, MatSidenavContainer, MatSidenavContent, ToolbarMainComponent, FooterComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {
  
  constructor() {
  }

}
