import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule 
    ],
    exports: [
        ReactiveFormsModule, 
        FormsModule, 
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }