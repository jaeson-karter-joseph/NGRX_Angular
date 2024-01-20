import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorInterface } from '../types/backendError.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-backend-error-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backend-error-messages.component.html',
  styleUrl: './backend-error-messages.component.css'
})
export class BackendErrorMessagesComponent implements OnInit {

  @Input() backendErrors: BackendErrorInterface = {};

  errorMesssages : string[] = [];

  ngOnInit(): void {
    this.errorMesssages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name].join(' ');
      return `${name} ${messages}`;
    })
  }

}
