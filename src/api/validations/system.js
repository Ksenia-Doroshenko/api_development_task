import * as yup from 'yup';

const registerSchema = yup.object().shape({
    email: yup.string().trim().email('Некорректный адрес почты').required('Обязательное поле'),
    name: yup.string().trim().nullable(),
    password: yup.string().trim().required('Обязательное поле'),
    confirmPassword: yup
        .string()
        .trim()
        .oneOf([yup.ref('password')], 'Пароли не совпадают')
        .required('Обязательное поле'),
});

export default registerSchema;
