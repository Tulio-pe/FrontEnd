import { Component } from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon';
import {NgClass} from '@angular/common';
@Component({
  selector: 'app-side-navegation-bar',
  imports: [
    MatSidenavContent,

    MatSidenav,
    MatSidenavContainer,
    MatIcon,
    NgClass,

  ],
  templateUrl: './side-navegation-bar.component.html',
  styleUrl: './side-navegation-bar.component.css'
})
export class SideNavegationBarComponent {

  activeButton:string=''  ;
  /**
   * Sets the active button
   * @param buttonName - name of the button to set as active
   */
  setActive(buttonName: string) {
    this.activeButton = buttonName;
  }
  /**
   * Handler for clicking the Dashboard button
   */
  onDashboardClick() {

  }
  /**
   * Handler for clicking the Autos button
   */
  onAutoClick() {

  }
  /**
   * Handler for clicking the Configuration button
   */
  onConfiguracionClick() {

  }
}
