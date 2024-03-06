export class RouteConstant {
  public static readonly AUTH = 'auth';
  public static LOGIN = `${RouteConstant.AUTH}/login`;

  public static readonly UPLOAD_PLAYER_CONTAINER = 'build-round';
  public static readonly LEAGUE_CONTAINER = 'fixtures';
  public static readonly PRINT_CONTAINER = 'print';
  public static readonly GENERATE_LEAGUE = 'manage-leagues';
  public static readonly HOME_PAGE = '';
  
  public static readonly ABOUT_US_PAGE = 'about-us';
  public static readonly CONTACT_US_PAGE = 'contact-us';

  public static readonly COMPLETED_LEAGUES = 'manage-rounds';

  public static VIEW_SCORES = 'scoreboard';
  public static VIEW_SCORES_ROUTE = `${RouteConstant.COMPLETED_LEAGUES}/${RouteConstant.VIEW_SCORES}`;
}
