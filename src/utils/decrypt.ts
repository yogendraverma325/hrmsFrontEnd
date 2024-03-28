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

  const encryptedLocalStorageData: string | null = localStorage.getItem('userData');

  if (encryptedLocalStorageData) {
    const decryptedUserData: Employee = JSON.parse(encryptedLocalStorageData);
    console.log('decryptedUserData', decryptedUserData);

    id = decryptedUserData.id || decryptedUserData?.id;
    name = decryptedUserData.name || decryptedUserData?.name;
    email = decryptedUserData.email || decryptedUserData?.email;
    firstName = decryptedUserData.firstName || decryptedUserData?.firstName;
    lastName = decryptedUserData.lastName || decryptedUserData?.lastName;
    role_id = decryptedUserData.role_id || decryptedUserData?.role_id;
    designation_id =
      decryptedUserData.designation_id || decryptedUserData?.designation_id;
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
  };
};
