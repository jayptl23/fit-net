export const formatPhoneNumber = (phoneNumber: string): string => {
  // Check if the input is a valid 10-digit number
  if (!/^\d{10}$/.test(phoneNumber)) {
    throw new Error(
      "Invalid phone number format. It should be a 10-digit number."
    );
  }

  // Format the phone number
  const areaCode = phoneNumber.slice(0, 3);
  const centralOfficeCode = phoneNumber.slice(3, 6);
  const lineNumber = phoneNumber.slice(6);

  return `(${areaCode}) ${centralOfficeCode}-${lineNumber}`;
};
