import API from './api';

// Add a new tailoring order
export const addOrder = (orderData) => API.post('/tailoringorders/add', orderData);

// Get all tailoring orders
export const getAllOrders = () => API.get('/tailoringorders/displayall');

// Get a single tailoring order by ID
export const getOrderById = (id) => API.get(`/tailoringorders/display/${id}`);

// Update an existing tailoring order
export const updateOrder = (id, orderData) => API.put(`/tailoringorders/update/${id}`, orderData);

// Delete a tailoring order by ID
export const deleteOrder = (id) => API.delete(`/tailoringorders/delete/${id}`);
