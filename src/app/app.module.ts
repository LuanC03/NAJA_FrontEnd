import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemNewComponent } from './components/item-new/item-new.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/security/login/login.component';
import { routes } from './app.routes';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { UserService } from './services/user.service';
import { SharedService } from './services/shared.service';
import { AuthInterceptor } from './components/security/auth.interceptor';
import { AuthGuard } from './components/security/auth.guard';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { ItemService } from './services/item.service';
import { DialogService } from 'src/app/dialog.service';

@NgModule({
  declarations: [
    AppComponent,
    ItemNewComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ItemListComponent,
    ItemDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    routes
  ],
  providers: [
    UserService,  
    ItemService,
    SharedService, 
    AuthGuard,
    DialogService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true
   }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
