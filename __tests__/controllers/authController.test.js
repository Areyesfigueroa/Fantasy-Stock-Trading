const db = require('../../db/auth');
const authCtrl = require('../../controllers/authController');
const StockErrorHandler = require('../../error/StockErrorHandler');
const UserSession = require('../../services/auth/UserSession');
const registerUserService = require('../../services/auth/registerUserService');
const loginUserService = require('../../services/auth/loginUserService');
const authUserSessionService = require('../../services/auth/authUserSessionService');

jest.mock('../../db/auth');
jest.mock('../../services/auth/registerUserService');
jest.mock('../../services/auth/loginUserService');
jest.mock('../../services/auth/authUserSessionService');

const getMockedUserSession = () => {
    return new UserSession("UserId", 'test@gmail.com', 'John', 'Doe', 'sessionId');
}

const getMockedResponse = () => {
    const response = { 
        statusCode: 200,
        send: jest.fn(obj => obj),
        status: jest.fn(code => {statusCode=code; return response})
    };

    return response;
}

describe("Auth Controller Tests", () => {
    describe("Register User Tests", () => {
        test('Reponse should be called with UserSession obj', async () => {
            //Mock Values
            const request = { body: { email: 'test@gmail.com', firstName: 'John', lastName: 'Doe', password: 'test123', termsCheck: true } };
            const body = request.body;
            const response = getMockedResponse();
            const userSession = getMockedUserSession;
    
            //Mocking DB Functions
            registerUserService.registerUser.mockReturnValue(userSession);

            //Main Function
            await authCtrl.register(request, response);
    
            //Assert Tests
            expect(response.send).toHaveBeenCalledWith(userSession);
            expect(registerUserService.registerUser).toHaveBeenCalledWith(body.email, body.firstName, body.lastName, body.password, body.termsCheck);
        });
    
        test('Response should send error object', async () => {
            const errorMsg = 'Mock Error Test';
            const request = { body: { email: 'test@gmail.com', firstName: 'John', lastName: 'Doe', password: 'test123', termsCheck: true } };
            const response = getMockedResponse();
            //Mocking Functions
            registerUserService.registerUser.mockImplementation(() => {
                throw new Error(errorMsg);
            });
        
            //Main function
            await authCtrl.register(request, response);
            
            //Assert
            let error = response.send.mock.results[0].value;
            let errorHandler = new StockErrorHandler(`Server Error, could not register: ${errorMsg}`);
            
            expect(error).toEqual(errorHandler);
        });
    })
    
    describe("Login User Tests", () => {
        test('Response should be called with user session', async () => {
            const request = { body: { email: 'test@gmail.com', password: 'test123'} };
            const response = getMockedResponse();
            const userSession = getMockedUserSession();

            loginUserService.loginUser.mockReturnValue(userSession);
    
            await authCtrl.login(request, response);
            
            expect(response.send).toHaveBeenCalledWith(userSession);
            expect(loginUserService.loginUser).toHaveBeenCalledWith(request.body.email, request.body.password);
        });
    
        test('Response should send error object', async () => {
            const errorMsg = 'Mock Error Test';
            const request = { body: { email: 'test@gmail.com', firstName: 'John', lastName: 'Doe', password: 'test123', termsCheck: true } };
            const response = getMockedResponse();
            
            //Mocking DB Functions
            loginUserService.loginUser.mockImplementation(() => {
                throw new Error(errorMsg);
            });
        
            //Main function
            await authCtrl.login(request, response);
            
            //Assert
            let error = response.send.mock.results[0].value;
            let errorHandler = new StockErrorHandler(`Server Error, could not login: ${errorMsg}`);
            
            expect(error).toEqual(errorHandler);
        });
    });
    
    describe("Logout User Tests", () => {
        test('Response should send success obj', async() => {
            const request = {};
            const response = { send: jest.fn(obj => obj) };
            const sessionId = 'token';
    
            await authUserSessionService.authUserSession.mockReturnValue(sessionId);
    
            await authCtrl.logout(request, response);
    
            expect(response.send.mock.results[0].value).toEqual({ success: true });
        });

        test('Testing DB Query Params', async() => {
            const request = {};
            const response = { send: jest.fn(obj => obj) };
            const sessionId = 'token';
    
            await authUserSessionService.authUserSession.mockReturnValue(sessionId);
    
            await authCtrl.logout(request, response);
    
            expect(db.destroyUserSession).toHaveBeenCalledWith(sessionId);
        });
    
        test('Response should send error object', async() => {
            const request = {};
            const response = { 
                statusCode: 200,
                send: jest.fn(obj => obj),
                status: jest.fn(code => {statusCode=code; return response})
            };
            const errorMsg = "Mock Error";
            await authUserSessionService.authUserSession.mockImplementation(() => {
                throw new Error(errorMsg);
            });
    
            await authCtrl.logout(request, response);
    
            const errorHandler = new StockErrorHandler(`Server error, could not logout: ${errorMsg}`);
            expect(response.send.mock.results[0].value).toEqual(errorHandler);
        });
    });
});

