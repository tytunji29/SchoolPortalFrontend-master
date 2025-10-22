import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { NgStyle, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective,
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { navItems } from './_nav';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    DefaultHeaderComponent,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet,
    NgStyle,
    NgFor,
    NgIf,
    NgTemplateOutlet,
    DefaultFooterComponent,
  ],
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  userRole: string | null = '';
  navItemsRegularUser = [
    {
      name: 'Base',
      url: '/base',
      iconComponent: { name: 'cil-puzzle' },
      children: [
        { name: 'Accordion', url: '/base/accordion', icon: 'nav-icon-bullet' },
        {
          name: 'Breadcrumbs',
          url: '/base/breadcrumbs',
          icon: 'nav-icon-bullet',
        },
        { name: 'Cards', url: '/base/cards', icon: 'nav-icon-bullet' },
        { name: 'Countries', url: '/base/country', icon: 'nav-icon-star' },
        { name: 'Carousel', url: '/base/carousel', icon: 'nav-icon-bullet' },
        { name: 'Collapse', url: '/base/collapse', icon: 'nav-icon-bullet' },
        {
          name: 'List Group',
          url: '/base/list-group',
          icon: 'nav-icon-bullet',
        },
        // {
        //   name: 'Reset Password',
        //   url: '/base/password-reset',
        //   icon: 'nav-icon-star',
        // },
        { name: 'Navs & Tabs', url: '/base/navs', icon: 'nav-icon-bullet' },
        {
          name: 'Pagination',
          url: '/base/pagination',
          icon: 'nav-icon-bullet',
        },
        {
          name: 'Placeholder',
          url: '/base/placeholder',
          icon: 'nav-icon-bullet',
        },
        { name: 'Popovers', url: '/base/popovers', icon: 'nav-icon-bullet' },
        { name: 'Progress', url: '/base/progress', icon: 'nav-icon-bullet' },
        { name: 'Spinners', url: '/base/spinners', icon: 'nav-icon-bullet' },
        { name: 'Tables', url: '/base/tables', icon: 'nav-icon-bullet' },
        { name: 'Tabs', url: '/base/tabs', icon: 'nav-icon-bullet' },
        { name: 'Tooltips', url: '/base/tooltips', icon: 'nav-icon-bullet' },
        { name: 'Cards', url: '/base/cards', icon: 'nav-icon-bullet' },
        {
          name: 'List Group',
          url: '/base/list-group',
          icon: 'nav-icon-bullet',
        },
      ],
    },
  ];
  //navItemsRegularUser
  navItemsSuperAdmin = [
    {
      name: 'School',
      url: '/school',
      iconComponent: { name: 'cil-speedometer' },
      badge: {
        color: 'info',
        text: 'NEW',
      },
    },
  ];

  navItemsAdminUser = [
    {
      name: 'Class Management',
      url: '/classmanagement',
      iconComponent: { name: 'cil-puzzle' },
      children: [
        {
          name: 'Classes',
          url: '/classmanagement/classes',
          icon: 'nav-icon-bullet',
        },
        {
          name: 'Classes Level',
          url: '/classmanagement/classeslevel',
          icon: 'nav-icon-bullet',
        },
        {
          name: 'Map Subject To Teacher',
          url: '/classmanagement/mapsubjecttoteacher',
          icon: 'nav-icon-bullet',
        },
      ],
    },
    {
      name: 'Parents',
      url: '/parent',
      iconComponent: { name: 'cil-speedometer' },
      badge: {
        color: 'info',
        text: 'Our Parents',
      },
    },
    {
      name: 'Subjects',
      url: '/teachers/subjects',
      iconComponent: { name: 'cil-speedometer' },
      badge: {
        color: 'info',
        text: 'Our Subjects',
      },
    },
    {
      name: 'Students',
      url: '/student',
      iconComponent: { name: 'cil-speedometer' },
      badge: {
        color: 'info',
        text: 'Our Students',
      },
    },
    {
      name: 'Staff',
      url: '/staff',
      iconComponent: { name: 'cil-speedometer' },
      badge: {
        color: 'info',
        text: 'Our Staffs',
      },
    },
  ];
  navItemsTeacherUser = [
    {
      name: 'Teacher Management',
      url: '',
      iconComponent: { name: 'cil-puzzle' },
      children: [
        { name: 'Classes', url: '/teachers/classes', icon: 'nav-icon-bullet' },
        {
          name: 'Subjects',
          url: '/teachers/subjects',
          icon: 'nav-icon-bullet',
        },
        {
          name: 'Students',
          url: '/teachers/students',
          icon: 'nav-icon-bullet',
        },
        {
          name: 'My Time Table',
          url: '/teachers/mytimetable',
          icon: 'nav-icon-bullet',
        },
      ],
    },
  ];
  onScrollbarUpdate($event: any) {
    // if ($event.verticalUsed) {
    // console.log('verticalUsed', $event.verticalUsed);
    // }
  }
  ngOnInit() {
    // Get user role from AuthService
    this.userRole = localStorage.getItem('role');
  }
}
