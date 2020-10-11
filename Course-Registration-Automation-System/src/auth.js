class Auth {
    constructor() {
      this.authenticated = false;
      this.token = "";
    }
  
    login() {
      this.authenticated = true;
    //   cb();
    }
  
    logout() {
      this.authenticated = false;
    //   cb();
    }
  
    isAuthenticated() {
      return this.authenticated;
    }

    setToken(token) {
        this.token = token;
    }

    getToken() {
        return this.token;
    }
  }
  
export default new Auth();
  