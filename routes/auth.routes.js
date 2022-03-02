const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = Router();
const User = require('../models/User');


// [/api/auth]/register
router.post('/register', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6ть символов').isLength({min: 6}),
], async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Не корректные данные при регистрации.'
            });
        }

        const {email, password} = req.body;
        // const existsUser = await User.findOne({email: email});
        const existsUser = await User.findOne({email});

        if (existsUser) { // validate
            return res.status(400).json({
                message: 'Такой пользователь уже существует.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({email, password: hashedPassword});

        await newUser.save();

        res.status(201).json({
            message: 'Пользователь создан.'
        })

    } catch (e) {
        res.status(500).json({
            message: 'Что-то пошло не так!'
        });
    }
});

// [/api/auth]/login
router.post('/login', [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
], async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Не корректные данные при входе в систему.'
            });
        }

        const {email, password} = req.body;

        const user = User.findOne({email});
        if (!user) { // validate
            return res.status(400).json({
                message: 'Пользователь не найден.'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { // validate
            return res.status(400).json({
                message: 'Неверный пароль, попробуйте снова.'
            });
        }

        const userId = user.id;
        const token = jwt.sign(
            //{userId: user.id},
            {userId},
            config.get('appSecret'),
            {expiresIn: '1h'}
        );

        //res.json({token, userId: user.id});
        res.json({token, userId});

    } catch (e) {
        res.status(500).json({
            message: 'Что-то пошло не так!'
        });
    }
});

module.exports = router;