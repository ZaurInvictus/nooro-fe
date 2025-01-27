"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getTasks } from "../utils/api";
import TaskCard from "@/components/TaskCard";
import type { Task } from "@/utils/types";
import Header from "@/components/Header";
import { CirclePlus, NotepadText } from "lucide-react";
import Loading from "@/components/Loading";
import { toast } from "sonner";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
      setError(null);
      setIsLoading(false);
    } catch {
      setError("Failed to fetch tasks. Please try again later.");
    }
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleTaskRemove = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.success("Task removed successfully");
  };

  return (
    <div className="w-full  min-h-[100vh]">
      <Header />
      <div className="w-full  flex items-center justify-center flex-col lg:px-0 px-4">
        <div className="w-full max-w-[600px] pb-10">
          <Link
            href="/create"
            className="bg-blue-500 -translate-y-5 gap-2 text-center text-sm flex items-center justify-center w-full text-white px-4 py-3.5 rounded hover:bg-blue-600 mb-4 "
          >
            <p className="text-[14px] leading-[1]">Create Task</p>{" "}
            <CirclePlus className="size-[14px] p-0 m-0" />
          </Link>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="w-full flex items-center justify-between mt-5">
            <div className="flex items-center justify-start gap-2">
              <p className="text-customBlue text-sm">Tasks</p>
              <div className="bg-gray-600 text-xs min-w-[20px] px-1 rounded-full py-0.5 flex items-center justify-center">
                {tasks?.length}
              </div>
            </div>
            <div className="flex items-center justify-start gap-2">
              <p className="text-customPurple text-sm">Completed</p>
              <div className="bg-gray-600  text-xs min-w-[20px] px-2 py-0.5 rounded-full flex items-center justify-center">
                {tasks?.filter((item) => item?.completed === true).length} de{" "}
                {tasks?.length}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2.5 mt-5">
            {isLoading ? (
              <Loading />
            ) : tasks?.length > 0 ? (
              tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={handleTaskUpdate}
                  onRemove={handleTaskRemove}
                />
              ))
            ) : (
              <div className="w-full flex items-center justify-center min-h-[300px] border-t border-t-white/10 rounded-md flex-col">
                <NotepadText
                  className="text-white/50 size-[70px]"
                  strokeWidth={1}
                />
                <p className="mt-2 text-gray-400 font-[500]">
                  You don&apos;t have any tasks registered yet.
                </p>
                <p className="mt-2 text-gray-500 font-[400]">
                  Create tasks and oranize your to-do items.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
