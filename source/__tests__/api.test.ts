import request from 'supertest';
import { server } from '../../server';
import mongoose from 'mongoose';

let baseUrl = '/api/v1'

// test block 1
describe('Authenticate User', () => {
    let payload: any;
    let app: any;

    beforeAll(async (done) => {
        request(server);
        await mongoose.connection.dropCollection('users');
        app = server.listen(5000, () => {
            done();
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await app.close();
        await new Promise<void>(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
    });

    it('should create a user account', async () => {

        const res = request(server)
            .post(`${baseUrl}/auth/signup`)
            .send({
                displayName: 'Becky Ruth',
                email: 'becky@gmail.com',
                password: 'some123@P'
            });

        expect((await res).status).toEqual(201);
    });

    it('should fail on login for non existing account', async () => {

        const res = request(server)
            .post(`${baseUrl}/auth/login`)
            .send({
                email: 'wrongUser@gmail.com',
                password: 'some123@P'
            });

        expect((await res).status).toEqual(404);
    });

    it('should fail on login for wrong password', async () => {

        const res = request(server)
            .post(`${baseUrl}/auth/login`)
            .send({
                email: 'becky@gmail.com',
                password: 'wrongPass1'
            });

        expect((await res).status).toEqual(403);
    });

    it('should login a user', async () => {

        const res = request(server)
            .post(`${baseUrl}/auth/login`)
            .send({
                email: 'becky@gmail.com',
                password: 'some123@P'
            });
        payload = (await res).body;
        expect((await res).status).toEqual(200);
        expect((await res).body.userToken).toEqual(payload.userToken);
        expect((await res).body.authUser).toEqual(payload.authUser);
    });

    // test block 2
    describe('Testing Question and Reply Routes', () => {

        it('should allow authenticated user to post new question', async () => {
            let token = payload.userToken;
            const res = request(server)
                .post(`${baseUrl}/questions/ask`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Some Test Question Title',
                    body: 'Some Test Question Body',
                    tagName: 'testjs, nodejs'
                });

            expect((await res).status).toEqual(201);
        });

        it('should allow authenticated user to reply to selected question', async () => {
            let token = payload.userToken;
            const res = request(server)
                .post(`${baseUrl}/replies/reply`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    questionId: '600813023953dd24bc943be5',
                    replyBody: 'Some test reply to some question'
                });

            expect((await res).status).toEqual(201);
        });

        it('should fail when user wants to fetch own questions', async () => {
            let token = payload.userToken;

            const res = request(server)
                .get(`${baseUrl}/questions/fetch-my-questions`)
                .set('Authorization', `Bearer ${token}`)

            expect((await res).status).toEqual(404);
        });

        it('should fail when user to fetch own replies', async () => {
            let token = payload.userToken;

            const res = request(server)
                .get(`${baseUrl}/replies/fetch-my-replies`)
                .set('Authorization', `Bearer ${token}`)

            expect((await res).status).toEqual(404);
        });
    });

    // test block 3
    describe('Testing Question and Reply Routes', () => {

        it('should allow fetching all questions', async () => {
            const res = request(server)
                .get(`${baseUrl}/questions/fetchall`)

            expect((await res).status).toEqual(200);
        });

        it('should allow fetching question By Id', async () => {
            let qId = '6006c56088b44a0118039bf2';
            const res = request(server)
                .get(`${baseUrl}/questions/fetch/${qId}`)

            expect((await res).status).toEqual(200);
        });

        it('should allow fetching of all replies', async () => {
            const res = request(server)
                .get(`${baseUrl}/replies/fetchall`)

            expect((await res).status).toEqual(200);
        });

        it('should allow fetching reply By Id', async () => {
            let rId = '600756a1ace50d3ccc83cecb';
            const res = request(server)
                .get(`${baseUrl}/replies/fetch/${rId}`)

            expect((await res).status).toEqual(200);
        });
    });

    // test block 4
    describe('Testing Rating Route', () => {

        it('should allow authenticated user to upvote a question', async () => {
            let token = payload.userToken;
            const res = request(server)
                .post(`${baseUrl}/rating/question/upvote`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    questionId: '6006c54a88b44a0118039bf0'
                });

            expect((await res).status).toEqual(201);
        });

        it('should allow authenticated user to downvote a question', async () => {
            let token = payload.userToken;
            const res = request(server)
                .post(`${baseUrl}/rating/question/downvote`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    questionId: '600813023953dd24bc943be5'
                });

            expect((await res).status).toEqual(201);
        });
    });

    // test block 5
    describe('Testing Rating Route', () => {

        it('should allow authenticated user to upvote a reply', async () => {
            let token = payload.userToken;
            const res = request(server)
                .post(`${baseUrl}/rating/reply/upvote`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    replyId: '600816bc01818937dc560258'
                });

            expect((await res).status).toEqual(201);
        });

        it('should allow authenticated user to downvote a reply', async () => {
            let token = payload.userToken;
            const res = request(server)
                .post(`${baseUrl}/rating/reply/downvote`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    replyId: '60081750b73abc665c7dcf94'
                });

            expect((await res).status).toEqual(201);
        });
    });
});