import { body } from 'express-validator';

export const registerValidation = [
    body('fullName', 'Укажите имя').isLength({ min: 3}),
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Минимальная длина пароля - 5 символов').isLength({ min: 5}),
    body('birthDate', 'Укажите дату рождения').isDate(),
    body('gender', 'Уакажите пол').isString(),
    body('avatarUrl', 'Некорректный формат ссылки').optional().isString(),
]

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Минимальная длина пароля - 5 символов').isLength({ min: 5}),
]