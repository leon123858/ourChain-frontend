/**
 * @vitest-environment jsdom
 */


import renderer from 'react-test-renderer'
import {describe, expect, test, vi} from "vitest";
import Menu from "./Menu.tsx";
import {createContext} from "react";

describe('Menu', () => {
    const MockUserContext = createContext({
        isLogin: false,
        email: "",
        handleLogout: async () => {
        }
    });

    test('try render not login', () => {
        const mockGetUserInfo = vi.fn()
        const contextValue = {
            isLogin: false,
            handleLogout: async () => {
            },
            email: "",
        }
        const component = renderer.create(
            <MockUserContext.Provider value={contextValue}>
                <Menu getUserInfo={mockGetUserInfo}></Menu>
            </MockUserContext.Provider>,
        )

        expect(mockGetUserInfo).toBeCalledTimes(0)

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
        expect(tree).toBeDefined()

        const instance = component.root
        expect(instance).toBeDefined()
    })

    test('try render login',async () => {
        const mockGetUserInfo = vi.fn()
        const contextValue = {
            isLogin: true,
            handleLogout: async () => {
            },
            email: "",
        }
        const component = renderer.create(
            <MockUserContext.Provider value={contextValue}>
                <Menu getUserInfo={mockGetUserInfo} userContext={MockUserContext}></Menu>
            </MockUserContext.Provider>,
        )

        await vi.waitUntil(() => {
            return mockGetUserInfo.mock.calls.length > 0
        })

        expect(mockGetUserInfo).toBeCalledTimes(1)

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
        expect(tree).toBeDefined()

        const instance = component.root
        expect(instance).toBeDefined()
    })

    test('try render login with user info and logout',async () => {
        const mockLogout = vi.fn()
        const mockGetUserInfoInner = vi.fn()
        const mockGetUserInfo = () => {
            mockGetUserInfoInner()
            return {
                displayName: "test",
                email: "test@test.com",
                uid: "123456"
            }
        }
        const contextValue = {
            isLogin: true,
            handleLogout: mockLogout,
            email: "",
        }
        const component = renderer.create(
            <MockUserContext.Provider value={contextValue}>
                <Menu getUserInfo={mockGetUserInfo} userContext={MockUserContext}></Menu>
            </MockUserContext.Provider>,
        )

        await vi.waitUntil(() => {
            return mockGetUserInfoInner.mock.calls.length > 0
        })

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
        expect(tree).toBeDefined()

        const instance = component.root
        expect(instance).toBeDefined()

        const uid = instance.findByProps({className: 'uid'})
        expect(uid).toBeDefined()
        expect(uid.children[1]).toBe('123456')

        const logoutBtn = instance.findAllByProps({className: 'logoutBtn'})[1]
        expect(logoutBtn).toBeDefined()
        expect(mockLogout).toBeCalledTimes(0)
        logoutBtn.props.onClick()
        expect(mockLogout).toBeCalledTimes(1)
    })
})