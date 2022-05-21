import decode from "jwt-decode";

class AuthService {
  // get profile
  getProfile() {
    return decode(this.getToken());
  }
  // check if logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  // check token for expiry
  isTokenExpired(token) {
    const decoded = decode(token);
    return Date.now() >= decoded.exp * 1000;
  }
  // retrieve token
  getToken() {
    return localStorage.getItem("auth_token");
  }
  // execute log in
  login(token) {
    localStorage.setItem("auth_token", token);
    window.location.assign("/"); // redirect
  }
  // execute log out
  logout() {
    localStorage.removeItem("auth_token");
    window.location.assign("/login"); // redirect
  }
}

export default new AuthService();
