import React from "react";
import dayjs from "dayjs";

const Notifications = ({ notifications }) => {
  return (
    <div className="bg-white border shadow-lg rounded-md w-[500px] max-h-[400px] overflow-y-auto p-4 z-50">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Notifications</h3>
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-sm">No notifications available.</p>
      ) : (
        <table className="w-full text-sm table-auto border-collapse">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left px-2 py-1">Message</th>
              <th className="text-left px-2 py-1">From</th>
              <th className="text-left px-2 py-1">Read</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((n, idx) => (
              <tr key={idx} className={n.read ? "bg-white" : "bg-blue-50"}>
                <td className="px-2 py-2" dangerouslySetInnerHTML={{ __html: n.message }} />
                <td className="px-2 py-2 text-gray-600">{n.from_user}</td>
                <td className="px-2 py-2">
                  {n.read ? (
                    <span className="text-green-600 font-medium">✔</span>
                  ) : (
                    <span className="text-red-500 font-medium">✖</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Notifications;
