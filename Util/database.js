import * as SQLite from "expo-sqlite";
import { place } from "../models/place";
const database = await SQLite.openDatabaseAsync("place.db");
export function init() {
  const promise = new Promise((resolve, reject) => {
    database.withTransactionSync((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            titl TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
            )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.withTransactionSync((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri address, lat, lng) VALUES (?,?,?,?,?)`,
        [place.title, place.imageUri, place.address, place.lat, place.lng],
        (_, result) => {
          reject(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.withTransactionSync((tx) => {
      tx.executeSql(
        "SELECT * FROM places",
        [],
        (_, result) => {
          const places = [];
          for (const dp of result.rows._array) {
            places.push(
              new place(
                dp.title,
                dp.imageUri,
                {
                  address: dp.adress,
                  lat: dp.lat,
                  lng: dp.lng,
                },
                dp.id
              )
            );
          }

          resolve(places);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
}

export function fetchPlaceDetails(id) {
  const promise = new Promise((resolve, reject) => {
    database.withTransactionSync((tx) => {
      tx.executeSql(
        "SELECT * FROM places WHERE id=?",
        [id],
        (_, result) => {
          const dp = result.rows._array[0];
          const place = new place(
            dp.title,
            dp.imageUri,
            {
              address: dp.adress,
              lat: dp.lat,
              lng: dp.lng,
            },
            dp.id
          );

          resolve(place);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
}
