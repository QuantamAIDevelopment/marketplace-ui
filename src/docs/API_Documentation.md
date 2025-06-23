# n8n Workflow Dashboard API Documentation

This document outlines the API endpoints and data structures required for each workflow component in the dashboard.

## 1. Leaves Classifier

### Endpoint: `/api/leaves/classifier`
**Method:** GET

#### Response
```json
{
  "stats": {
    "casualLeaves": 12,
    "sickLeaves": 5,
    "totalEmployees": 50,
    "activeRequests": 3
  },
  "recentActivity": [
    {
      "id": "string",
      "employeeName": "string",
      "leaveType": "CASUAL|SICK",
      "status": "APPROVED|PENDING|REJECTED",
      "startDate": "ISO-8601 date",
      "endDate": "ISO-8601 date",
      "timestamp": "ISO-8601 date"
    }
  ]
}
```

## 2. Birthday & Work Anniversary

### Endpoint: `/api/celebrations`
**Method:** GET

#### Query Parameters
- `startDate`: ISO-8601 date (optional)
- `endDate`: ISO-8601 date (optional)

#### Response
```json
{
  "stats": {
    "upcomingBirthdays": 3,
    "upcomingAnniversaries": 2,
    "totalCelebrations": 5
  },
  "todayCelebrations": [
    {
      "id": "string",
      "employeeName": "string",
      "type": "BIRTHDAY|ANNIVERSARY",
      "date": "ISO-8601 date",
      "yearsOfService": "number (for anniversaries)",
      "email": "string"
    }
  ]
}
```

## 3. Document Upload Reminder

### Endpoint: `/api/documents/status`
**Method:** GET

#### Response
```json
{
  "stats": {
    "pendingUploads": 5,
    "completedUploads": 15,
    "totalDocuments": 20
  },
  "recentActivity": [
    {
      "id": "string",
      "employeeName": "string",
      "documentType": "string",
      "status": "PENDING|COMPLETED|OVERDUE",
      "dueDate": "ISO-8601 date",
      "lastReminder": "ISO-8601 date"
    }
  ]
}
```

## 4. Candidate Details Sync

### Endpoint: `/api/candidates/sync`
**Method:** GET

#### Response
```json
{
  "stats": {
    "syncedProfiles": 45,
    "pendingSync": 3,
    "failedSync": 2
  },
  "syncStatus": [
    {
      "id": "string",
      "profileId": "string",
      "status": "SYNCED|PENDING|FAILED",
      "lastSyncAttempt": "ISO-8601 date",
      "error": "string (if failed)"
    }
  ]
}
```

## 5. Payslip Auto Encrypted

### Endpoint: `/api/payslips/encryption`
**Method:** GET

#### Response
```json
{
  "stats": {
    "encryptedPayslips": 48,
    "pendingEncryption": 2,
    "totalPayslips": 50
  },
  "recentActivity": [
    {
      "id": "string",
      "employeeName": "string",
      "payslipMonth": "string",
      "status": "ENCRYPTED|PENDING|FAILED",
      "encryptionDate": "ISO-8601 date",
      "fileSize": "number"
    }
  ]
}
```

## 6. Email Attachment Processing

### Endpoint: `/api/attachments/processing`
**Method:** GET

#### Response
```json
{
  "stats": {
    "processedAttachments": 25,
    "processingAttachments": 3,
    "failedAttachments": 1
  },
  "processingStatus": [
    {
      "id": "string",
      "fileName": "string",
      "fileType": "string",
      "status": "PROCESSED|PROCESSING|FAILED",
      "startTime": "ISO-8601 date",
      "endTime": "ISO-8601 date",
      "error": "string (if failed)"
    }
  ]
}
```

## 7. Policy Change Notification

### Endpoint: `/api/policies/notifications`
**Method:** GET

#### Response
```json
{
  "stats": {
    "acknowledgedPolicies": 35,
    "pendingAcknowledgments": 15,
    "totalPolicies": 50
  },
  "recentNotifications": [
    {
      "id": "string",
      "policyName": "string",
      "version": "string",
      "status": "ACKNOWLEDGED|PENDING",
      "publishDate": "ISO-8601 date",
      "acknowledgmentCount": "number"
    }
  ]
}
```

## 8. Resume to Profile Extractor

### Endpoint: `/api/resumes/extraction`
**Method:** GET

#### Response
```json
{
  "stats": {
    "extractedProfiles": 28,
    "processingResumes": 2,
    "failedExtractions": 1
  },
  "extractionStatus": [
    {
      "id": "string",
      "resumeName": "string",
      "status": "EXTRACTED|PROCESSING|FAILED",
      "startTime": "ISO-8601 date",
      "endTime": "ISO-8601 date",
      "extractedData": {
        "name": "string",
        "email": "string",
        "phone": "string",
        "skills": ["string"],
        "experience": "number"
      }
    }
  ]
}
```

## 9. Absence Tracker

### Endpoint: `/api/absences/tracker`
**Method:** GET

#### Query Parameters
- `startDate`: ISO-8601 date (optional)
- `endDate`: ISO-8601 date (optional)

#### Response
```json
{
  "stats": {
    "currentAbsences": 5,
    "plannedAbsences": 8,
    "totalEmployees": 50
  },
  "recentAbsences": [
    {
      "id": "string",
      "employeeName": "string",
      "type": "SICK|CASUAL|PLANNED",
      "startDate": "ISO-8601 date",
      "endDate": "ISO-8601 date",
      "status": "ACTIVE|PLANNED|COMPLETED"
    }
  ]
}
```

## Common Error Responses

All endpoints may return the following error responses:

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": "string (optional)"
  }
}
```

Common error codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Authentication

All API endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Rate Limiting

- Maximum 100 requests per minute per IP
- Maximum 1000 requests per hour per IP

## Data Refresh

- Stats are cached for 5 minutes
- Recent activity data is real-time
- Use WebSocket connections for live updates (optional)

## WebSocket Events

For real-time updates, connect to the WebSocket endpoint:

```
ws://your-domain/ws/workflows
```

Events:
- `workflow_update`: When any workflow status changes
- `stats_update`: When stats are updated
- `error`: When an error occurs 