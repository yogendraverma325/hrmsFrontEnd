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

export interface PersonalData {
  data: {
    empCode: string;
    employeebiographicaldetail: {
      nationality: string;
      maritalStatus: boolean;
      mobileAccess: boolean;
      laptopSystem: string;
      backgroundVerification: boolean;
      gender: string;
      dateOfBirth: string;
      // Add other properties as needed
    };
    employeejobdetail: {
      dateOfJoining: string;
      probationPeriod: string;
      languagesSpoken: string;
      // Add other properties as needed
    };
    employeepaymentdetail: {
      paymentAccountNumber: string;
      paymentHolderName: string;
      paymentBankName: string;
      paymentBankIfsc: string;
      // Add other properties as needed
    };
    employeeemergencycontact: {
      emergencyContactName: string;
      emergencyContactNumber: string;
      emergencyContactRelation: string;
      // Add other properties as needed
    };
    employeefamilydetails: {
      name: string;
      dob: string;
      mobileNo: string;
      relationWithEmp: string;
      gender: string;
      // Add other properties as needed
    }[];
    employeeeducationdetails: {
      degreemaster: {
        degreeName: string;
        // Add other properties as needed
      };
      educationInstitute: string;
      educationSpecialisation: string;
      educationStartDate: string;
      educationCompletionDate: string;
      // Add other properties as needed
    }[];
    // Add other properties as needed
  };
}

export interface ApiResponse {
  statusCode: number;
  status: boolean;
  data: UserData;
}

interface UserData {
  id: number;
  empCode: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  officeMobileNumber: string;
  personalMobileNumber: string;
  manager: number;
  functionalAreaId: number;
  buId: number;
  departmentId: number;
  companyId: number;
  lastLogin: string;
  functionalareamaster: {
    functionalAreaId: number;
    functionalAreaName: string;
    functionalAreaCode: string;
  };
  bumaster: {
    buId: number;
    buName: string;
    buCode: string;
  };
  departmentmaster: {
    departmentId: number;
    departmentCode: string;
    departmentName: string;
  };
  companymaster: {
    companyId: number;
    companyName: string;
    companyCode: string;
    groupcompanymaster: {
      groupId: number;
      groupCode: string;
      groupName: string;
      groupShortName: string;
    };
  };
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
  reportie: any[]; // You might want to create an interface for this array items
}
