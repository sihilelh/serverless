export const createStudentSchema = {
  type: 'object',
  properties: {
    barcodeId: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
    },
    fullName: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
    },
    nameWithInitials: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
    },
    gender: {
      type: 'string',
      enum: ['Male', 'Female'],
    },
    address: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
    },
    dateOfBirth: {
      type: 'string',
      format: 'date',
    },
    school: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
    },
    houseId: {
      type: 'number',
    },
    mobileNumber: {
      type: 'string',
      maxLength: 20,
    },
    homeNumber: {
      type: 'string',
      maxLength: 20,
    },
    joinedDate: {
      type: 'string',
      format: 'date',
    },
    joinedGrade: {
      type: 'string',
      maxLength: 20,
    },
    // StudentDetail fields
    fathersName: {
      type: 'string',
      maxLength: 100,
    },
    fathersDateOfBirth: {
      type: 'string',
      format: 'date',
    },
    fathersNIC: {
      type: 'string',
      maxLength: 20,
    },
    fathersOccupation: {
      type: 'string',
      maxLength: 100,
    },
    fathersMobileNumber: {
      type: 'string',
      maxLength: 20,
    },
    mothersName: {
      type: 'string',
      maxLength: 100,
    },
    mothersDateOfBirth: {
      type: 'string',
      format: 'date',
    },
    mothersNIC: {
      type: 'string',
      maxLength: 20,
    },
    mothersOccupation: {
      type: 'string',
      maxLength: 100,
    },
    mothersMobileNumber: {
      type: 'string',
      maxLength: 20,
    },
    gnDivision: {
      type: 'string',
      maxLength: 100,
    },
    notes: {
      type: 'string',
    },
  },
  required: ['barcodeId', 'fullName', 'nameWithInitials', 'gender', 'address', 'dateOfBirth', 'school'],
  additionalProperties: false,
};

export interface CreateStudentDto {
  barcodeId: string;
  fullName: string;
  nameWithInitials: string;
  gender: 'Male' | 'Female';
  address: string;
  dateOfBirth: string;
  school: string;
  houseId?: number;
  mobileNumber?: string;
  homeNumber?: string;
  joinedDate?: string;
  joinedGrade?: string;
  // StudentDetail fields (all optional)
  fathersName?: string;
  fathersDateOfBirth?: string;
  fathersNIC?: string;
  fathersOccupation?: string;
  fathersMobileNumber?: string;
  mothersName?: string;
  mothersDateOfBirth?: string;
  mothersNIC?: string;
  mothersOccupation?: string;
  mothersMobileNumber?: string;
  gnDivision?: string;
  notes?: string;
}
