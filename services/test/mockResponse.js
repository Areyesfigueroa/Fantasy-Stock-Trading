const getResponse = () => {
    const response = { 
        statusCode: 200,
        send: jest.fn(obj => obj),
        status: jest.fn(code => {statusCode=code; return response})
    };

    return response;
}

module.exports = {
    getResponse
}

