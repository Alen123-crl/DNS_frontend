import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const getMenuTree = () => api.get("/menus/tree");
export const getMenuById  = (id) => api.get(`/menus/${id}`);
export const getMenuItems = (menuId) => api.get(`/menu-items?menuId=${menuId}`);

export const createMenu     = (data) => api.post("/menus", data);
export const createMenuItem = (data) => api.post("/menu-items", data);
