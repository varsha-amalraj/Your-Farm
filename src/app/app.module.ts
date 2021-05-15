import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetailComponent } from './pages/components/user-detail/user-detail.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SendMessageComponent } from './pages/components/send-message/send-message.component';
import { StoreModule } from '@ngrx/store';
import * as store from './store/store';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDetailComponent,
    SendMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxDaterangepickerMd.forRoot(),
    StoreModule.forRoot(store.reducers, { metaReducers: store.metaReducers }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
