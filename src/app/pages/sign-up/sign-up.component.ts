import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { error } from 'console';
import { IRegister } from '../../../modles/auth.modle';
import { phoneNumberRegex } from '../../regex/phone';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  registerForm: FormGroup;
  imageData: String = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    if (localStorage.getItem('token')) {
      this.router.navigate(['user','home']);
    }

    this.registerForm = fb.group(
      {
        name: ['', [Validators.required, Validators.pattern('[A-Z a-z]{3,}')]],
        email: ['', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}') ]],
        phone: ['', [Validators.required, Validators.pattern(phoneNumberRegex)]],
        image: [''],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: [this.passwordMatch()] }
    );
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get image() {
    return this.registerForm.get('image');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  onFileSelect(event: Event) {
    var file = (event.target as HTMLInputElement).files?.[0];

    const allowedMimeTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
    ];

    this.registerForm.patchValue({ image: file });

    if (file && allowedMimeTypes.includes(file.type))
    {
      const reader = new FileReader();

      reader.onload = () => {
        this.imageData = reader.result as String;
      }

      reader.readAsDataURL(file);
    }
  }

  // this.existEmailValidator()
  // existEmailValidator(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     let emailVal: string = control.value;
  //     let ValidationErrors = { EmailNotValid: { value: emailVal } };
  //     if (emailVal.length == 0 && control.untouched) return null;
  //     return emailVal.includes('.com') ? null : ValidationErrors;
  //   };
  // }

  passwordMatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let passControl = control.get('password');
      let confirmPassControl = control.get('confirmPassword');
      if (
        !passControl ||
        !confirmPassControl ||
        !passControl.value ||
        !confirmPassControl.value
      )
        return null;
      let valErr = {
        UnmatchedPassword: {
          pass: passControl?.value,
          confirm: confirmPassControl?.value,
        },
      };
      return passControl?.value == confirmPassControl?.value ? null : valErr;
    };
  }

  submit() {
    let userModel: IRegister = this.registerForm.value as IRegister;
    delete userModel.confirmPassword;
    // console.log(userModel);
    this.authService.createNewUserRequest(userModel, this.registerForm.value.image).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.router.navigate(['/signIn']);
      },
    });
  }
}
