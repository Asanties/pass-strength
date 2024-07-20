import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent {
  passwordForm: FormGroup;
  passwordStrength: string = '';

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      password: ['']
    });

    this.passwordForm.get('password')!.valueChanges.subscribe(password => {
      this.passwordStrength = this.calculateStrength(password);
    });
  }

  calculateStrength(password: string): string {
    if (password.length === 0) {
      return 'empty';
    }
    if (password.length < 8) {
      return 'short';
    }

    const hasLetters = /[a-zA-Z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSymbols = /[^a-zA-Z\d]/.test(password);

    if (hasLetters && hasDigits && hasSymbols) {
      return 'strong';
    }
    if ((hasLetters && hasDigits) || (hasLetters && hasSymbols) || (hasDigits && hasSymbols)) {
      return 'medium';
    }
    return 'easy';
  }

  getIndicatorClass(position: number): string {
        if (this.passwordStrength === 'empty') {
      return 'gray';
    }

    if (this.passwordStrength === 'short') {
      return 'red';
    }

    if (this.passwordStrength === 'easy') {
      return position === 1 ? 'red' : 'gray';
    }

    if (this.passwordStrength === 'medium') {
      return position <= 2 ? 'yellow' : 'gray';
    }

    if (this.passwordStrength === 'strong') {
      return 'green';
    }

    return 'gray';
  }
}
