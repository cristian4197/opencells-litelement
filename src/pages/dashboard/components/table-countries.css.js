import { css } from 'lit';

export const styles = css`
  .countries-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .countries-table th,
  .countries-table td {
    padding: 15px 20px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }

  .countries-table th {
    background-color: #f5f5f5;
    color: #333;
    font-weight: 600;
  }

  .countries-table td {
    color: #666;
    font-size: 14px;
    transition: background-color 0.3s ease;
  }

  .countries-table tr:hover td {
    background-color: #f2f2f2;
  }

  .no-countriess {
    text-align: center;
    color: #888;
    font-size: 18px;
    padding: 20px;
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

  .flag {
    width:50px;
  }
`;
