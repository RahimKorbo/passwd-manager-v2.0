import { TestData } from "./TestData.jsx";

let data = [...TestData];

const generateId = data =>
    data.reduce((acc, current) => Math.max(acc, current.siteId), 0) + 1;

export const insertItem = item => {
    item.siteId = generateId(data);
    item.inEdit = false;
    data.unshift(item);
    return data;
};

export const getItems = () => {
    return data;
};

export const updateItem = item => {
    let index = data.findIndex(record => record.siteId === item.siteId);
    data[index] = item;
    return data;
};

export const deleteItem = item => {
    let index = data.findIndex(record => record.siteId === item.siteId);
    data.splice(index, 1);
    return data;
};