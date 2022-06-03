import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Routing } from './common/enum/routing.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public routes: typeof Routing = Routing;

  constructor(private router:Router){}

  public navigate(route:string):void{
    this.router.navigate([route]);
  }
}
