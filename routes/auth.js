const router = require("express").Router();
const User = require("../models/User");
const {
    registerValidation,
    loginValidation,
    extendSessionValidation
} = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken");
const ObjectId = require("mongoose").Types.ObjectId;


router.get("/me",verifyToken , async (req, res) => {
    return res.send(await User.findById(req.user._id));
})

router.get("/",verifyToken , async (req, res) => {
    return res.send(await User.find().populate("answers").populate("questions"));
})

router.get("/:userId",verifyToken, async (req, res) => {
    if (!ObjectId.isValid(req.params.userId))
      return res.status(400).send({ message: "Invalid Id" });
  
    const user = await User.findById(req.params.userId)
      .populate("questions")
      .populate("answers");
    if (!user) return res.status(404).send({ message: "User Not Found" });
    return res.send(user);
  });


router.post("/extend-session", async (req, res) => {
    const {
        error,
        value
    } = extendSessionValidation(req.body);
    if (error) return res.status(400).send(error);

    let validRefreshToken;
    try{
        validRefreshToken = jwt.verify(req.body.refreshToken ,process.env.REFRESH_TOKEN_SECRET);
    } catch(err) {
        return res.status(400).send(err);
    }

    const {accessToken, refreshToken} = generateAccessAndRefreshToken(validRefreshToken.user);

    return res.send({
        user: {
            ...validRefreshToken.user,
            password: null
        },
        accessToken,
        refreshToken
    });
    
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
        const {accessToken, refreshToken} = generateAccessAndRefreshToken(savedUser._doc);

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

    const {accessToken, refreshToken} = generateAccessAndRefreshToken(userExists._doc);

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
                ...user,
                password: null
            }
        },
        process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15m"
        }
    );
    const refreshToken = jwt.sign({
            user: {
                ...user,
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