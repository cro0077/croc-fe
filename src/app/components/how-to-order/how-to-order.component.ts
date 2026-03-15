import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatAnchor, MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-how-to-order',
  standalone: true,
  imports: [TranslateModule, MatButtonModule],
  templateUrl: './how-to-order.component.html',
  styleUrl: './how-to-order.component.scss'
})
export class HowToOrderComponent {

}
