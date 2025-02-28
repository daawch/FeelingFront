import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLoginDTO } from '../model/UserLoginDTO';
import { AlertsService } from '../service/alerts.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLoginDTO = new UserLoginDTO()

  constructor(
    private auth: AuthService,
    private route: Router,
    private alertService: AlertsService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  enter() {
    this.auth.enter(this.userLogin).subscribe({
      next: (resp: UserLoginDTO) => {
        this.userLogin = resp
        environment.token = this.userLogin.token
        environment.photo = this.userLogin.photo
        environment.name = this.userLogin.name
        environment.id = this.userLogin.id
        environment.email = this.userLogin.email

        this.route.navigate(['/home'])
      },
      error: erro => {
        if (erro.status == 401) {
          this.alertService.showAlertDanger('Usuario ou senha incorretos!')
        }
      }
    })
  }

}
