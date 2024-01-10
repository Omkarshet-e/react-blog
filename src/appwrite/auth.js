import { Client, Account, ID } from "appwrite";
import config from "./config";

class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(config.apiEndPoint).setProject(config.projectId);
    this.account = new Account(this.client);
  }

  async signup({ email, password, username }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        username
      );
      console.log("User Created");
      return user;
    } catch (error) {
      console.log("appwrite error::signup error", error);
    }
  }

  async signIn({ email, password }) {
    try {
      const session = await this.account.createEmailSession(email, password);
      return session;
    } catch (error) {
      console.log("appwrite error::signin error", error);
    }
  }

  async signOut() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.log("appwrite error::signout error", error);
      return false;
    }
  }

  async getUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log("appwrite error::getUser error", error);
    }
  }
}

const auth = new AuthService();

export default auth;
