import { Client, Account, ID } from "appwrite";
import config from "./config";

class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(config.apiEndPoint).setProject(config.projectId);
    this.account = new Account(this.client);
  }

  async signup({ username, email, password }) {
    const user = await this.account.create(
      ID.unique(),
      email,
      password,
      username
    );
    return user;
  }

  async signIn({ email, password }) {
    const session = await this.account.createEmailSession(email, password);
    return session;
  }

  async signOut() {
    await this.account.deleteSessions();
    return true;
  }

  async getUser() {
    const user = await this.account.get();
    return user;
  }
  async getSession($id) {
    const session = await this.account.getSession(String($id));
    return session;
  }
}

const auth = new AuthService();

export default auth;
