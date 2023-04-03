// import jwt-decode
import decode from 'jwt-decode';

class AuthService {
  // get user data from token
  getUser() {
    return decode(this.getToken());
  }

  // check if user's logged in
  loggedIn() {
    // Check if there is a saved token and if it's still valid
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false; 
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem('id_token');
        return true;
      } 
      return false;
    } catch (err) {
      return false;
    }
  }

  // Retrieve user token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Save user token to localStorage
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // remove user token and profile data from localStorage
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
