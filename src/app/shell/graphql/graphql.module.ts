import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GRAPHQL_URL, HASURA_ACCESS_KEY } from '../../../environments/environment';
import { AuthenticationService } from '@app/core';

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})
export class GraphqlModule {
  constructor(apollo: Apollo, httpLink: HttpLink, authenticationService: AuthenticationService) {
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

    authHeader = new HttpHeaders()
      .set('X-Hasura-Access-Key', HASURA_ACCESS_KEY)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)
      .set('X-Hasura-Role', 'admin');

    // Create a HTTP Link with the URI and the header.
    const http = httpLink.create({ uri, headers: authHeader });

    // Create an Apollo client with HTTP Link and cache as InMemoryCache.
    apollo.create({
      link: http,
      cache: new InMemoryCache()
    });
  }
}
