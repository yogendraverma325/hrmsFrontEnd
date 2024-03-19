interface User {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface EmpListResponse {
  statusCode: string;
  message: string;
  data: User[];
}
