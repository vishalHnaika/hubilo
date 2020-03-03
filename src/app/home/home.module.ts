import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CanvasWhiteboardModule
  ]
})
export class HomeModule { }
