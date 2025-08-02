import { removePageByUri } from "@/actions/admin/page-management";
import { updateUserSubscription } from "@/actions/admin/user-management";
import { getUserPagesByUserId } from "@/actions/page/page";
import { getUserTransactionsByUserId } from "@/actions/transactions/transactionsList";
import { useState, useTransition } from "react";
import AdminSendMessageModal from "./adminSendMessage";

const TabButton = ({ active, onClick, children }) => {
  return (
    <button
      className={`relative mx-[2px] h-8 border-2 border-b-[#808080] border-l-[#ffffff] border-r-[#808080] border-t-[#ffffff] px-4 ${
        active
          ? "z-10 mb-[-2px] border-b-[#c0c0c0] bg-[#c0c0c0] font-bold"
          : "border-l-[#dfdfdf] border-t-[#dfdfdf] bg-[#c0c0c0]"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const UserDetailsTab = ({
  user,
  premiumDays,
  setPremiumDays,
  onAddPremium,
  onBanUser,
  updatingUserSubscription,
}) => {
  const subscriptionRemaining = Math.floor(
    (user?.subscriptionExpire?.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );

  // TODO: change later if add gold tier
  const subscriptionPlan = "silver";

  return (
    <div>
      <div dir="ltr" className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <h3 className="mb-2 font-bold">User Information</h3>
          <div className="space-y-1">
            <div>Username: {user.name}</div>
            <div>Email: {user.email}</div>
            <div>Phone Number: {user.mobileNumber}</div>
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-bold">Subscription</h3>
          <div className="space-y-1">
            <div>
              Subscription:{" "}
              {user.subscriptionPlan === "silver" ? "Premium" : "Free"}
            </div>
            {user.subscriptionPlan === "silver" && (
              <div>
                Subscription Expires:{" "}
                {user.subscriptionPlan === "silver"
                  ? subscriptionRemaining
                  : "0"}
                {" Days"}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 font-bold">Management Tools</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="h-8 w-20 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] px-2 outline-none"
              value={premiumDays}
              onChange={(e) => setPremiumDays(e.target.value)}
              min="1"
            />
            <span>Days</span>
            <button
              className="h-8 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-4 font-medium shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000]"
              onClick={() => onAddPremium(user, subscriptionPlan, premiumDays)}
              disabled={updatingUserSubscription}
            >
              {updatingUserSubscription ? "Adding..." : "Add"}
            </button>
          </div>
          <button
            className="h-8 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-4 font-medium text-red-600 shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000]"
            onClick={onBanUser}
          >
            Ban User
          </button>
        </div>
      </div>
    </div>
  );
};

const UserPagesTab = ({ pages }) => {
  const [isPendingDeletePage, startsTransitionDeletePage] = useTransition();
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold">User Pages</h3>
        <span className="text-sm">Count: {pages.length}</span>
      </div>
      <div className="border-2 border-b-[#000000] border-l-[#dfdfdf] border-r-[#000000] border-t-[#dfdfdf]">
        <div className="flex bg-[#000080] text-white">
          <div className="w-1/4 p-2">Title</div>
          <div className="w-1/4 p-2">Actions</div>
        </div>
        {pages.map((page) => (
          <div
            key={page.uri}
            className="flex border-t border-t-[#808080] hover:bg-[#e0e0e0]"
          >
            <div className="w-1/4 p-2">{page.uri}</div>
            <div className="flex w-1/4 gap-1 p-2">
              <button
                className="border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-2 text-xs shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000]"
                onClick={() => {}}
              >
                Ban
              </button>
              <button
                className="border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-2 text-xs shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000]"
                onClick={() =>
                  startsTransitionDeletePage(() => removePageByUri(page.uri))
                }
                disabled={isPendingDeletePage}
              >
                Delete
              </button>
              <button
                className="border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-2 text-xs shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000]"
                onClick={() =>
                  window.open(
                    `${process.env.NEXT_PUBLIC_APP_URL}/${page.uri}`,
                    "_blank",
                  )
                }
              >
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserTransactionsTab = ({ transactions }) => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold">Transactions History</h3>
        <span className="text-sm">Count: {transactions.length}</span>
      </div>

      {transactions.length === 0 ? (
        <div className="border-2 border-b-[#000000] border-l-[#dfdfdf] border-r-[#000000] border-t-[#dfdfdf] p-4 text-center">
          No Transactions
        </div>
      ) : (
        <div className="border-2 border-b-[#000000] border-l-[#dfdfdf] border-r-[#000000] border-t-[#dfdfdf]">
          <div className="flex bg-[#000080] text-white">
            <div className="w-1/4 p-2">Price</div>
            <div className="w-1/4 p-2">duration</div>
            <div className="w-1/4 p-2">Request Date</div>
            <div className="w-1/4 p-2">وضعیت</div>
          </div>
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex border-t border-t-[#808080] hover:bg-[#e0e0e0]"
            >
              <div className="w-1/4 p-2">{transaction.amount}</div>
              <div className="w-1/4 p-2">
                {transaction.duration}
                {" Months"}
              </div>
              <div className="w-1/4 p-2">
                {transaction.requestDate.toLocaleDateString("fa-IR")}
              </div>
              <div className="w-1/4 p-2">
                <span
                  className={` ${
                    transaction.status === "completed"
                      ? "text-green-600"
                      : transaction.status === "pending"
                        ? "text-cyan-500"
                        : "text-red-600"
                  } `}
                >
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const UserDetailsModal = ({
  user,
  onClose,
  pages,
  transactions,
  premiumDays,
  setPremiumDays,
  onAddPremium,
  onBanUser,
  updatingUserSubscription,
}) => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div
      dir="ltr"
      className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="w-[700px] border-2 border-b-[#dfdfdf] border-l-[#808080] border-r-[#dfdfdf] border-t-[#808080] bg-[#c0c0c0] shadow-[2px_2px_0px_0px_#000000]">
        {/* Modal Title Bar */}
        <div className="flex h-6 items-center justify-between bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 text-white">
          <span className="text-sm">User Detail: {user.name}</span>
          <button className="font-bold text-white" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b-2 border-b-[#808080] bg-[#c0c0c0] p-1">
          <TabButton
            active={activeTab === "details"}
            onClick={() => setActiveTab("details")}
          >
            Information
          </TabButton>
          <TabButton
            active={activeTab === "pages"}
            onClick={() => setActiveTab("pages")}
          >
            Pages
          </TabButton>
          <TabButton
            active={activeTab === "transactions"}
            onClick={() => setActiveTab("transactions")}
          >
            Transactions
          </TabButton>
        </div>

        {/* Tab Content */}
        <div className="max-h-[400px] overflow-y-auto border-2 border-b-[#ffffff] border-l-[#808080] border-r-[#ffffff] border-t-[#808080] bg-white p-4">
          {activeTab === "details" && (
            <UserDetailsTab
              user={user}
              premiumDays={premiumDays}
              setPremiumDays={setPremiumDays}
              onAddPremium={onAddPremium}
              onBanUser={onBanUser}
              updatingUserSubscription={updatingUserSubscription}
            />
          )}
          {activeTab === "pages" && <UserPagesTab pages={pages} />}
          {activeTab === "transactions" && (
            <UserTransactionsTab transactions={transactions} />
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end border-t border-t-[#808080] p-2">
          <button
            className="h-8 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-4 font-medium shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000]"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ResultsTable = ({ users, isLoading }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showSendMessage, setShowSendMessage] = useState(false);
  const [premiumDays, setPremiumDays] = useState(30);
  const [userPages, setUserPages] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);
  const [isPendingSubscription, startTransitionSubscription] = useTransition();
  const [isPendingPages, startTransitionPages] = useTransition();
  const [isPendingTransactions, startTransitionTransactions] = useTransition();

  const fetchUserPages = (userId) => {
    startTransitionPages(async () => {
      const pages = await getUserPagesByUserId(userId);
      setUserPages(pages);
    });
  };

  const fetchUserTransactions = (userId) => {
    startTransitionTransactions(async () => {
      const transactions = await getUserTransactionsByUserId(userId);
      setUserTransactions(transactions);
    });
  };

  const handleDetailsClick = (user) => {
    setSelectedUser(user);
    fetchUserPages(user.id);
    fetchUserTransactions(user.id);
    setShowUserDetails(true);
  };

  const handleAddPremium = (user, subscriptionPlan, days) => {
    startTransitionSubscription(async () => {
      await updateUserSubscription({ userId: user.id, subscriptionPlan, days });
    });
  };

  const handleBanUser = () => {
    alert(`User ${selectedUser.name} banned`);
  };

  if (isLoading) return null;

  if (users.length === 0 || !users) {
    return (
      <div className="flex justify-center p-4 text-gray-600">No Users</div>
    );
  }

  return (
    <>
      <div className="border-2 border-b-[#000000] border-l-[#dfdfdf] border-r-[#000000] border-t-[#dfdfdf]">
        {/* Main Table Header */}
        <div className="flex bg-[#000080] text-white">
          <div className="w-1/6 p-2">Username</div>
          <div className="w-1/6 p-2">Email</div>
          <div className="w-1/6 p-2">Phone Number</div>
          <div className="w-1/6 p-2">Has Premium</div>
          <div className="w-1/6 p-2">Actions</div>
        </div>

        {/* Main Table Rows */}
        {users.map((user) => (
          <div
            key={user.id}
            className="flex border-t border-t-[#808080] hover:bg-[#e0e0e0]"
          >
            <div className="w-1/6 p-2">{user.name || "-"}</div>
            <div className="w-1/6 p-2">{user.email || "-"}</div>
            <div className="w-1/6 p-2">{user.mobileNumber || "-"}</div>
            <div className="w-1/6 p-2">
              {user.subscriptionPlan === "silver" ? "✅" : "❌"}
            </div>
            <div className="w-1/6 p-2">
              <div className="flex gap-1">
                <button
                  className="border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-2 text-sm shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000]"
                  onClick={() => handleDetailsClick(user)}
                >
                  Details
                </button>
                <button
                  className="border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-2 text-sm shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000]"
                  onClick={() => setShowSendMessage(true)}
                >
                  SendMessage
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setShowUserDetails(false)}
          pages={userPages}
          transactions={userTransactions}
          premiumDays={premiumDays}
          setPremiumDays={setPremiumDays}
          onAddPremium={handleAddPremium}
          onBanUser={handleBanUser}
          updatingUserSubscription={isPendingSubscription}
        />
      )}

      {showSendMessage && selectedUser && (
        <AdminSendMessageModal
          user={selectedUser}
          onClose={() => setShowSendMessage(false)}
        />
      )}
    </>
  );
};

export default ResultsTable;
