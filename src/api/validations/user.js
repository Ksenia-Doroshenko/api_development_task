import * as yup from "yup";

export const updateSchema = yup.object().shape({
    name: yup.string().trim().required('Нельзя заменить на пустую строку')
});