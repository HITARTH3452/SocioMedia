import express from 'express';
import { signIn } from '../controller/auth.js';

const router = express.Router();

router.post('/signin' , signIn);

export default router;

