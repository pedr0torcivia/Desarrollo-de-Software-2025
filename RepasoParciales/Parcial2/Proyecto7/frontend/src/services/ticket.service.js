import axios from "axios";

// Trae todos los tickets desde el backend
export async function getAllTickets() {
  const response = await axios.get("/api/tickets");
  return response.data;
}
