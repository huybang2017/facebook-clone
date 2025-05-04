import { useEffect, useRef, useState } from "react";

export default function DropdownModal({ trigger, children, align = "right" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen(!open)}>{trigger}</div>

      {open && (
        <div
          className={`absolute z-50 mt-2 w-80 rounded-box bg-white border shadow-lg ${align === "left" ? "left-0" : "right-0"
            }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
