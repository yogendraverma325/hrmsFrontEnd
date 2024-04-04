import { Employee } from '@/models/feed';
import { useNavigate } from 'react-router-dom';

export const Decrypt = () => {
  let id;
  let name;
  let email;
  let firstName;
  let lastName;
  let role_id;
  let designation_id;
  let designation;
  let lastLogin;
  const encryptedLocalStorageData: string | null = localStorage.getItem('userData');

  if (encryptedLocalStorageData) {
    const decryptedUserData: Employee = JSON.parse(encryptedLocalStorageData);

    id = decryptedUserData.id || decryptedUserData?.id;
    name = decryptedUserData.name || decryptedUserData?.name;
    email = decryptedUserData.email || decryptedUserData?.email;
    firstName = decryptedUserData.firstName || decryptedUserData?.firstName;
    lastName = decryptedUserData.lastName || decryptedUserData?.lastName;
    role_id = decryptedUserData?.role?.role_id;
    designation_id = decryptedUserData?.designationmaster?.designationId;
    designation = decryptedUserData?.designationmaster?.name;
    lastLogin = decryptedUserData?.lastLogin;
    // Now decryptedUserData is typed as Employee
  }

  return {
    id,
    name,
    email,
    firstName,
    lastName,
    role_id,
    designation_id,
    designation,
    lastLogin,
  };
};
