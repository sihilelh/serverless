export interface Student {
    id: string;
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
    createdAt?: string;
    updatedAt?: string;
}