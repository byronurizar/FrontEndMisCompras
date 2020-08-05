import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavService, Menu } from '../../service/nav.service';
import { TranslateService } from '@ngx-translate/core';

import { CustomizerService } from '../../service/customizer.service';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { Observable, of } from 'rxjs';
import { Carrito } from 'src/app/servicios/carrito.service';
import { environment } from 'src/environments/environment';

var body = document.getElementsByTagName("body")[0];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public menuItems: Menu[];
  public items: Menu[];
  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public text: string;
  public openNav: boolean = false;
  public right_sidebar: boolean = false;
  public openToggle: boolean = false;
  public open : boolean = false;
  public openSearch : boolean = false;
  public cartItems: Observable<any[]> = of([]);
  public selectCartItems: any[] = [];
  @Output() rightSidebarEvent = new EventEmitter<boolean>();
  @Output() toggleEvent = new EventEmitter<boolean>();
  public urlImagenes = environment.urlImagnes;
  constructor(public navServices: NavService,public conectorApi: ConectorApi,
    private translate: TranslateService,
    public customize: CustomizerService, private cartService: Carrito,) {
    // translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.navServices.items2().subscribe(menuItems => {
      this.items = menuItems
    });
    this.cartItems = this.cartService.getTodos();
    this.cartItems.subscribe(selectCartItems => this.selectCartItems = selectCartItems)
    console.log("Datos carrito",this.selectCartItems);
  }


  salir(proveedor) {
    //console.log(proveedor);
    this.conectorApi.logout();
  }

  clickSearch(){
    this.openSearch = !this.openSearch;
  }

  right_side_bar() {
    this.right_sidebar = !this.right_sidebar
    this.rightSidebarEvent.emit(this.right_sidebar)
  }

  ngOnDestroy() {
    this.removeFix();
  }

  openHeaderMenu(){
    this.open = !this.open;
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }

  public changeLanguage(lang) {
    this.translate.use(lang)
  }

  checkSearchResultEmpty(items) {
    if (!items.length)
      this.searchResultEmpty = true;
    else
      this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    body.classList.add("offcanvas");
  }

  removeFix() {
    this.searchResult = false;
    body.classList.remove("offcanvas");
    this.text = "";
  }

  switchToggle() {
    this.openToggle = !this.openToggle;
    this.toggleEvent.emit(this.openToggle);
  }

}
