export interface Header {
    userInformation: UserInformation,
    companies: Company[]
}

export interface UserInformation {
    imageSource: string
}

export interface Company {
    name: string
}

export interface SideMenuItem {
    text: string
}

export interface Board {

}