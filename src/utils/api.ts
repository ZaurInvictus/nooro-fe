import axios from "axios"
import type { Task } from "./types"

const API_URL = process.env.API_BASE_URL || "http://localhost:4000"

const api = axios.create({
    baseURL: API_URL,
})

export async function getTasks(): Promise<Task[]> {
    try {
        const response = await api.get<Task[]>("/tasks")
        return response.data
    } catch (error) {
        console.error("Failed to fetch tasks:", error)
        throw error
    }
}

export async function getTask(id: string): Promise<Task> {
    try {
        const response = await api.get<Task>(`/tasks/${id}`)
        return response.data
    } catch (error) {
        console.error(`Failed to fetch task with id ${id}:`, error)
        throw error
    }
}

export async function addTask(task: { title: string; color: string }): Promise<Task> {
    try {
        const response = await api.post<Task>("/tasks", task)
        return response.data
    } catch (error) {
        console.error("Failed to add task:", error)
        throw error
    }
}

export async function editTask(id: string, updates: Partial<Task>): Promise<Task> {
    try {
        const response = await api.put<Task>(`/tasks/${id}`, updates)
        return response.data
    } catch (error) {
        console.error(`Failed to edit task with id ${id}:`, error)
        throw error
    }
}

export async function removeTask(id: string): Promise<void> {
    try {
        await api.delete(`/tasks/${id}`)
    } catch (error) {
        console.error(`Failed to remove task with id ${id}:`, error)
        throw error
    }
}

export async function markTaskAsCompleted(id: string, value: boolean): Promise<Task> {
    try {
        const response = await api.put<Task>(`/tasks/${id}`, { completed: value })
        return response.data
    } catch (error) {
        console.error(`Failed to mark task ${id} as completed:`, error)
        throw error
    }
}

