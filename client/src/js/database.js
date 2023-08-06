import { openDB } from 'idb';
import { header } from './header';


const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => {
//   const jateDb = await openDB("jate", 1);
//   const tx = jateDb.transaction("jate", "readwrite");
//   const store = tx.objectStore("jate");
//   const request = store.put(content, 1); 
//   const result = await request;
//   console.log("Data saved to the database");
// };
//this was kinda working

export const putDb = async (content, key) => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const data = { id:1, value: content };
  
  const request = store.put(data);
  const result = await request;
  console.log('Data saved to the database');
};



// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (key) => {
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.get(1);
  const result = await request;
  
  console.log(result);
  console.log(result.value);
  //return result.value.value;

  if (result.value && typeof result.value === 'string' && result.value.trim() !== '') {
    console.log("Data retrieved from the database");
    return result.value + header;
  } else {
    console.log("Data not found in the database or is invalid");
    return "sample" + header;
  }
};



initdb();
