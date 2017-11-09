export default class Client {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;

  constructor(client) {
    this.id = client.id;
    this.first_name = client.first_name;
    this.last_name = client.last_name;
    this.email = client.email;
    this.phone = client.phone;
  }

  toJson(): Object {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone
    };
  }
}
