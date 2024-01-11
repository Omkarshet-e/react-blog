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
    const document = await this.database.createDocument(
      dbId,
      collectionId,
      ID.unique(),
      data
    );
    return document;
  }

  async getDocument($id) {
    const document = await this.database.getDocument(dbId, collectionId, $id);
    return document;
  }

  async getAllDocuments() {
    const docList = await this.database.listDocuments(dbId, collectionId, [
      // Query.orderDesc("title"),
      Query.orderDesc("$createdAt"),
    ]);
    return docList;
  }

  async updateDocument($id, data) {
    const document = this.database.updateDocument(
      dbId,
      collectionId,
      $id,
      data
    );
    return document;
  }
}

const db = new DatabaseService();
export default db;
