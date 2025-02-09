import { request, response } from 'express';
import UserService from '../services/user.services.js';
import { forgotPassword } from '../services/smtp.services.js';
import { getOtp, deleteOtp } from '../services/otp.service.js';

export const signInUser = async (request, response, next) => {
  try {
    const result = await UserService.signIn(request.body);

    if (result.success) {
      response.status(200).json({
        message: 'User logged-in successfully.',
        token: result.token,
        user: result.user,
        success: result.success
      });
    } else {
      response.status(401).json(result);
    }
  } catch (err) {
    console.log(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

export const signUpUser = async (request, response, next) => {
  try {
    const result = await UserService.signUp(request.body);
    if (result.success) {
      response.status(200).json({
        message: 'User registered successfully.',
        token: result.token,
        success: result.success,
        user: result.user
      });
    } else {
      response.status(400).json({ error: result.message });
    }
  } catch (err) {
    console.log(err);
    response.status(500).json({ error: 'Controller Internal Server Error' });
  }
};

export const requestPasswordReset = async (request, response) => {
  try {
    const { email } = request.body;

    if (!email) {
      return response.status(400).json({ message: 'Email is required' });
    }

    const userExist = await UserService.findByEmail(email);
    if (!userExist) {
      return response.status(404).json({ message: 'Email does not exist' });
    }

    const otp = await forgotPassword(email);
    
    if (!otp) {
      return response.status(500).json({ message: 'Failed to send OTP email' });
    }

    return response
      .status(200)
      .json({ message: 'OTP sent successfully to email' });
  } catch (err) {
    console.error(err);
    return response
      .status(500)
      .json({ message: 'An unexpected error occurred' });
  }
};

export const resetPasswordWithOtp = async (request, response) => {
  try {
    const { email, password, otp } = request.body;

    if (!email || !password || !otp) {
      return response
        .status(400)
        .json({ message: 'Email, password, and OTP are required' });
    }

    const storedOtp = await getOtp(email);
    if (!storedOtp) {
      return response.status(400).json({ message: 'OTP expired or not found' });
    }

    if (otp !== storedOtp) {
      return response.status(400).json({ message: 'Incorrect OTP' });
    }

    const isUpdated = await UserService.updatePassword(email, password);

    await deleteOtp(email);

    if (isUpdated) {
      return response
        .status(200)
        .json({ message: 'Password updated successfully' });
    } else {
      return response.status(500).json({ message: 'Error updating password' });
    }
  } catch (err) {
    console.error(err);
    return response
      .status(500)
      .json({ message: 'An unexpected error occurred' });
  }
};

export const showUsers = async(req,res) => {
  let result = await UserService.showUsers();
  if(result) res.send(result);
  else res.send(false);
}