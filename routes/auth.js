const router = require("express").Router();
const User = require("../models/User");
const {
    registerValidation,
    loginValidation
} = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken");


router.get("/me",verifyToken , async (req, res) => {
    return res.send(await User.findById(req.user._id));
})

router.post("/register", async (req, res) => {
    const {
        error,
        value
    } = registerValidation(req.body);
    if (error) return res.status(400).send(error);

    const userExists = await User.findOne({
        email: req.body.email
    });
    if (userExists) return res.status(409).send({
        message: "A user with this email address already exists"
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        country: req.body.country,
        school: req.body.school,
        field: req.body.field,
        password: hashPassword
    })

    try {
        const savedUser = await user.save();
        const {accessToken, refreshToken} = generateAccessAndRefreshToken(savedUser);

        return res.send({
            user: {
                ...savedUser._doc,
                password: null
            },
            accessToken,
            refreshToken
        });
    


    } catch (err) {
        res.status(400).send(err);
    }
})


router.post("/login", async (req, res) => {
    const {
        error,
        value
    } = loginValidation(req.body);
    if (error) return res.status(400).send(error);

    const userExists = await User.findOne({
        email: req.body.email
    });
    if (!userExists) return res.status(400).send({
        message: "Email or password is invalid."
    });

    const validPassword = await bcrypt.compare(req.body.password, userExists.password);
    if (!validPassword) return res.status(400).send({
        message: "Email or password is invalid."
    });

    const {accessToken, refreshToken} = generateAccessAndRefreshToken(userExists);

    return res.send({
        user: {
            ...userExists._doc,
            password: null
        },
        accessToken,
        refreshToken
    });

})

const generateAccessAndRefreshToken = (user) => {
    // Create and assign tokens
    const accessToken = jwt.sign({
            user: {
                ...user._doc,
                password: null
            }
        },
        process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15m"
        }
    );
    const refreshToken = jwt.sign({
            user: {
                ...user._doc,
                password: null
            }
        },
        process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "14d"
        }
    );
    return {
        accessToken,
        refreshToken
    }
}

module.exports = router;