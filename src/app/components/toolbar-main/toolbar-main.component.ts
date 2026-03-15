import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { LangComponent } from '../lang/lang.component';

@Component({
  selector: 'app-toolbar-main',
  standalone: true,
  imports: [TranslateModule, MatToolbar, MatButtonModule, FormsModule, RouterLink,
    LangComponent    
  ],
  templateUrl: './toolbar-main.component.html'
})
export class ToolbarMainComponent implements OnInit, OnDestroy {

  public isColorChanged = true;

  constructor(
  ) {
    

  }

  ngOnInit() {
  }

  
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: any) {
    if (event.target.scrollingElement.scrollTop > 0 && this.isColorChanged == true) {
      this.isColorChanged = false;
    } else if (event.target.scrollingElement.scrollTop == 0 && this.isColorChanged == false) {
      this.isColorChanged = true;
    }
  }
  
  ngOnDestroy(): void {
  }
}
