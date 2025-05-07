/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axiosClient from "@/apis/axiosClient";
import { ToastContext } from "@/contexts/ToastProvider";

const InvitationFriends = () => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { toast } = useContext(ToastContext);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        setLoading(true);
        const res = await getFriends();
        if (res && res.data) {
          setInvitations(res.data.data);
        } else {
          setInvitations([]);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Không thể tải danh sách lời mời kết bạn từ server!");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchInvitations();
  }, []);

  // Xử lý chấp nhận lời mời kết bạn
  const handleAcceptInvitation = async (invitationId) => {
    if (window.confirm("Bạn có chắc muốn chấp nhận lời mời kết bạn này?")) {
      try {
        await axiosClient.post(`/friend-invitation/${invitationId}/accept`);
        setInvitations(
          invitations.filter((invitation) => invitation.id !== invitationId)
        );
        setError("");
      } catch (error) {
        setError("Không thể chấp nhận lời mời kết bạn. Vui lòng thử lại.");
      }
    }
  };

  // Xử lý từ chối lời mời kết bạn
  const handleRejectInvitation = async (invitationId) => {
    if (window.confirm("Bạn có chắc muốn từ chối lời mời kết bạn này?")) {
      try {
        await axiosClient.post(`/friend-invitation/${invitationId}/reject`);
        setInvitations(
          invitations.filter((invitation) => invitation.id !== invitationId)
        );
        setError("");
      } catch (error) {
        setError("Không thể từ chối lời mời kết bạn. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="w-full h-full box-border bg-white">
      {/* Header */}
      <h1 className="text-2xl font-bold p-10 -mt-4 text-gray-800">
        Danh sách lời mời kết bạn
      </h1>

      {/* Loading */}
      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">
            Đang tải danh sách lời mời kết bạn...
          </p>
        </div>
      ) : (
        <>
          {/* Số lượng lời mời */}
          <p className="text-gray-600 -mt-18 -mb-4 p-10 font-semibold">
            {invitations.length} lời mời kết bạn
          </p>

          {/* Danh sách lời mời kết bạn */}
          <div className="w-full bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-10 gap-2">
            {invitations.map((invitation) => (
              <div key={invitation.id} className="w-full">
                {/* Card lời mời */}
                <div className="min-w-[210px] flex flex-col items-start justify-center border border-gray-300 rounded-lg shadow-sm">
                  <Link
                    to={`/profile/${invitation.id}`}
                    className="w-full h-full"
                  >
                    {/* Hình ảnh người gửi lời mời */}
                    <div
                      className="w-full h-[210px] bg-cover bg-center border-b border-gray-300 bg-no-repeat rounded-t-lg cursor-pointer"
                      style={{ backgroundImage: `url(${invitation.image})` }}
                    ></div>

                    {/* Tên người gửi lời mời */}
                    <div className="w-full flex p-2 ml-1 text-left cursor-default">
                      <span className="block text-sm font-bold text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap hover:underline hover:cursor-pointer">
                        {invitation.username}
                      </span>
                    </div>
                  </Link>

                  {/* Button */}
                  <div className="w-full flex-col space-x-2">
                    <button
                      className="mx-auto px-14 py-1 w-fit flex items-center justify-center bg-blue-600 text-white rounded-lg mb-2 hover:bg-blue-700 cursor-pointer"
                      onClick={() => handleAcceptInvitation(invitation.id)}
                    >
                      Chấp nhận
                    </button>
                    <button
                      className="mx-auto px-17 py-1 w-fit flex items-center justify-center bg-gray-200 text-black rounded-lg mb-2 hover:bg-gray-300 cursor-pointer"
                      onClick={() => handleRejectInvitation(invitation.id)}
                    >
                      Từ chối
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default InvitationFriends;
