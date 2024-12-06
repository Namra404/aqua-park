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

  type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    update_at: string;
    create_at: string;
  }

  type AuthResponse = {
    user: User;
    token: string;
  }
}
