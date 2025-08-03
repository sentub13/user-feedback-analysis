# Customer Feedback Analysis Backend

## API Endpoints

### Survey Management

**Base URL:** `/api/surveys`

#### 1. Create Survey
- **Method:** POST
- **URL:** `/api/surveys`
- **Payload:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "easyToUse": "Yes",
  "helpfulSupport": "Yes",
  "foundWhatNeeded": "Yes",
  "useAgain": "Yes",
  "recommend": "Yes",
  "comments": "Great service!"
}
```
- **Response:** Survey object with generated ID

#### 2. Get All Surveys
- **Method:** GET
- **URL:** `/api/surveys`
- **Payload:** None
- **Response:** Array of survey objects

#### 3. Get Survey by ID
- **Method:** GET
- **URL:** `/api/surveys/{id}`
- **Payload:** None
- **Response:** Survey object or 404 if not found

#### 4. Update Survey
- **Method:** PUT
- **URL:** `/api/surveys/{id}`
- **Payload:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "easyToUse": "No",
  "helpfulSupport": "Yes",
  "foundWhatNeeded": "Partially",
  "useAgain": "Maybe",
  "recommend": "No",
  "comments": "Could be improved"
}
```
- **Response:** Updated survey object

#### 5. Delete Survey
- **Method:** DELETE
- **URL:** `/api/surveys/{id}`
- **Payload:** None
- **Response:** 204 No Content

## Survey Fields

| Field | Type | Max Length | Description |
|-------|------|------------|-------------|
| id | Long | - | Auto-generated ID |
| name | String | 100 | Customer name |
| email | String | 100 | Customer email |
| easyToUse | String | 10 | Easy to use rating |
| helpfulSupport | String | 10 | Support helpfulness rating |
| foundWhatNeeded | String | 10 | Found what needed rating |
| useAgain | String | 10 | Would use again rating |
| recommend | String | 10 | Would recommend rating |
| comments | String | 500 | Additional comments |