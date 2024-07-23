import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { PasswordStrengthService } from '../services/password-strength.service';
import { PasswordInputComponent } from '../password-input/password-input.component';
import { PasswordStrengthIndicatorComponent } from '../password-strength-indicator/password-strength-indicator.component';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordInputComponent, PasswordStrengthIndicatorComponent],
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent implements OnInit, OnDestroy {
  passwordForm: FormGroup;
  passwordStrength: string = '';
  private passwordSubscription!: Subscription;

  constructor(private fb: FormBuilder, private passwordStrengthService: PasswordStrengthService) {
    this.passwordForm = this.fb.group({
      password: ['']
    });
  }

  ngOnInit(): void {
    this.passwordSubscription = this.passwordForm.get('password')!.valueChanges.subscribe(password => {
      this.passwordStrength = this.passwordStrengthService.calculateStrength(password);
    });
  }

  ngOnDestroy(): void {
    if (this.passwordSubscription) {
      this.passwordSubscription.unsubscribe();
    }
  }
}
