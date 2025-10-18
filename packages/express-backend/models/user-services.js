import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function getUsers(name, job) {
  try {
    if (name && job) {
      // Find users with both name AND job
      return await userModel.find({ name: name, job: job });
    } else if (name) {
      return await findUserByName(name);
    } else if (job) {
      return await findUserByJob(job);
    } else {
      // Return all users if no filters
      return await userModel.find();
    }
  } catch (error) {
    console.error('Error in getUsers:', error);
    throw error;
  }
}

async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.error('Error in findUserById:', error);
    throw error;
  }
}

async function addUser(user) {
  try {
    // Check if a user with the same name and job already exists
    const existingUser = await userModel.findOne({
      name: user.name,
      job: user.job
    });

    if (existingUser) {
      throw new Error('A user with this name and job already exists');
    }
    
    // Create and save the new user
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.error('Error in addUser:', error);
    throw error;
  }
}

async function findUserByName(name) {
  try {
    return await userModel.find({ name: name });
  } catch (error) {
    console.error('Error in findUserByName:', error);
    throw error;
  }
}

async function findUserByJob(job) {
  try {
    return await userModel.find({ job: job });
  } catch (error) {
    console.error('Error in findUserByJob:', error);
    throw error;
  }
}

async function deleteUserById(id) {
  try {
    const result = await userModel.findByIdAndDelete(id);
    return result !== null;
  } catch (error) {
    console.error('Error in deleteUserById:', error);
    throw error;
  }
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUserById
};