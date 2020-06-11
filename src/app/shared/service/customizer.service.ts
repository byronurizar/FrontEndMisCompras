import { Injectable } from '@angular/core';
import { ConfigDB } from '../data/config/config';
@Injectable({
  providedIn: 'root'
})
export class CustomizerService {

  constructor() { 
  }
    // Set Customize layout Version
    setLayoutType(layout) {
      document.body.setAttribute("main-theme-layout", layout);
      this.data.mainThemeLayout=layout
    }

    // Configration Layout
      public data = ConfigDB.data
 
    menuLayoutType(layout){
        this.data.menuLayout=layout
    }

    sidebarLayoutType(layout){
      this.data.scroll=layout
    }

    sidebarNavLayoutType(layout){
      this.data.borderNavigation=layout
    }

    rightSidebarIconType(layout){
      this.data.rightSidebarIcon=layout
    }

    backgroungImageType(layout){
      this.data.backgroungImage=layout
    }

    defaultLayoutType(layout){
      this.data.defaultNavigation=layout
      this.data.scroll="custom-scrollbar",
      this.data.borderNavigation='',
      this.data.rightSidebarIcon='',
      this.data.backgroungImage=''
    }

    headerLayoutType(val){
      this.data.header.semiLightbgColor=val;
      this.data.header.headerBgColor=val;
    }

    brandLayoutType(val){
      this.data.header.semiLightbgColor=val;
      this.data.header.headerBgColor="";
    }

    navLayoutType(val){
      this.data.header.semiLightbgColor="";
      this.data.header.headerBgColor=val;
    }



    
}
