import { environment } from "../../../environments/environment";

const AUTH_BASE_URL = `${environment.apiUrl}/auth`;
const COMMON_URL = `${environment.apiUrl}`;
const COMPANY_URL = `${environment.companyUrl}`

export class API_ENDPOINTS{
    public static LOGIN = `${COMPANY_URL}/login`
    //upload player's data 

    public static UPLOAD_DATA = `${COMMON_URL}/upload-by-data`;
    public static UPLOAD_DATA_Round2 = `${COMMON_URL}/upload-by-data-round2`;
    public static UPLOAD_FILE = `${COMMON_URL}/upload-by-file`;
    public static UPLOAD_CSV = `${COMMON_URL}/csv`;

    //Companies
    public static GET_ALL_COMPANIES = `${COMPANY_URL}/get-companies/all`;
    public static GET_FIRST_COMPANY = `${COMPANY_URL}/get-companies/first`;
    public static GET_LAST_COMPANY = `${COMPANY_URL}/get-companies/last`;
    public static GET_COMPANY_BY_ID = `${COMPANY_URL}/get-company-by-id`;

    //Clubs
    public static GET_CLUBS = `${COMPANY_URL}/get-clubs/all`;
    public static GET_CLUB_BY_ID = `${COMPANY_URL}/get-club-by-id`;

    //Leagues
    public static GET_LEAGUES = `${COMPANY_URL}/get-leagues`;
    public static GET_LEAGUE_BY_ID = `${COMPANY_URL}/get-league-by-id`;
    public static CREATE_LEAGUE = `${COMPANY_URL}/create-league`;
    public static UPDATE_LEAGUE = `${COMPANY_URL}/update-league-by-id`;
    public static GET_LEAGUES_SUMMARY = `${COMPANY_URL}/get-league-summary`;


    //Rounds
    public static GET_ROUND_BY_ID = `${COMPANY_URL}/get-round-by-id`;
    public static GET_ROUND = `${COMPANY_URL}/get-rounds`;
    public static CREAT_ROUND = `${COMPANY_URL}/create-round`;
    public static UPDATE_ROUND_BY_ID = `${COMPANY_URL}/update-round-by-id`;



    //Scores
    public static GET_SCORE = `${COMPANY_URL}/get-league-scores`;
    public static LOCK_SCORE = `${COMPANY_URL}/lock-score`;
}