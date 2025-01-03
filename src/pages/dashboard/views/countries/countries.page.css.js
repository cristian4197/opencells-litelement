import { css } from 'lit';

export const styles = css`
main {
  height: 100vh;
  overflow-y: auto;
}
.countries-title {
  text-align: center;
}
.countries-title h2 {
  margin-bottom: 10px;
}
.countries-list {
  margin-bottom: 120px;
  max-width: 900px;
  margin: 0 auto;
}

.countries-list_detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.table-country {
  width: 100%;
}

.input-search {
  width: 800px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.filters {
  align-self: flex-start;
  margin-left: 20px;
  margin-bottom: 20px;
}

.countries-list.pagination {
  display: flex;
  flex-direction: column; /* Cambiado de row a column */
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 20px 0;
  width: 100%;
  box-sizing: border-box;
}

.countries-list.page-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  margin: 10px 0; /* Cambiado para que haya espacio vertical */
  cursor: pointer;
  font-size: 16px;
  border-radius: 25px;
  transition: background-color 0.3s ease;
}

.countries-list.page-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.countries-list.page-button:hover {
  background-color: #0056b3;
}

.countries-list.page-info {
  font-size: 16px;
  margin: 10px 0;
  color: #333;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.page-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  margin: 0 10px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 25px;
  transition: background-color 0.3s ease;
}

.page-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.page-button:hover {
  background-color: #0056b3;
}

.page-info {
  font-size: 16px;
  margin: 0 10px;
  color: #333;
}

`;
