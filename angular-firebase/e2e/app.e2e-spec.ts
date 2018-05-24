import { Angular2AuthenticationFirebasePage } from './app.po';

describe('angular2-authentication-firebase App', () => {
  let page: Angular2AuthenticationFirebasePage;

  beforeEach(() => {
    page = new Angular2AuthenticationFirebasePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
