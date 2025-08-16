const SERVER_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const ServerActions = {
  GET: {
    METHOD: 'GET',
    URL: '/data'
  },
  POST: {
    METHOD: 'POST',
    URL: '/'
  }
};

const getData = async (onError) => {
  try {
    const response = await fetch(`${SERVER_URL}${ServerActions.GET.URL}`, { method: ServerActions.GET.METHOD });
    if (!response.ok) {
      onError();
      return [];
    }
    return await response.json();
  } catch {
    onError();
    return [];
  }
};

const sendData = async (body) => {
  const response = await fetch(`${SERVER_URL}${ServerActions.POST.URL}`, { method: ServerActions.POST.METHOD, body });
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject();
  }
};

export {getData, sendData};
