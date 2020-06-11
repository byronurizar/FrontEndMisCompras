import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule }   from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavService} from './service/nav.service';
import { TranslateModule } from '@ngx-translate/core';
import {LoaderComponent } from './components/loader/loader.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [LoaderComponent,HeaderComponent, FooterComponent, SidebarComponent],
  imports: [CommonModule, RouterModule,TranslateModule,FormsModule,NgbModule],
  exports: [LoaderComponent,HeaderComponent, TranslateModule,FooterComponent, SidebarComponent],
  providers:[NavService]
})
export class SharedModule { }
