import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-strength-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-strength-indicator.component.html',
  styleUrls: ['./password-strength-indicator.component.scss']
})
export class PasswordStrengthIndicatorComponent implements OnChanges {
  @Input() passwordStrength: string = 'empty';

  ngOnChanges(): void {
    // Logic to handle changes can be added here
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
