export class FirebaseUserModel {
  image: string;
  name: string;
  provider: string;
  email: string;

  constructor(){
    this.image = "";
    this.name = "";
    this.provider = "";
    this.email = "";
  }
}

export class Users {
    FirstName: string;
    LastName: string;
    Address: string;
    email: string;
    password: string;
    Telephone: Number;
    UserType: string;
}

interface Showuser {
  usr: String;
}