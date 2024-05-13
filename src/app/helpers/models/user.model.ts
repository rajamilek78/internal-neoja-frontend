import { AddressModel } from "./address.model";
export interface UserModel {
    address: AddressModel;
    phone: string;
    club_id : string;
    league_coordinator_in_clubs: string[];
    dob: string;
    last_name: string;
    middle_name: string;
    first_name: string;
    owned_companies: string[];
    owned_clubs: string[];
    session_id: string;
}
