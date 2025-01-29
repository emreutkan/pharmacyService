
![image](https://github.com/user-attachments/assets/cac2047b-efe9-44bf-8467-a1edd3f16198)

# Pharmacy Service API

URL: https://pharmacyservice-a6acf2bebehsgcfc.canadacentral-01.azurewebsites.net

---

## Introduction

The **Pharmacy Service API** handles pharmacy authentication and management. It provides secure endpoints for pharmacy registration and login operations.

## Features

- **Authentication System:** Secure registration and login for pharmacies
- **JWT Token Generation:** Secure token-based authentication
- **Role-based Access:** Specific pharmacy role assignment

## API Endpoints

### 1. Register Pharmacy
- **URL:** `/auth/register`
- **Method:** `POST`
- **Description:** Register a new pharmacy account
- **Request Body:**
  ```json
  {
    "email": "pharmacy@example.com",
    "password": "secure_password",
    "name": "Pharmacy ABC"
  }
  ```
- **Responses:**
  - **201:** Registration successful
  - **400:** Pharmacy already exists
  - **500:** Registration error

### 2. Login Pharmacy
- **URL:** `/auth/login`
- **Method:** `POST`
- **Description:** Authenticate pharmacy and get access token
- **Request Body:**
  ```json
  {
    "email": "pharmacy@example.com",
    "password": "secure_password"
  }
  ```
- **Responses:**
  - **200:** Login successful (returns JWT token)
  - **401:** Invalid credentials
  - **404:** Pharmacy not found
  - **500:** Login error

## Security

- Authentication using Bearer JWT tokens
- Secure password handling
- Email-based authentication system

For detailed API specifications, please refer to the full documentation.
