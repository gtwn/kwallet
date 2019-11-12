import { Component, OnInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;
  // tslint:disable-next-line: no-shadowed-variable
  constructor(public authService: AuthService , private _renderer2: Renderer2, @Inject(DOCUMENT) private _document: Document) {}
  ngOnInit () {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
      }
    );
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.username, form.value.password);
  }

  onSignup(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    this.authService.createUser(
      form.value.Account,
      form.value.upUsername,
      form.value.upPassword,
      form.value.Firstname,
      form.value.Lastname,
      form.value.email);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }


}
