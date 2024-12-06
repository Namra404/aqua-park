module auth {

  type LoginParams = {
    email: string;
    password: string;
  }

  type RegisterParams = {
    email: string;
    password: string;
    name: string;
  }

  type Role = 'admin' | 'user'

  type User = {}

}
