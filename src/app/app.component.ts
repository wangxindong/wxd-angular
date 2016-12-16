import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { GlobalState } from './global.state';
import { ComponentsHelper } from 'ng2-bootstrap';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [require('normalize.css')],
  template: `
    <main [ngClass]="{'menu-collapsed': isMenuCollapsed}" baThemeRun>
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {

  isMenuCollapsed: boolean = false;

  constructor(private _state: GlobalState,
    
    private viewContainerRef: ViewContainerRef) {

    this._fixModals();

    this._loadImages();

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    
  }

  private _loadImages(): void {
    // register some loaders
  }

  private _fixModals(): void {
    ComponentsHelper.prototype.getRootViewContainerRef = function () {
      // https://github.com/angular/angular/issues/9293
      if (this.root) {
        return this.root;
      }
      var comps = this.applicationRef.components;
      if (!comps.length) {
        throw new Error("ApplicationRef instance not found");
      }
      try {
        /* one more ugly hack, read issue above for details */
        var rootComponent = this.applicationRef._rootComponents[0];
        this.root = rootComponent._component.viewContainerRef;
        return this.root;
      }
      catch (e) {
        throw new Error("ApplicationRef instance not found");
      }
    };
  }
}
