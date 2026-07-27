const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  products: {
    getAll: () => ipcRenderer.invoke("products:getAll"),

    getById: (id) => ipcRenderer.invoke("products:getById", id),

    search: (keyword) => ipcRenderer.invoke("products:search", keyword),

    create: (data) => {
      console.log("Preload", data);
      return ipcRenderer.invoke("products:create", data);
    },

    getByBarcode: (id) => ipcRenderer.invoke("products:getByBarcode", id),

    update: (id, data) => ipcRenderer.invoke("products:update", id, data),

    delete: (id) => ipcRenderer.invoke("products:delete", id),

    list: (query) => ipcRenderer.invoke("products:list", query),
  },

  categories: {
    getAll: () => ipcRenderer.invoke("categories:getAll"),

    getById: (id) => ipcRenderer.invoke("categories:getById", id),

    create: (name) => ipcRenderer.invoke("categories:create", name),

    update: (id, name) => ipcRenderer.invoke("categories:update", id, name),

    delete: (id) => ipcRenderer.invoke("categories:delete", id),
  },

  settings: {
    get: () => ipcRenderer.invoke("settings:get"),

    save: (data) => ipcRenderer.invoke("settings:save", data),
  },

  receipts: {
    create: (data) => ipcRenderer.invoke("receipts:create", data),

    getById: (id) => ipcRenderer.invoke("receipts:getById", id),

    list: (query) => ipcRenderer.invoke("receipts:list", query),

    delete: (id) => ipcRenderer.invoke("receipts:delete", id),
  },
  dashboard: {
    get: () => ipcRenderer.invoke("dashboard:get"),
  },

  print: {
    receipt: (receiptId, options) =>
      ipcRenderer.invoke("print:receipt", receiptId, options),
  },

  printer: {
    getAll: () => ipcRenderer.invoke("printer:getAll"),
  },

  export: {
    productCatalog: (filter) =>
      ipcRenderer.invoke(
        "export:productCatalog",

        filter,
      ),
  },

  backup: {
    create: () => ipcRenderer.invoke("backup:create"),

    openFolder: () => ipcRenderer.invoke("backup:openFolder"),
  },

  app: {
    quit: () => ipcRenderer.invoke("app:quit"),
  },

  barcode: {
    print: (payload) => ipcRenderer.invoke("barcode:print", payload),
  },
});
