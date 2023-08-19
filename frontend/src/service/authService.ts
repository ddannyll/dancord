/**
 *  AuthService interface is used to signIn, signUp, signOut of the application
 *  - AUTH should be handled through cookies in a real implementation
 */
export interface AuthService {
    signIn: (username: string, password: string) => Promise<{id: string}>
    signUp: (username: string, password: string) => Promise<{id: string}>
    signOut: () => Promise<boolean>
    isSignedIn: () => Promise<boolean>
}

/**
 *  HTTPAuthService uses HTTP to implement the AuthService, connects to a backend
 *  using the given backendURL parameter. Backend is expected to set cookies on browser
 *  @constructor backendURL: URL
 *  @implements {AuthService}
 */
export class HTTPAuthService implements AuthService {
    backendURL: URL
    constructor(backendURL: URL) {
        this.backendURL = backendURL
    }
    signIn = async (username: string, password:string) => {
        const url = new URL(this.backendURL)
        url.pathname = '/user/signin'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
        if (!response.ok) {
            throw new Error(await response.text())
        }
        const responseJson = await response.json() as {id: string}
        return responseJson
    }
    signUp = async (username: string, password:string) => {
        const url = new URL(this.backendURL)
        url.pathname = '/user/signup'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
        if (!response.ok) {
            throw new Error(await response.text())
        }
        const responseJson = await response.json() as {id: string}
        return responseJson
    }
    signOut = async () => {
        const url = new URL(this.backendURL)
        url.pathname = 'user/signout'
        const response = await fetch(url, {
            method: 'POST',
        })
        if (!response.ok) {
            throw new Error(await response.text())
        }
        const responseJson = await response.json() as {success: boolean}
        return responseJson.success
    }
    isSignedIn = async () => {
        return true // todo later
    }
}
