import express from 'express';
import { signInUser, signUpUser, requestPasswordReset, resetPasswordWithOtp, showUsers} from '../controller/user.controller.js';
import { check, validationResult } from 'express-validator';

const router = express.Router();

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/sign-in',
  [
    check('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
    check('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  handleValidationErrors,
  signInUser
);

router.post('/sign-up',
  [
    check('name').notEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Name should be at least 2 characters long'),
    check('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
    check('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  handleValidationErrors,
  signUpUser
);

// router.put('/:id',
//   [
//     check('name').isLength({ min: 2 }).withMessage('Name should be at least 2 characters long'),
//     check('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
//     check('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
//   ],
//   handleValidationErrors,
//   updateUser
// );
// router.get('/user-view', showUsers);
// router.get('/:userId', getUserById);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPasswordWithOtp);
router.get('/get-all-users', showUsers)



export default router;
