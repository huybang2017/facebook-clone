
import React from "react";

const EditModal = ({
    open,
    setOpen,
    children,
}) => {
    if (!open) return null;

    return (
        <div className="modal modal-open bg-black bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center">
            <div className="modal-box relative max-h-[calc(80vh-64px)] overflow-y-auto px-4 pt-4 pb-2 bg-white rounded-lg shadow-lg w-[90%] max-w-md">
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 group hover:bg-gray-200 cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400 group-hover:text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                {children}
            </div>
        </div>
    );
};
export default EditModal;
