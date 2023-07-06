import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

type JwtPayload = {
    id: number;
}

const { User } = require('../database/models');

export const createUser: any = async (req: Request, res: Response) => {
    const user: any = await User.findOne({ where: { email: req.body.email } });

    if (user) {
        return res.status(400).json({ error: 'User already exists!' });
    }
    
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
    });

    const { password, ...newUserWithoutPassword } = newUser;

    return res.status(201).json({ success: 'User created successfully!', message: newUserWithoutPassword});
}

export const updateUser: any = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Unauthorized user!' });
    }

    const token = authorization.split(' ')[1];

    const { id } = jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload;

    const user: any = await User.findByPk(id);

    if (!user) {
        return res.status(401).json({ error: 'Unauthorized user!' });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    user.name = req.body.name;
    user.email = req.body.email;
    user.password = passwordHash;

    await user.save();

    const { password, ...userWithoutPassword } = user;

    return res.status(200).json({ success: 'User updated successfully!', UpdatedData: userWithoutPassword });
}

export const deleteUser: any = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Unauthorized user!' });
    }

    const token = authorization.split(' ')[1];

    const { id } = jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload;

    const user: any = await User.findByPk(id);

    if (!user) {
        return res.status(401).json({ error: 'Unauthorized user!' });
    }

    await user.destroy();

    return res.status(200).json({ success: 'User deleted successfully!', deletedData: user });
}

export const login: any = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    const user: any = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password!' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(400).json({ error: 'Invalid email or password!' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? '', { expiresIn: '12h' });

    const { password: userPassword, ...userWithoutPassword } = user;

    const data: any = {
        user: userWithoutPassword,
        token,
    }

    return res.status(200).json({ success: 'User logged in successfully!', data });
}

export const profile: any = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Unauthorized user!' });
    }

    const token = authorization.split(' ')[1];

    const { id } = jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload;

    const user: any = await User.findByPk(id);

    if (!user) {
        return res.status(401).json({ error: 'Unauthorized user!' });
    }

    const { password: userPassword, ...userLogged } = user.dataValues;

    return res.status(200).json({ success: 'User authenticated successfully!', user: userLogged });
}
