import { Ng2CaloriePage } from './app.po';

describe('ng2-calorie App', function() {
  let page: Ng2CaloriePage;

  beforeEach(() => {
    page = new Ng2CaloriePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
