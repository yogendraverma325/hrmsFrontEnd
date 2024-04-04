interface User {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface Employee {
  id: number;
  empCode: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  password: string;
  officeMobileNumber: string;
  personalMobileNumber: string;
  manager: number;
  role_id: number;
  designation_id: number;
  functionalAreaId: number;
  buId: number;
  departmentId: number;
  companyId: number;
  lastLogin: string;
  role: {
    role_id: number;
    name: string;
  };
  designationmaster: {
    designationId: number;
    name: string;
    createdAt: string;
    createdBy: string | null;
    updatedBy: string | null;
    updatedAt: string | null;
    isActive: boolean;
  };
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

export interface Profile {
  id: number;
  empCode: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  officeMobileNumber: string;
  personalMobileNumber: string;
  dateOfJoining: string;
  manager: number;
  functionalAreaId: number;
  buId: number;
  departmentId: number;
  companyId: number;
  employeebiographicaldetail: {
    biographicalId: number;
    userId: number;
    nationality: string;
    maritalStatus: boolean;
    mobileAccess: boolean;
    laptopSystem: string;
    backgroundVerification: boolean;
    gender: string;
    dateOfBirth: string;
  };
  employeejobdetail: {
    jobId: number;
    userId: number;
    dateOfJoining: string;
    probationPeriod: string;
    languagesSpoken: string;
  };
  employeeemergencycontact: {
    emergencyContactId: number;
    userId: number;
    emergencyContactName: string;
    emergencyContactNumber: string;
    emergencyContactRelation: string;
  };
}
