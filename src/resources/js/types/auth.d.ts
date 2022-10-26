type LoginData = {
    email: string,
    password: string
}

type RegisterData = {
    name: string,
    email: string,
    password: string

}

type RegisterInputData = {
    firstName: string,
    lastName: string, 
    mail: string
    password: string,
    passConf: string
} 

type User = {
    id: number,
    name: string,
    email: string,
    email_varified_at: string,
    created_at: string,
    updated_at: string
}

type RegisterErrMsg = {
    firstNameErr: string,
    lastNameErr: string,
    mailErr: string,
    passwordErr:string,
    passConfErr:string
  } 

  type AuthProps = {
    user: User | null,
    login: (loginData: LoginData) => Promise<void>
    register: (registerData: RegisterData) => Promise<void>
    logout: () => Promise<void>
    withdrawal: (user: User | undefined | null) => Promise<void>
}