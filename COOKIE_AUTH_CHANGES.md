# Cookie-Based Authentication Implementation

## Changes Made

The authentication system has been updated to use secure HTTP-only cookies instead of returning session tokens in response bodies.

### Modified Files

1. **`apps/backend/src/auth/auth.controller.ts`**
    - Added cookie configuration constants
    - Updated `signUp()` and `signIn()` to set HTTP-only secure cookies
    - Updated `signOut()` to clear authentication cookies
    - Changed return types to `{ success: boolean }` instead of session IDs

2. **`apps/backend/src/auth/auth.guard.ts`**
    - Modified authentication priority:
        1. Session cookies (primary)
        2. Authorization headers (API clients)
        3. Query parameters (SSE fallback)

3. **`apps/backend/src/main.ts`**
    - Added cookie-parser middleware
    - Configured CORS to allow credentials
    - Set proper CORS headers for cookie-based auth

### Dependencies Added

- `cookie-parser`: For parsing HTTP cookies
- `@types/cookie-parser`: TypeScript definitions

### Cookie Configuration

- **Name**: `session`
- **HTTP-Only**: `true` (prevents XSS)
- **Secure**: `true` in production (HTTPS only)
- **SameSite**: `strict` (CSRF protection)
- **Max Age**: 30 days (matches session expiry)
- **Path**: `/`

### Environment Variables

Ensure the following environment variable is set:

- `WEB_URL`: Frontend URL for CORS configuration (already configured in router.config.ts)
- `NODE_ENV`: Set to "production" for secure cookies

### API Response Changes

**Before:**

```json
POST /auth/sign-in
Response: "session-id-string"
```

**After:**

```json
POST /auth/sign-in
Response: { "success": true }
Set-Cookie: session=session-id-string; HttpOnly; Secure; SameSite=Strict; Max-Age=2592000; Path=/
```

### Backward Compatibility

The system maintains backward compatibility:

- API clients can still use `Authorization: Bearer <token>` headers
- SSE connections can still use `?token=<session-id>` query parameters
- Cookie-based auth takes priority when available

## Security Benefits

1. **XSS Protection**: HTTP-only cookies cannot be accessed by JavaScript
2. **CSRF Protection**: SameSite=Strict prevents cross-site requests
3. **Transport Security**: Secure flag ensures HTTPS-only transmission
4. **Automatic Management**: Browsers handle cookie storage and transmission
