import { Form } from 'react-router-dom'

export function Settings() {
    return <>
        <div>
            <h2>Change username:</h2>
            <div>Current username: Username</div>
            <Form method="post" action="/lol">
                <div>
                    <label htmlFor="">Type your new username:</label>
                    <input required type="text" name="username" />
                </div>
                <button type="submit" >Submit</button>
            </Form>
        </div>
        <div>
            <h2>Change email:</h2>
            <div>Current email: mail@mail.com</div>
            <Form method="post" action="/lol">
                <div>
                    <label htmlFor="">Type your new email:</label>
                    <input required type="email" name="email" /></div>
                <button type="submit" >Submit</button>
            </Form>
        </div>
        <div>
            <h2>Change password:</h2>
            <Form method="post" action="/lol">
                <div>
                    <label htmlFor="">Type your password:</label>
                    <input required type="password" name="password" />
                </div>
                <div>
                    <label htmlFor="">New password:</label>
                    <input required type="password" name="new_password" />
                </div>
                <button type="submit" >Submit</button>
            </Form>
        </div>
        <div>
            <h2>Delete account:</h2>
            <Form method="post" action="/lol">
                <div>
                    <label htmlFor="">Type your password:</label>
                    <input required type="password" name="password" />
                </div>
                <button type="submit" >Delete account</button>
            </Form>
        </div>
    </>
}