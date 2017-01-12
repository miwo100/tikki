import { TikkiExpressPage } from './app.po';

describe('tikki-express App', function() {
  let page: TikkiExpressPage;

  beforeEach(() => {
    page = new TikkiExpressPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
