import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';
import { LoggingService } from './shared/logging.service';

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
  logged=this.authService.loggedIn
  constructor(private authService:AuthService, private router:Router) {}
  
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
  @Output() icon = this.authService.icon;
  @Output()isDarkMode = this.authService.isDarkMode;
  toggleDarkMode() {
   this.authService.toggleDarkMode()
   this.icon=this.authService.icon
   this.isDarkMode=this.authService.isDarkMode
  }
}
