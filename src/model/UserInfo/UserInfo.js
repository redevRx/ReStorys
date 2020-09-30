class UserMode {
    email = ""
    userName = ""
    nickName = ""
    address = ""
    city = ""
    state = ""
    zipCode = ""
    description = ""
    uid = ""
    image = ""

    constructor(
        email ,
        userName ,
        nickName ,
        address ,
        city ,
        state ,
        zipCode ,
        description ,
        uid ,
        image )
        {
            this.email = email
            this.userName = userName
            this.nickName = nickName
            this.address = address
            this.city = city
            this.state = state
            this.zipCode = zipCode
            this.description = description
            this.uid = uid
            this.image = image
        }

 
       
    get email() {
        return this.email
    }
    get userName() {
        return this.userName
    }
    get nickName() {
        return this.nickName
    }
    get address() {
        return this.address
    }
    get city() {
        return this.city
    }
    get state() {
        return this.state
    }
    get zipCode() {
        return this.zipCode
    }
    get description() {
        return this.description
    }
    get uid() {
        return this.uid
    }
    get image() {
        return this.image
    }


    //make setters
    set email(value) {
        this.email = value
    }
    set userName(value) {
        this.userName = value
    }
    set nickName(value) {
        this.nickName = value
    }
    set address(value) {
        this.address = value
    }
    set city(value) {
        return this.city = value
    }
    set state(value) {
        this.state = value
    }
    set zipCode(value) {
        this.zipCode = value
    }
    set description(value) {
        this.description = value
    }
    set uid(value) {
        this.uid = value
    }
    set image(value) {
        this.image = value
    }
}

export default UserMode