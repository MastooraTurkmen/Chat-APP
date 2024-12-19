import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body
        console.log(req.body);

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password don't match" })
        }
        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({ error: "Username already exists" })
        }
        // hash password here
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // https://avatar.iran.liara.run
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName, username, password: hashedPassword, gender, profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            await newUser.save()
            await generateTokenAndSetCookie(newUser._id, res)
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({ error: "Invalid user data" })
        }

    } catch (error) {
        console.log("Error is signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid credentials" })
        }

        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("Error is signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.log("Error is signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}