import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GRAPHQL_URL } from '../../../environments/environment';
import { AuthenticationService } from '@app/core';

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})
export class GraphqlModule {
  constructor(apollo: Apollo, httpLink: HttpLink, private authService: AuthenticationService) {
    // Replace this URL with your deployed endpoint of Hasura on Heroku.
    const uri = GRAPHQL_URL;

    /** Following values need to be added to the header before making any
     *  query.
     *  1. X-Hasura-Access-Key: This Access Key is what will let your app access your endpoint.
     *  2. Content-Type: To tell the type of content.
     *  3. Authorization: This is the token that tells that a user is logged in.
     *  4. X-Hasura-Role: This will be 'user' to let Hasura know that a user is accessing the endpoint.
     *  5. X-Hasura-User-Id: This the user id of the user.
     */
    let authHeader: any;

    if (this.authService.user_id) {
      authHeader = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.authService.idToken}`);
    } else {
      authHeader = new HttpHeaders().set('Content-Type', 'application/json');
    }

    // Create a HTTP Link with the URI and the header.
    const http = httpLink.create({ uri, headers: authHeader });

    // Create an Apollo client with HTTP Link and cache as InMemoryCache.
    apollo.create({
      link: http,
      cache: new InMemoryCache()
    });
  }
}
