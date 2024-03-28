interface User {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface Employee {
  id: number;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  manager: number;
  role_id: number;
  designation_id: number;
}

export interface EmpListResponse {
  statusCode: string;
  message: string;
  data: User[];
}

export interface ReportiesListResponse {
  statusCode: string;
  status: boolean;
  data: {
    id: number;
    name: string;
    email: string;
    firstName: string;
    lastName: string;
    manager: number;
    managerData: {
      name: string;
      role: {
        role_id: number;
        name: string;
      };
      designationmaster: {
        designationId: number;
        name: string;
      };
    };
    role: {
      name: string;
    };
    designationmaster: {
      designationId: number;
      name: string;
    };
    reportie: Reportie[];
  };
}

export interface Reportie {
  id: number;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  manager: number;
  role: {
    role_id: number;
    name: string;
  };
  designationmaster: {
    designationId: number;
    name: string;
  };
  reportings: boolean;
}
