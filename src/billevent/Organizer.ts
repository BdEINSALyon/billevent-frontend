export default class Organizer {

    name: string;
    phone: string;
    address: string;
    email: string;

    constructor(organizer) {
        this.name = organizer.name;
        this.phone = organizer.phone;
        this.address = organizer.address;
        this.email = organizer.email;
    }

}