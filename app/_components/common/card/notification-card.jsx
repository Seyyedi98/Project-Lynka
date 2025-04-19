import { markRead } from "@/actions/notifications";

const NotificationCard = ({ notification }) => {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h3 className="font-medium">{notification.title}</h3>
        {notification.body && (
          <p className="mt-1 line-clamp-1 text-sm text-gray-600">
            {notification.body}
          </p>
        )}
        <time className="mt-2 block text-xs text-gray-500">
          {new Date(notification.createdAt).toLocaleString()}
        </time>
      </div>
      {!notification.isRead && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            markRead(notification.id);
          }}
          className="text-xs text-blue-600 hover:underline"
        >
          خواندم
        </button>
      )}
    </div>
  );
};

export default NotificationCard;
