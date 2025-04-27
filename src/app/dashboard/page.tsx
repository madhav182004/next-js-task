"use client";

import { useEffect } from "react";
import { useWebSocket } from "@/lib/websocket";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import ActiveUsersChart from "@/components/ActiveUsersChart";

const DashboardPage = () => {
  const router = useRouter();
  const { isConnected, activeUsers, messages } = useWebSocket();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <ThemeToggle />
      </div>

      <div className={`mb-6 p-4 rounded ${isConnected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
        {isConnected ? "🟢 Connected to server" : "🔴 Disconnected"}
      </div>

      <div className="text-lg font-semibold mb-4">
        Active Users: {activeUsers}
      </div>

      <div className="flex gap-6">
        <div className="w-1/2 h-1/2">
          <ActiveUsersChart activeUsers={activeUsers} />
        </div>

        <div className="m-5 w-1/2">
          <h2 className="text-2xl font-semibold mb-4 w-full">Activity Feed</h2>
          <ul className="space-y-2 w-full">
            {messages.map((item, idx) => (
              <li key={idx} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                <div className="font-semibold">{item.sender}</div>
                <div>{item.text}</div>
                <div className="text-xs text-gray-400">{item.timestamp.toLocaleString()}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>


      <button
        onClick={async () => {
          await auth.signOut();
          router.push("/login");
        }}
        className="mt-10 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
