export const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("notificationsDB", 1);
      request.onerror = (event) => {
        console.error("Database error:", event.target.errorCode);
        reject(event.target.errorCode);
      };
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore("notifications", { autoIncrement: true });
        objectStore.createIndex("timestamp", "timestamp", { unique: false });
      };
    });
  };

  export const getAllNotifications = async () => {
    const db = await openDatabase();
    const transaction = db.transaction(["notifications"], "readonly");
    const objectStore = transaction.objectStore("notifications");
  
    return new Promise((resolve, reject) => {
      const request = objectStore.getAll();
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
      request.onerror = (event) => {
        reject(event.target.errorCode);
      };
    });
  };
  
  export const clearAllNotifications = async () => {
    const db = await openDatabase();
    const transaction = db.transaction(["notifications"], "readwrite");
    const objectStore = transaction.objectStore("notifications");
    const request = objectStore.clear();
  
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve();
      };
      request.onerror = (event) => {
        reject(event.target.errorCode);
      };
    });
  };