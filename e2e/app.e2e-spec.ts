import { AxxezoFrontendPage } from './app.po';

describe('axxezo-frontend App', function() {
  let page: AxxezoFrontendPage;

  beforeEach(() => {
    page = new AxxezoFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
