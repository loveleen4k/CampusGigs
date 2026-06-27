export const USER_ROLES = ['student/employee', 'employer'];

export const STUDENT_EMPLOYEE = 'student/employee';
export const EMPLOYER = 'employer';

export const ROLE_LABELS = {
    [STUDENT_EMPLOYEE]: 'Student / Employee',
    [EMPLOYER]: 'Employer',
};

export const getEffectiveRole = (role) => role || STUDENT_EMPLOYEE;
