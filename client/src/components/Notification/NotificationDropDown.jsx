import { Bell } from "lucide-react";
import DropdownModal from "../DropdownModal";
import useFetchNotifications from "@/hooks/useFetchNotifications";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/contexts/StoreProvider";
import { formatDistanceToNow } from "date-fns";
import { getProfileAnother } from "@/apis/authService";
import defaultAvatar from "@/assets/images/default_avatar.jpg";
import useMarkAsRead from "@/hooks/useMarkAsRead";
import useNotificationCount from "@/hooks/useNotificationCount";
import { useNotificationContext } from "@/contexts/NotificationProvider";

export default function NotificationDropdown() {
  const { userInfo } = useContext(StoreContext);
  const markAsReadMutation = useMarkAsRead();
  const { data: unreadCount } = useNotificationCount(userInfo?.data.userId);
  const { data, fetchNextPage, hasNextPage } = useFetchNotifications({
    userId: userInfo?.data.userId,
  });
  const [now, setNow] = useState(new Date());
  const { notifications: realTimeNotifications } = useNotificationContext();

  const fetchedNotifications =
    data?.pages?.flatMap((page) => page.notificationModels || []) || [];

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const allNotifications = [
    ...realTimeNotifications,
    ...fetchedNotifications.filter(
      (n) =>
        !realTimeNotifications.some(
          (r) => r.notificationId === n.notificationId
        )
    ),
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const [profileImages, setProfileImages] = useState({});

  useEffect(() => {
    const uniqueUserIds = [
      ...new Set(
        allNotifications.map((notification) => notification.sender?.userId)
      ),
    ];

    uniqueUserIds.forEach((userId) => {
      if (!profileImages[userId]) {
        getProfileAnother(userId).then((res) => {
          setProfileImages((prevImages) => ({
            ...prevImages,
            [userId]: res.data.profilePicture || defaultAvatar,
          }));
        });
      }
    });
  }, [allNotifications, profileImages]);

  return (
    <DropdownModal
      trigger={
        <div className="relative w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer">
          <Bell className="w-5 h-5 text-gray-700" />
          {unreadCount?.data?.count > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1.5 -translate-y-1/2 translate-x-1/2">
              {unreadCount.data.count > 9 ? "9+" : unreadCount.data.count}
            </span>
          )}
        </div>
      }
    >
      <div className="p-4 font-semibold text-lg border-b border-gray-300 bg-white shadow-md rounded-t-xl">
        Thông báo
      </div>
      <ul className="max-h-80 overflow-y-auto divide-y divide-gray-200 bg-white">
        {allNotifications.length > 0 ? (
          allNotifications.map((noti) => (
            <li
              key={noti.notificationId}
              className="p-3 hover:bg-gray-50 cursor-pointer flex items-start space-x-3"
              onClick={() => {
                if (!noti.read) {
                  markAsReadMutation.mutate(noti.notificationId);
                }
              }}
            >
              <img
                src={profileImages[noti.sender?.userId] || defaultAvatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    {noti.sender
                      ? `${noti.sender.firstName} ${noti.sender.lastName}`
                      : "Hệ thống"}
                  </div>
                  {!noti.read && (
                    <span className="w-2 h-2 rounded-full bg-[#1877F2] inline-block ml-2" />
                  )}
                </div>
                <div className="text-sm">{noti.message}</div>
                <div
                  className={`text-xs mt-1 ${
                    noti.read ? "text-gray-500" : "text-[#1877F2] font-medium"
                  }`}
                >
                  {formatDistanceToNow(new Date(noti.timestamp), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className="p-4 text-gray-400 text-sm text-center">
            Không có thông báo mới
          </div>
        )}
      </ul>
      {hasNextPage && (
        <div className="p-2 flex justify-center bg-white">
          <button
            onClick={() => fetchNextPage()}
            className="text-blue-600 hover:underline text-sm font-medium cursor-pointer"
          >
            Xem thêm
          </button>
        </div>
      )}
    </DropdownModal>
  );
}
