import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {NgOptimizedImage} from "@angular/common";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule,
        FormsModule,
        NgOptimizedImage,
        HttpClientModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
