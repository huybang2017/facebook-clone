import { ArrayItem, useChatStore } from "../../store/chat-store";

const useHandleAddToChatArray = () => {
  const { chatArray, setChatArray } = useChatStore();

  const handleAddToChatArray = (chatId: number) => {
    if (chatArray.some((arr) => arr.chatId === chatId)) {
      return;
    }

    const newArrayItem: ArrayItem = {
      chatId,
      index: chatArray.length,
      isMaximized: true,
    };

    let newArray = [...chatArray, newArrayItem];

    if (newArray.length > 3) {
      newArray.shift();
    }

    newArray = newArray.map((item, index) => ({
      ...item,
      index,
    }));

    setChatArray(newArray);
  };

  return { handleAddToChatArray };
};
export default useHandleAddToChatArray;
