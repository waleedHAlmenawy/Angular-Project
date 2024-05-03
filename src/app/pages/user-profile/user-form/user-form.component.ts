import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../services/user-profile/user-profile.service';
import { Router } from '@angular/router';
import { relative } from 'path';
import { Location } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { IEditProfile, IProfile } from '../../../../modles/profile.modle';
import { IUser } from '../../../../modles/user.modle';
import { phoneNumberRegex } from '../../../regex/phone';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userProfileService: UserProfileService,
    private location: Location
  ) {}

  user: IProfile = {
    name: '',
    email: '',
    phone: '',
    imagePath: '',
    wishList: [],
  };

  updateForm: FormGroup;

  imageData: String;

  ngOnInit(): void {
    this.user = this.userProfileService.user;
    this.imageData = this.user.imagePath;

    this.updateForm = this.formBuilder.group({
      name: [this.user.name, [Validators.pattern('[A-Z a-z]{3,20}')]],
      phone: [this.user.phone, [Validators.pattern(phoneNumberRegex)]],
      image: [''],
    });
  }

  onFileSelect(event: Event) {
    var file = (event.target as HTMLInputElement).files?.[0];

    const allowedMimeTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
    ];

    this.updateForm.patchValue({ image: file });

    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imageData = reader.result as String;
      };

      reader.readAsDataURL(file);
    }
  }

  get name() {
    return this.updateForm.get('name');
  }

  get phone() {
    return this.updateForm.get('phone');
  }

  onSubmit() {
    let userModel: IEditProfile = this.updateForm.value as IEditProfile;
    delete userModel.confirmPassword;

    let userData = new FormData();

    if (userModel.name) {
      userData.append('name', userModel.name);
    }

    if (userModel.image) {
      userData.append('image', userModel.image);
    }

    if (userModel.phone) {
      userData.append('phone', userModel.phone);
    }

    this.userProfileService.patchUser(userData);
    this.location.back();
  }
}
