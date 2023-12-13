import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Минимальная длина пароля - 5 символов').isLength({ min: 5}),
    body('fullName', 'Укажите имя').isLength({ min: 3}),
    body('avatarUrl', 'Некорректный формат ссылки').optional().isURL(),
]

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Минимальная длина пароля - 5 символов').isLength({ min: 5}),
]