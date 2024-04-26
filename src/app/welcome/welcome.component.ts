import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  authService = inject(AuthService)
}
