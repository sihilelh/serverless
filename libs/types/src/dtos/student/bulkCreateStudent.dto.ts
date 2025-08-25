export const csvStudentSchema = {
  type: 'object',
  properties: {
    'Full Name': { 
      type: 'string', 
      minLength: 1, 
      maxLength: 100 
    },
    'Name with Initials': { 
      type: 'string', 
      minLength: 1, 
      maxLength: 100 
    },
    'Gender': { 
      type: 'string', 
      enum: ['Male', 'Female'] 
    },
    'Address': { 
      type: 'string', 
      minLength: 1, 
      maxLength: 255 
    },
    'Date of birth': { 
      type: 'string', 
      format: 'date' 
    },
    'School': { 
      type: 'string', 
      minLength: 1, 
      maxLength: 100 
    },
    'House': { 
      type: 'string' 
    },
    'Mobile Number': { 
      type: 'string', 
      maxLength: 20 
    },
    'Landline Number': { 
      type: 'string', 
      maxLength: 20 
    },
    'Joined Date': { 
      type: 'string', 
      format: 'date' 
    },
    'Joined Grade': { 
      type: 'string', 
      maxLength: 20 
    },
    "Father's Name": { 
      type: 'string', 
      maxLength: 100 
    },
    "Father's Date of birth": { 
      type: 'string', 
      format: 'date' 
    },
    "Farther's NIC": { 
      type: 'string', 
      maxLength: 20 
    },
    "Farther's Occupation": { 
      type: 'string', 
      maxLength: 100 
    },
    "Farther's Mobile Number": { 
      type: 'string', 
      maxLength: 20 
    },
    "Mothers's Name": { 
      type: 'string', 
      maxLength: 100 
    },
    "Mothers's Date of birth": { 
      type: 'string', 
      format: 'date' 
    },
    "Mother's NIC": { 
      type: 'string', 
      maxLength: 20 
    },
    "Mother's Occupation": { 
      type: 'string', 
      maxLength: 100 
    },
    "Mother's Mobile Number": { 
      type: 'string', 
      maxLength: 20 
    },
    'Grama Niladari Division': { 
      type: 'string', 
      maxLength: 100 
    },
    'Notes': { 
      type: 'string' 
    }
  },
  required: ['Full Name', 'Name with Initials', 'Gender', 'Address', 'Date of birth', 'School'],
  additionalProperties: false,
};

// CSV Column → Database Field mapping
export const csvFieldMapping = {
  'Full Name': 'fullName',
  'Name with Initials': 'nameWithInitials',
  'Gender': 'gender',
  'Address': 'address',
  'Date of birth': 'dateOfBirth',
  'School': 'school',
  'House': 'houseName', // Will be resolved to houseId
  'Mobile Number': 'mobileNumber',
  'Landline Number': 'homeNumber',
  'Joined Date': 'joinedDate',
  'Joined Grade': 'joinedGrade',
  // StudentDetail fields
  "Father's Name": 'fathersName',
  "Father's Date of birth": 'fathersDateOfBirth',
  "Farther's NIC": 'fathersNIC',
  "Farther's Occupation": 'fathersOccupation',
  "Farther's Mobile Number": 'fathersMobileNumber',
  "Mothers's Name": 'mothersName',
  "Mothers's Date of birth": 'mothersDateOfBirth',
  "Mother's NIC": 'mothersNIC',
  "Mother's Occupation": 'mothersOccupation',
  "Mother's Mobile Number": 'mothersMobileNumber',
  'Grama Niladari Division': 'gnDivision',
  'Notes': 'notes'
} as const;

export interface BulkCreateStudentResult {
  success: boolean;
  totalRecords: number;
  createdRecords: number;
  failedRecords: number;
  errors: Array<{
    row: number;
    field: string;
    value: any;
    message: string;
  }>;
  batchId: string;
}

export interface BulkCreateStudentRequest {
  file: any; // Express.Multer.File type
} 