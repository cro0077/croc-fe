import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, RouterModule, MatIcon],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit, OnDestroy {

    
  public contactInfo?: any;

  constructor() {
    this.contactInfo = {
    };
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
