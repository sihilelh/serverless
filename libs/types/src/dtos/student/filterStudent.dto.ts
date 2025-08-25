export const filterStudentDtoSchema = {
  type: 'object',
  properties: {
    fullName: { type: 'string' },
    nameWithInitials: { type: 'string' },
    barcodeId: { type: 'string' },
    gender: {
      type: 'string',
      enum: ['Male', 'Female'],
    },
    school: { type: 'string' },
    address: { type: 'string' },
    mobileNumber: { type: 'string' },
    homeNumber: { type: 'string' },
    joinedGrade: { type: 'string' },
    houseId: { type: 'number' },
    start: { type: 'number' },
    limit: { type: 'number' },
    sortBy: { type: 'string' },
    order: { type: 'number', enum: [1, -1] },
    includeStudentDetails: { type: 'boolean' },
  },
  additionalProperties: false,
};

export interface FilterStudentDto {
  fullName?: string;
  nameWithInitials?: string;
  barcodeId?: string;
  gender?: 'Male' | 'Female';
  school?: string;
  address?: string;
  mobileNumber?: string;
  homeNumber?: string;
  joinedGrade?: string;
  houseId?: number;
  start?: number;
  limit?: number;
  sortBy?: string;
  order?: 1 | -1;
  includeStudentDetails?: boolean;
}
