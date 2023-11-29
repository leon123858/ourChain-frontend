import renderer from 'react-test-renderer'
import {describe, expect, test} from "vitest";
import {UserContext, UserContextProvider} from "./user.tsx";
import {useContext} from "react";


describe('context user', () => {
    const MockApp = () => {
        const {isLogin, handleLogout, email} = useContext(UserContext);
        return (<>
                {isLogin || <span>notLogin</span>}
                <h1>email: {email}</h1>
                <button onClick={async () => {
                    await handleLogout();
                }}>logout
                </button>
            </>
        )
    }
    test('try context', async () => {
        let spyTriggerTime = 0;
        const component = renderer.create(
            <UserContextProvider authStateSubscribe={() => {
                // base on use effect, is async call
                spyTriggerTime += 2;
            }} signOutBeforeHook={async () => {
                spyTriggerTime += 1;
            }}>
                <MockApp></MockApp>
            </UserContextProvider>,
        )

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
        expect(tree).toBeDefined()

        const instance = component.root
        expect(instance).toBeDefined()

        const btn = instance.findByType('button')
        expect(btn).toBeDefined()
        btn.props.onClick()

        expect(spyTriggerTime).toBe(1)

        const h1 = instance.findByType('h1')
        expect(h1).toBeDefined()
        expect(h1.children).toEqual(['email: '])

        const span = instance.findByType('span')
        expect(span).toBeDefined()
        expect(span.children).toEqual(['notLogin'])
    })
})
