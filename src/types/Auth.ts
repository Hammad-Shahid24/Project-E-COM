export interface User {
  email: string | null;

  password: string;
}

export interface AuthFormProps {
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
}
