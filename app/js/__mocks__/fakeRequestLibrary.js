import Response from 'http-response-object';

export const fakeRequestLibrary = (requestUrl, requestOptions, shouldPass = true, responseData = null) => {

    if(shouldPass){
        return new Response(200, {}, responseData || { message: `You called ${requestUrl}` }, requestUrl);
    }else{
        return new Response(404, {}, responseData || { message: `The page at  ${requestUrl} was not found` }, requestUrl);
    }
};
