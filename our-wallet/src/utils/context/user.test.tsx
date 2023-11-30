/**
 * @vitest-environment jsdom
 */

import renderer, {act} from 'react-test-renderer'
import {assert, describe, expect, test, vi} from "vitest";
import {UserContext, UserContextProvider} from "./user.tsx";
import {useContext} from "react";
import {User} from "firebase/auth";


describe('context user', () => {
    const MockApp = () => {
        const {isLogin, handleLogout, email} = useContext(UserContext);
        return (<>
                {isLogin ? <span>isLogin</span> : <span>notLogin</span>}
                <h1>email: {email}</h1>
                <button onClick={async () => {
                    await handleLogout();
                }}>logout
                </button>
            </>
        )
    }
    test('try context when not login', async () => {
        const mockFunc = {
            isEffectTrigger: false,
            authStateSubscribe: () => {
                mockFunc.isEffectTrigger = true
            },
            signOutBeforeHook: async () => {
            }
        }
        const spyAuthStateSubscribe = vi.spyOn(mockFunc, 'authStateSubscribe')
        const spySignOutBeforeHook = vi.spyOn(mockFunc, 'signOutBeforeHook')
        expect(spyAuthStateSubscribe).toBeDefined()
        expect(spySignOutBeforeHook).toBeDefined()

        const MockWrapper = () => {
            return (<UserContextProvider authStateSubscribe={() => {
                // base on use effect, is async call
                // console.log('authStateSubscribe')
                mockFunc.authStateSubscribe()
                mockFunc.authStateSubscribe()
                mockFunc.authStateSubscribe()
            }} signOutBeforeHook={async () => {
                await mockFunc.signOutBeforeHook()
            }}>
                <MockApp></MockApp>
            </UserContextProvider>)
        }
        const {instance} = await getWrapper(MockWrapper, mockFunc)

        const btn = instance.findByType('button')
        expect(btn).toBeDefined()

        act(() => {
            btn.props.onClick()
            btn.props.onClick()
            btn.props.onClick()
        })

        checkIsNotLogin(instance)

        expect(spySignOutBeforeHook).toBeCalledTimes(3)
        expect(spyAuthStateSubscribe).toBeCalledTimes(3)
    })

    test('try context when login', async () => {
        const mockFunc = {
            isEffectTrigger: false,
            authStateSubscribe: () => {
                mockFunc.isEffectTrigger = true
            },
            signOutBeforeHook: async () => {
            }
        }
        const spyAuthStateSubscribe = vi.spyOn(mockFunc, 'authStateSubscribe')
        const spySignOutBeforeHook = vi.spyOn(mockFunc, 'signOutBeforeHook')
        expect(spyAuthStateSubscribe).toBeDefined()
        expect(spySignOutBeforeHook).toBeDefined()

        const MockWrapper = () => {
            return (<UserContextProvider authStateSubscribe={(_, cb) => {
                // base on use effect, is async call
                // console.log('authStateSubscribe')
                mockFunc.authStateSubscribe()
                assert(typeof cb === 'function')
                const mockUser = {
                    uid: 'mock-uid',
                    displayName: 'John Doe',
                    email: 'john@example.com',
                    // 其他屬性...
                };
                if (cb) {
                    cb({
                        ...mockUser
                    } as User)
                }
            }} signOutBeforeHook={async () => {
                await mockFunc.signOutBeforeHook()
            }}>
                <MockApp></MockApp>
            </UserContextProvider>)
        }
        const {instance} = await getWrapper(MockWrapper, mockFunc)

        const btn = instance.findByType('button')
        expect(btn).toBeDefined()

        act(() => {
            btn.props.onClick()
        })

        const h1 = instance.findByType('h1')
        expect(h1).toBeDefined()
        expect(h1.children).toEqual(['email: ', 'john@example.com'])

        const span = instance.findByType('span')
        expect(span).toBeDefined()
        expect(span.children).toEqual(['isLogin'])

        expect(spySignOutBeforeHook).toBeCalledTimes(1)
        expect(spyAuthStateSubscribe).toBeCalledTimes(1)
    })

    test('try login with no email', async () => {
        const mockFunc = {
            isEffectTrigger: false,
            authStateSubscribe: () => {
                mockFunc.isEffectTrigger = true
            },
        }
        const MockWrapper = () => {
            return (<UserContextProvider authStateSubscribe={(_, cb) => {
                // base on use effect, is async call
                mockFunc.authStateSubscribe()
                assert(typeof cb === 'function')
                const mockUser = {
                    uid: 'mock-uid',
                    displayName: 'John Doe',
                    // 其他屬性...
                };
                if (cb) {
                    cb({
                        ...mockUser
                    } as User)
                }
            }} signOutBeforeHook={async () => {
            }}>
                <MockApp></MockApp>
            </UserContextProvider>)
        }
        const {instance} = await getWrapper(MockWrapper, mockFunc)

        const h1 = instance.findByType('h1')
        expect(h1).toBeDefined()
        expect(h1.children).toEqual(['email: '])
    })

    test('try context logout', async () => {
        const mockFunc = {
            isEffectTrigger: false,
            authStateSubscribe: () => {
                mockFunc.isEffectTrigger = true
            },
            signOutBeforeHook: async () => {
            }
        }
        const spyAuthStateSubscribe = vi.spyOn(mockFunc, 'authStateSubscribe')
        const spySignOutBeforeHook = vi.spyOn(mockFunc, 'signOutBeforeHook')
        expect(spyAuthStateSubscribe).toBeDefined()
        expect(spySignOutBeforeHook).toBeDefined()

        const MockWrapper = () => {
            return (<UserContextProvider authStateSubscribe={(_, cb) => {
                // base on use effect, is async call
                // console.log('authStateSubscribe')
                mockFunc.authStateSubscribe()
                assert(typeof cb === 'function')
                if (cb) {
                    cb(null)
                }
            }} signOutBeforeHook={async () => {
                await mockFunc.signOutBeforeHook()
            }}>
                <MockApp></MockApp>
            </UserContextProvider>)
        }
        const {instance} = await getWrapper(MockWrapper, mockFunc)

        checkIsNotLogin(instance)

        expect(spySignOutBeforeHook).toBeCalledTimes(0)
        expect(spyAuthStateSubscribe).toBeCalledTimes(1)
    })
})

async function getWrapper(MockWrapper: any, mockFunc: any) {
    const component = renderer.create(
        <MockWrapper></MockWrapper>,
    )

    await vi.waitUntil(() => {
        return mockFunc.isEffectTrigger
    })

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toBeDefined()

    const instance = component.root
    expect(instance).toBeDefined()
    return {component, instance}
}

function checkIsNotLogin(instance: any) {
    const h1 = instance.findByType('h1')
    expect(h1).toBeDefined()
    expect(h1.children).toEqual(['email: '])

    const span = instance.findByType('span')
    expect(span).toBeDefined()
    expect(span.children).toEqual(['notLogin'])
}