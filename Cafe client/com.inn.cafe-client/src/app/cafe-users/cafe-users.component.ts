import { Component, inject, OnInit } from '@angular/core';
import { CafeUsersService } from './cafe-users.service';
import { User } from '../domain/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cafe-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cafe-users.component.html',
  styleUrl: './cafe-users.component.css'
})
export class CafeUsersComponent implements OnInit {
    userService: CafeUsersService = inject(CafeUsersService);
    users: User[] = [];
    
    ngOnInit(): void {
      this.getUsers();
    }

    getUsers(): void {
      this.userService.getUsers().subscribe(data=>{
          this.users = data;
      });
    }

}
