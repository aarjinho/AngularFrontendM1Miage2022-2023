import { Component, EventEmitter } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { delay, Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';
import { LoggingService } from './shared/logging.service';
import { DarkModeService } from './dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// export class AppComponent implements CanActivate {
//   constructor(private loginService: LoggingService, 
//           private router: Router, 
//           private activatedRouter: ActivatedRoute,private authService:AuthService) { }

//   canActivate(activatedRouteSnapshot:ActivatedRouteSnapshot,
//          routerStateSnapshot: RouterStateSnapshot): Observable<boolean> {
//      return this.authService.logIn().pipe(
//        map((res: any) => {
//          ...
//          return res.success;
//        }),
//        tap(res => {
//          if (!res)
//          {
//            this.router.navigate(['/login'], 
//              { queryParams: { returnUrl: routerStateSnapshot.url } });
//          }
//        }))
//     } 
// }
export class AppComponent {
  title = 'Application de gestion des assignments';
  logged=false
  constructor(private authService:AuthService, private router:Router,public darkModeService: DarkModeService) {}

  ngOnInit(){
    this.authService
    .getLogChange()
    .pipe(delay(0))
    .subscribe((value) => {
      this.logged = value;
    });

}
  open=false
  login() {
    if(!this.authService.loggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.authService.logOut();
      this.logged=true
      this.router.navigate(['/home']);

    }
  }
  icon = 5;
  isDarkMode = false;
  toggleDarkMode() {
    if(this.icon==4)
      this.icon +=1;
    else
    this.icon -=1;
    this.darkModeService.isDarkMode = !this.darkModeService.isDarkMode;
  }
}
