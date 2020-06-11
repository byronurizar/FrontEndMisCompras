import { Component, OnInit, Input } from '@angular/core';
import { CustomizerService } from '../../shared/service/customizer.service'
import { NavService } from 'src/app/shared/service/nav.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public toggle;

  openToggle: boolean;
  constructor(public customize: CustomizerService,public navService : NavService) { 
    if (this.navService.openToggle == true) {
      this.openToggle = !this.openToggle;
      this.toggle = this.openToggle;
    }
  }
  
  receiveToggle($event) {
    this.openToggle = $event
    this.toggle = this.openToggle;
  }

  ngOnInit() { }

}
