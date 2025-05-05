import { useState } from "react";

export interface UserArray {
  userId: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
  index: number;
}

const useHandleSelectUserClick = () => {
  const [selectedUser, setSelectedUser] = useState<UserArray[]>([]);

  const handleSelectUserClick = (
    userId: number,
    firstName: string,
    lastName: string,
    profilePicture: string
  ) => {
    if (selectedUser.some((user) => user.userId === userId)) {
      return;
    }

    const newUser: UserArray = {
      userId,
      firstName,
      lastName,
      profilePicture,
      index: selectedUser.length,
    };

    let newUserArray = [...selectedUser, newUser];

    newUserArray = newUserArray.map((user, index) => ({
      ...user,
      index,
    }));

    setSelectedUser(newUserArray);
  };

  return { handleSelectUserClick, selectedUser, setSelectedUser };
};

export default useHandleSelectUserClick;
