import { markRead } from "@/actions/notifications";

const NotificationCard = ({ notification }) => {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h3 className="font-medium text-gray-900 dark:text-white">
          {notification.title}
        </h3>
        {notification.body && (
          <p className="mt-1 line-clamp-1 text-sm text-gray-600 dark:text-white/70">
            {notification.body}
          </p>
        )}
        <time className="mt-2 block text-xs text-gray-500 dark:text-white/50">
          {new Date(notification.createdAt).toLocaleString()}
        </time>
      </div>
      {!notification.isRead && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            markRead(notification.id);
          }}
          className="text-xs text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
        >
          خواندم
        </button>
      )}
    </div>
  );
};

export default NotificationCard;
