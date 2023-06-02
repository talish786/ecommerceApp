import bcrypt from "bcrypt";
import mongoose from "mongoose";

const users = [
  {
    name: "Admin User",
    email: "mail2talish@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "John Doe",
    email: "jone@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
