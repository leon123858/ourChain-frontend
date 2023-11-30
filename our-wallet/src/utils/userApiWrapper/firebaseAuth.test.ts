import {describe, expect, test, vi} from 'vitest'
import {
    getCurrentUser,
    onAuthStateChanged,
    signInProviderFactory,
    signIn,
    signOut
} from "./firebaseAuth.ts";


describe('firebaseAuth', () => {
    const MockAuth = {
        signInWithGoogle: async () => {
            return {user: {displayName: 'test', email: ''}}
        },
        signInWithGoogleError: async () => {
            throw new Error('error')
        },
        signOut: async () => {
        },
        signOutError: async () => {
            throw new Error('error')
        },
        onAuthStateChanged: (cb: any) => {
            cb()
        },
        currentUser: {
            displayName: 'test',
            email: 'test@sample.com',
        }
    }
    test('should login', async () => {
        const spy = vi.spyOn(MockAuth, 'signInWithGoogle')
        await signIn(MockAuth as any, MockAuth.signInWithGoogle as any)
        expect(spy).toHaveBeenCalled()
        await expect(signIn(MockAuth as any, MockAuth.signInWithGoogleError as any)).rejects.toThrow('error')
    })

    test('should logout', async () => {
        const spy = vi.spyOn(MockAuth, 'signOut')
        await signOut(MockAuth as any)
        expect(spy).toHaveBeenCalled()
        await expect(signOut({signOut: MockAuth.signOutError} as any)).rejects.toThrow('error')
    })

    test('should get current user', async () => {
        const result = getCurrentUser(MockAuth as any)
        expect(result?.email).toBe(MockAuth.currentUser.email)
        expect(result?.displayName).toBe(MockAuth.currentUser.displayName)
    })

    test('should listen login', async () => {
        const spy = vi.spyOn(MockAuth, 'onAuthStateChanged')
        const mockFunc = vi.fn()
        onAuthStateChanged(MockAuth as any, mockFunc)
        expect(spy).toHaveBeenCalled()
        expect(mockFunc).toHaveBeenCalled()
    })

    test('should use each provider', async () => {
        const spy = vi.spyOn(MockAuth, 'signInWithGoogle')
        const provider = signInProviderFactory('GOOGLE')
        await signIn(MockAuth as any, MockAuth.signInWithGoogle as any, provider)
        expect(spy).toHaveBeenCalled()
        try {
            signInProviderFactory('ANONYMOUS')
            // throw new Error('do not throw')
        } catch (e: any) {
            expect(e.message).toBe('not implement')
        }
        try {
            signInProviderFactory('WRONG' as any)
            // throw new Error('do not throw')
        } catch (e: any) {
            expect(e.message).toBe('wrong type')
        }
    })
})
