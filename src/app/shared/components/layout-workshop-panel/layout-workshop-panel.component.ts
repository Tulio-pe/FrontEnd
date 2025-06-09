import {Component, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MatListItem, MatListItemIcon, MatListItemTitle, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {AppRoutes} from "../../../public/services/routes"
import {NgForOf, NgIf} from '@angular/common';
import {MatIconButton} from '@angular/material/button';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-layout-workshop-panel',
  imports: [
    RouterOutlet,
    MatSidenav,
    MatSidenavContainer,
    MatNavList,
    MatIcon,
    MatListItemIcon,
    MatListItemTitle,
    MatListItem,
    RouterLink,
    NgForOf,
    MatIconButton,
    NgIf,
    MatSidenavModule,
  ],
  templateUrl: './layout-workshop-panel.component.html',
  styleUrl: './layout-workshop-panel.component.css'
})
export class LayoutWorkshopPanelComponent {
  menuItems = signal<MenuItem[]>([
    {icon: "dashboard", label: "Dashboard", route: AppRoutes.WORKSHOP.DASHBOARD},
    {icon: "directions_car", label: "Autos", route: AppRoutes.WORKSHOP.CARS},
    {icon: "settings", label: "Configuración", route: AppRoutes.WORKSHOP.CONFIG},
  ])
  protected readonly AppRoutes = AppRoutes;
}
