export const USER_ROLES = ['student/employee', 'employer'];

export const STUDENT_EMPLOYEE = 'student/employee';
export const EMPLOYER = 'employer';

export const ROLE_LABELS = {
    [STUDENT_EMPLOYEE]: 'Student / Employee',
    [EMPLOYER]: 'Employer',
};

export const getEffectiveRole = (role) => role || STUDENT_EMPLOYEE;

export const getOtherRole = (role) =>
    getEffectiveRole(role) === EMPLOYER ? STUDENT_EMPLOYEE : EMPLOYER;

export const ROLE_ACCESS_MESSAGES = {
    hire: {
        title: 'Employer account required',
        body: 'You need an Employer account to post job listings. Switch your role in Profile to start hiring.',
        suggestedRole: EMPLOYER,
    },
    apply: {
        title: 'Student / Employee account required',
        body: 'You need a Student / Employee account to apply for jobs. Switch your role in Profile to start applying.',
        suggestedRole: STUDENT_EMPLOYEE,
    },
};
