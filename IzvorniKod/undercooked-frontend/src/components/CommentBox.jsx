import { Form } from 'react-router-dom'

export function CommentBox() {
    return <div>
        <Form method="post" action="/postComment">
            <div>
                <textarea id="freeform" name="text" rows="4" cols="50">
                    Enter text here...
                </textarea>
            </div>
            <button type="submit">Post comment</button>
        </Form>
    </div>
}