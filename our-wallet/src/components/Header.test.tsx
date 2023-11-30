/**
 * @vitest-environment jsdom
 */

import renderer from 'react-test-renderer'
import {describe, expect, test} from "vitest";
import Header from "./Header.tsx";
import {createContext} from "react";

describe('Header', () => {
    const MockUserContext = createContext({
        isLogin: false,
        email: "",
        handleLogout: async () => {
        }
    });

    test('try login', () => {
        let spyTriggerTime = 0;
        const spyFunc = () => {
            spyTriggerTime += 1;
        }
        const contextValue = {
            isLogin: false,
            handleLogout: async () => {
            },
            email: "",
        }
        const component = renderer.create(
            <MockUserContext.Provider value={contextValue}>
                <Header handleSignIn={async () => {
                    spyFunc()
                }} context={MockUserContext}></Header>
            </MockUserContext.Provider>,
        )
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
        expect(tree).toBeDefined()

        const instance = component.root
        expect(instance).toBeDefined()

        const btn = instance.findByProps({className: 'loginBtn'})
        expect(btn?.children[0]).toBe('Login')
        for (let i = 0; i < 10; i++) {
            btn.props.onClick()
            expect(spyTriggerTime).toBe(i + 1)
        }
    })

    test('try logout', () => {
        let spyTriggerTime = 0;
        const spyFunc = () => {
            spyTriggerTime += 1;
        }
        const component = renderer.create(
            <MockUserContext.Provider value={{
                isLogin: true,
                handleLogout: async () => {
                    spyFunc()
                },
                email: "test@sample.com"
            }}>
                <Header handleSignIn={async () => {
                }} context={MockUserContext}></Header>
            </MockUserContext.Provider>
        )
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
        expect(tree).toBeDefined()

        const instance = component.root
        expect(instance).toBeDefined()

        const btn = instance.findByProps({className: 'logoutBtn'})
        expect(btn?.children[0]).toBe('test@sample.com')
    })
})
