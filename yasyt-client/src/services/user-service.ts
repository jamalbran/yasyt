import { User } from "../entities/user.entity";

const API_URL = "http://localhost:3000/user";

export async function findAllUser() {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("There was a problem with the fetch operation:", error);
    return;
  }
}

export async function createUser(body: User) {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      return;
    }
  } catch (error) {
    console.log("There was a problem with the fetch operation:", error);
    return;
  }
}
