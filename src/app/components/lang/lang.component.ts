import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslationService } from '../../../services/translation.service';

@Component({
  standalone: true,
  selector: 'app-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.scss'],
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule, MatButtonToggleModule]
})
export class LangComponent implements OnInit {

  constructor(public translationService: TranslationService) { }

  ngOnInit() {
  }

  public changeLang(lang: string) {
    this.translationService.changeLang(lang);
  }

  public getLangName(lang: string){
    if(lang == 'en') {
      return 'English';
    } else if(lang == 'bg'){
      return "Български";
    } else {
      return 'English';
    }
  }

}
