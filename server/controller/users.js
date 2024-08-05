import mongoose from "mongoose";
import User from "../models/User.js";

//Read

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the id parameter
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({message : "Invalid user ID format"});
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const friends = await Promise.all(
       user.friends.map((friendId) => {
        // Validate each friend's id
        if (mongoose.Types.ObjectId.isValid(friendId)) {
          return User.findById(friendId);
        }
        return null;
      })
    );

     // Filter out any null values resulting from invalid friend IDs
    const validFriends = friends.filter((friend) => friend !== null);

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Update

export const addRemoveFriends = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await user.findById(friendId);

    if (user.friends.include(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupaton, location, picturePath }) => {
        return { _id, firstName, lastName, occupaton, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
