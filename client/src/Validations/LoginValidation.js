import * as yup from 'yup';
export const LoginValidation = yup.object().shape({
    email: yup.string()
    .required('Email should not be empty')
    .email('Email should be well formated'),

    password: yup.string()
    .required('Password Can not Be Empty')
    .min(6),
    
});
