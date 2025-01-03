import { css } from "lit";

export const styles = css`
:host {
  display: block;
  margin: 20px auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #333;
}

form {
  width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

input:focus {
  border-color: #1d3557;
  outline: none;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #007BFF;
  color: white;
  font-size: 16px;
  font-weight: 500;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #d62828;
}

.submit-btn svg {
  margin-right: 10px;
  width: 18px;
  height: 18px;
}

`;