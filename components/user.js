import { ref as firebaseRef, set, push, getDatabase, update } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import stockProfile from "../public/AnonUser.png";
import stockTrip from "../public/trip-stock-photo.jpg";

export const createUserProfile = (userId, profileDetails) => {
  const database = getDatabase();
  const userProfileDatabaseRef = firebaseRef(database, `users/${userId}`);

  const userProfileData = {
    userId,
    name: profileDetails.name || "New User",
    profilePicture: profileDetails.profilePicture || stockProfile,
    friendList: [],
    userTrips: [],
    userActivities: []
  };

  set(userProfileDatabaseRef, userProfileData);
};

export const updateUserProfileImage = async (userId, profileImageFile) => {
  const storage = getStorage();
  const profileImageRef = storageRef(storage, `profileImages/${userId}/${profileImageFile.name}`);

  try {
    const uploadTaskSnapshot = await uploadBytes(profileImageRef, profileImageFile);
    const profileImageUrl = await getDownloadURL(uploadTaskSnapshot.ref);
    const database = getDatabase();
    const userProfileDatabaseRef = firebaseRef(database, `users/${userId}`);
    update(userProfileDatabaseRef, { profilePicture: profileImageUrl });
  } catch (uploadError) {
    console.error("Failed to upload profile pic", uploadError);
  }
};

export const addUserTrip = (userId, tripDetails) => {
  const database = getDatabase();
  const userTripListRef = firebaseRef(database, `users/${userId}/userTrips`);
  const tripReference = push(userTripListRef);

  set(tripReference, {
    ...tripDetails,
    tripOwner: userId,
    participants: [{ id: userId, image: stockTrip }]
  });
};

export const addUserFriend = (userId, newFriendId) => {
  const database = getDatabase();
  const userFriendListRef = firebaseRef(database, `users/${userId}/friendList`);

  push(userFriendListRef, newFriendId);
};

export const addUserTripActivity = (userId, tripId, activityDetails) => {
  const database = getDatabase();
  const tripActivityListRef = firebaseRef(database, `users/${userId}/userTrips/${tripId}/userActivities`);

  const activityReference = push(tripActivityListRef);
  set(activityReference, activityDetails);
};
