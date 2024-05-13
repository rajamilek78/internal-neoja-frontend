import { environment } from "@env/environment";

// const AUTH_BASE_URL = `${environment.eloBuildRoundURL}/auth`;
const COMPANY_URL = `${environment.apiUrl}`;

const API_URL = `${environment.apiUrl}`

export class API_ENDPOINTS{
    public static LOGIN = `${COMPANY_URL}/login`
    public static CONTACT_US = `${COMPANY_URL}/contactus`
    
    // Taam add 
    public static TEAM_ADD = `${API_URL}/team/add`;

    //Reset teams

    public static RESET_TEAMS = `${API_URL}/highscore/reset`

    // highscore 
    public static HIGHSCORE = `${API_URL}/highscore/top-10`;

    //All team
    public static ALLTEAMDATA = `${API_URL}/team/get-all-teams`;


    //Companies
    public static GET_ALL_COMPANIES = `${COMPANY_URL}/get-companies/all`;
    public static GET_FIRST_COMPANY = `${COMPANY_URL}/get-companies/first`;
    public static GET_LAST_COMPANY = `${COMPANY_URL}/get-companies/last`;
    public static GET_COMPANY_BY_ID = `${COMPANY_URL}/get-company-by-id`;

    //Clubs
    public static GET_CLUBS = `${COMPANY_URL}/get-clubs/all`;
    public static GET_CLUB_BY_ID = `${COMPANY_URL}/get-club-by-id`;

}