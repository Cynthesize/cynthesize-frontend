import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="not-found">
      <img src="../../../assets/unauthorised.svg" width="500px" />
      <p>
        Oops! You tried accessing something you shouldn't be. Try logging in or go back to exploring
        <a routerLink="['']">Cynthesize</a>
      </p>
    </div>
  `,
  styles: [
    `
      .not-found {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100%;
      }
      .not-found p {
        color: black;
        font-size: 1rem;
        text-align: center;
      }
      .not-found p a {
        color: black;
      }
      @media (max-width: 650px) {
        .not-found img {
          width: 100%;
        }
        .not-found {
          width: 90%;
          margin: 0 auto;
        }
      }
    `
  ]
})
export class UnauthorisedComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
