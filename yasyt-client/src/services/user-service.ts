import { User } from "../entities/user.entity";

const API_URL = "http://localhost:3000/user";

export async function findAllUser(): Promise<User[] | undefined> {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("There was a problem with the fetch operation:", error);
    return undefined;
  }
}

export async function createUser(user: User): Promise<void> {
  const { id, registerDate, ...userWithoutId } = user;
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userWithoutId),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log("There was a problem with the fetch operation:", error);
    throw error;
  }
}

export async function updateUser(user: User): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log("There was a problem with the fetch operation:", error);
    throw error;
  }
}

export async function deleteUser(userId: number): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}
