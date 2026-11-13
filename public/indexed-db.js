const DB_NAME = "NotetDB";
const DB_VERSION = 1;
const STORE_NAME = "notes";

let db;

export function openDatabase() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onupgradeneeded = function (event) {
			db = event.target.result;
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME, {
					keyPath: "id",
					autoIncrement: true
				});
			}
		};

		request.onsuccess = function (event) {
			db = event.target.result;
			resolve(db);
		};
 
		request.onerror = function () {
			reject(request.error);
		};
	});
}

export function addNote(title, content) {
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORE_NAME, "readwrite");
		const store = transaction.objectStore(STORE_NAME);

		const note = {
			title: title,
			content: content,
			createdAt: new Date().toISOString()
		};

		const request = store.add(note);

		request.onsuccess = function () {
			resolve(request.result);
		};

		request.onerror = function () {
			reject(request.error);
		};
	});
}

export function getNotes() {
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORE_NAME, "readonly");
		const store = transaction.objectStore(STORE_NAME);
		const request = store.getAll();

		request.onsuccess = function () {
			resolve(request.result);
		};

		request.onerror = function () {
			reject(request.error);
		};
	});
}

export function updateNote(id, title, content) {
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORE_NAME, "readwrite");
		const store = transaction.objectStore(STORE_NAME);

		const request = store.get(Number(id));

		request.onsuccess = function () {
			const note = request.result;

			if (!note) {
				resolve(false);
				return;
			}

			note.title = title;
			note.content = content;

			const updateRequest = store.put(note);

			updateRequest.onsuccess = function () {
				resolve(true);
			};

			updateRequest.onerror = function () {
				reject(updateRequest.error);
			};
		};

		request.onerror = function () {
			reject(request.error);
		};
	});
}

export function deleteNote(id) {
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORE_NAME, "readwrite");
		const store = transaction.objectStore(STORE_NAME);
		const request = store.delete(Number(id));

		request.onsuccess = function () {
			resolve(true);
		};

		request.onerror = function () {
			reject(request.error);
		};
	});
}
