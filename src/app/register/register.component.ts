import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  register:any = FormGroup;
  submitted:boolean = false;
  

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,Validators.email])],
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      pnumber: new FormControl('', [Validators.required]),
      dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      cidnum: new FormControl('', [Validators.required]),
      conpassword: new FormControl('', [Validators.required]),
      
    },
    {
      validators: this.MustMatch('password', 'conpassword')
    });
  }
  get f () {
    return this.form.controls;
  }

  MustMatch(controlName: string, matchingControlName: string){
    return(formGroup: FormGroup)=>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if(matchingControl.errors && !matchingControl.errors['MustMatch']){
        return
      }
      if(control.value !== matchingControl.value){
        matchingControl.setErrors({MustMatch:true});
      }
      else{
        matchingControl.setErrors(null);
      }

    }
  }

  onSubmit(){
    this.submitted = true;
    if(this.form.valid){
    this.authService.register(this.form.value).subscribe((data) =>{
      if(data.success){
        console.log(data);
        alert('Register Success');
        this.router.navigateByUrl('/login');
      }else{
        console.log(data);
        alert('Registeration failed. Try again');
      }
    });
  }
  }
  
  ngOnInit(): void {
   
  }

  goToLogin(){
    this.router.navigate(['login']);
  
  }
 

}
