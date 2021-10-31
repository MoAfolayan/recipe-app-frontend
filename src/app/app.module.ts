import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { RecipesComponent } from './recipe/components/recipes/recipes.component';
import { RecipeDetailsComponent } from './recipe/components/recipe-details/recipe-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RecipesComponent,
    RecipeDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    AuthModule.forRoot({
      domain: 'mo-recipe-app.us.auth0.com',
      clientId: '4IMunc5Fs8WeWEPybR9wBEJZJYYEAO2j',
      redirectUri: window.location.origin,

      // The AuthHttpInterceptor configuration
      httpInterceptor: {
        allowedList: [

          {
            uri: 'http://localhost:5000/api/*',
            tokenOptions: {
              audience: 'https://localhost:5001/api/',
            }
          },

          // Match anything starting with /api/accounts, but also specify the audience and scope the attached
          // access token must have
          {
            uri: '/api/accounts/*',
            tokenOptions: {
              audience: 'http://my-api/',
              scope: 'read:accounts',
            },
          },

          // Matching on HTTP method
          {
            uri: '/api/orders',
            httpMethod: 'post',
            tokenOptions: {
              audience: 'http://my-api/',
              scope: 'write:orders',
            },
          },

          // Using an absolute URI
          {
            uri: 'https://your-domain.auth0.com/api/v2/users',
            tokenOptions: {
              audience: 'https://your-domain.com/api/v2/',
              scope: 'read:users',
            }
          }
        ]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
