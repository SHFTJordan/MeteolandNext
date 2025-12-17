declare module "iron-session" {
  interface IronSessionData {
    iduser?: string;
    email?: string;
    username?:string;
    accessToken?:string;
    isLoggedIn?:boolean;


  }
}
export {}