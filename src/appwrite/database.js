import { Client, Databases, ID, Query } from "appwrite";
import config from "./config";

const dbId = config.databaseId;
const collectionId = config.collectionId;

class DatabaseService {
  client = new Client();
  database;
  constructor() {
    this.client.setEndpoint(config.apiEndPoint).setProject(config.projectId);
    this.database = new Databases(this.client);
  }

  async createDocument(data) {
    //   todo : - pass in { title, content, imageId } ****
    try {
      const document = await this.database.createDocument(
        dbId,
        collectionId,
        ID.unique(),
        data
      );
      return document;
    } catch (error) {
      console.log("appwrite error::createDocument error", error);
    }
  }

  async getDocument($id) {
    try {
      const document = await this.database.getDocument(dbId, collectionId, $id);
      return document;
    } catch (error) {
      console.log("appwrite error::getDocument error", error);
    }
  }

  async getAllDocuments() {
    try {
      const docList = await this.database.listDocuments(dbId, collectionId, [
        Query.orderDesc("createdDate"),
      ]);
      return docList;
    } catch (error) {
      console.log("appwrite error::getAllDocs error", error);
    }
  }

  async updateDocument($id, data) {
    try {
      const document = this.database.updateDocument(
        dbId,
        collectionId,
        $id,
        data
      );
      return document;
    } catch (error) {
      console.log("appwrite error::updateDocument error", error);
    }
  }

  //   async deleteDocument() {}
}

const db = new DatabaseService();
export default db;
