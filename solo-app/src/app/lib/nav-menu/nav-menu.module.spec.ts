import { NavMenuModule } from './nav-menu.module';

describe('NavMenuModule', () => {
  let navMenuModule: NavMenuModule;

  beforeEach(() => {
    navMenuModule = new NavMenuModule();
  });

  it('should create an instance', () => {
    expect(navMenuModule).toBeTruthy();
  });
});
