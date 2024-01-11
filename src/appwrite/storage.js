import { Client, Storage, ID } from "appwrite";
import config from "./config";

const bucketId = config.bucketId;

class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client.setEndpoint(config.apiEndPoint).setProject(config.projectId);
    this.storage = new Storage(this.client);
  }

  async createFile(file) {
    const fileDoc = await this.storage.createFile(bucketId, ID.unique(), file);
    return fileDoc;
  }

  getFilePreview($id) {
    const preview = this.storage.getFilePreview(bucketId, $id);
    return preview;
  }
}

const storage = new StorageService();

export default storage;
