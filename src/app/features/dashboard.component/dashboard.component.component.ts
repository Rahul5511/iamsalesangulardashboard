import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { LoginService } from '../../core/services/auth/loginservice';
import { User } from '../auth/logintypes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    ChartModule,
    MenuModule,
    PanelModule,
    TableModule,
    AvatarModule,
    BadgeModule,
    ProgressBarModule,
    TagModule
  ],
  templateUrl: './dashboard.component.component.html',
  styleUrls: ['./dashboard.component.component.css']
})
export class DashboardComponent implements OnInit {
  sidebarVisible = false;
  currentUser: User | null = null;

  // Menu items for sidebar navigation
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard'
    },
    {
      label: 'Analytics',
      icon: 'pi pi-chart-line',
      items: [
        { label: 'Reports', icon: 'pi pi-chart-bar' },
        { label: 'Statistics', icon: 'pi pi-chart-pie' }
      ]
    },
    {
      label: 'Users',
      icon: 'pi pi-users',
      items: [
        { label: 'User Management', icon: 'pi pi-user' },
        { label: 'Roles', icon: 'pi pi-shield' }
      ]
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      items: [
        { label: 'Profile', icon: 'pi pi-user-edit' },
        { label: 'Preferences', icon: 'pi pi-sliders-h' }
      ]
    }
  ];

  // Sample data for charts
  chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Revenue',
        data: [65000, 59000, 80000, 81000, 56000, 55000],
        fill: false,
        borderColor: '#3B82F6',
        tension: 0.4
      },
      {
        label: 'Expenses',
        data: [28000, 48000, 40000, 19000, 86000, 27000],
        fill: false,
        borderColor: '#EF4444',
        tension: 0.4
      }
    ]
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Pie chart data
  pieData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
        hoverBackgroundColor: ['#2563EB', '#059669', '#D97706']
      }
    ]
  };

  pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  // Sample table data
  recentActivities = [
    { id: 1, user: 'John Doe', action: 'Login', timestamp: '2024-01-15 10:30', status: 'success' },
    { id: 2, user: 'Jane Smith', action: 'Updated Profile', timestamp: '2024-01-15 09:45', status: 'success' },
    { id: 3, user: 'Bob Johnson', action: 'Failed Login', timestamp: '2024-01-15 09:30', status: 'error' },
    { id: 4, user: 'Alice Brown', action: 'Created Report', timestamp: '2024-01-15 08:15', status: 'success' },
    { id: 5, user: 'Charlie Wilson', action: 'Logout', timestamp: '2024-01-15 08:00', status: 'success' }
  ];

  // Dashboard stats
  stats = [
    { title: 'Total Users', value: '2,543', change: '+12%', icon: 'pi pi-users', color: 'bg-blue-500' },
    { title: 'Revenue', value: '$45,231', change: '+8%', icon: 'pi pi-dollar', color: 'bg-green-500' },
    { title: 'Orders', value: '1,234', change: '+23%', icon: 'pi pi-shopping-cart', color: 'bg-purple-500' },
    { title: 'Conversion', value: '3.2%', change: '-2%', icon: 'pi pi-percentage', color: 'bg-orange-500' }
  ];

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.loginService.getCurrentUser();
  }

  getUserInitials(user: string): string {
    return user.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'Active': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Inactive': 'bg-red-100 text-red-800',
      'Completed': 'bg-blue-100 text-blue-800'
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
  }
}
