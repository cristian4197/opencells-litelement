import { css } from 'lit';

export const styles = css`
:host {
  display: block;
  font-family: Arial, sans-serif;
}

.select-filter {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 300px;
}

label {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}

select {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #333;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}

select:focus {
  border-color: #6200ea;
  box-shadow: 0 0 0 3px rgba(98, 0, 234, 0.2);
}

select:hover {
  background-color: #f0f0f0;
}

option {
  font-size: 1rem;
  color: #333;
}
`;
