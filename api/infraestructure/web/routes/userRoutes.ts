import express from "express";
import rateLimit from "express-rate-limit";


const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attemps from this ip, please try again later.",
  standarHeaders: true,
  legacyHeaders: false,
});

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too may registration attemps from this ip, please try again later.",
  standarHeaders: true,
  legacyHeaders: false,

});
