import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessServiceService } from '../business-service.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  firstName;
  lastName;
  Contact;
  SignupAs;
  email: string = '';
  password: string = '';
  retypePassword: string = '';
  phone: string = '';
  isSubmitted: boolean = false;
  

  constructor(private router:Router,private api:BusinessServiceService, private routes: Router) { }

  ngOnInit() {
  };

  isEmailValid(): boolean {
    const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return this.email.length != 0 && regex.test(this.email);
  }

  isPasswordValid(): boolean {
    return this.password.length != 0 && this.password.length >= 6 && this.password.length <= 10;
  }

  isPasswordMatchValid() {
    return this.password.length === 0 || this.password.length === this.retypePassword.length;
  }

  isPhoneValid(): boolean {
    const regexs = /([0-9])/;
    return this.phone.length === 10 && regexs.test(this.phone);
  }

  isAllValid(): boolean {
    return this.isEmailValid() && this.isPasswordValid()
  }

  onSignupButtonClick(){
    let newSignup = {firstName: this.firstName,lastName: this.lastName,role: this.SignupAs, Contact_Number: this.phone, email: this.email, password: this.password, retypePassword: this.retypePassword};
    this.api.postSignup(newSignup);
    console.log(newSignup);
    this.isSubmitted = true;
    this.router.navigateByUrl('/Home');
    
  }
  Api=null;
  logout(){
    this.Api=null;
  }

  onLoginButtonClick() {
    const cust = {
      email: this.email,
      password: this.password
      
    };
    
      this.api.Login(cust).subscribe(
        res=>{
          this.Api=res;
          console.log(this.Api);
        }
      );
      console.log("logged in");
     //this.api.username = this.email;
      // this.api.loginbtn = false;
      
      this.router.navigateByUrl('/Home');
    
    
  }

  // signupMy = function(role) {
  //   if(role == "user") {
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }

}
