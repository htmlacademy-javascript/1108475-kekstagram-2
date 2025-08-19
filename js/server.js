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

const loadData = async (url, method, body = null) => {
  const response = await fetch(url, { method: method, body: body });
  return response.ok ? response.json() : Promise.reject();
};

const getData = () => loadData(`${SERVER_URL}${ServerActions.GET.URL}`, ServerActions.GET.METHOD);

const sendData = (body) => loadData(`${SERVER_URL}${ServerActions.POST.URL}`, ServerActions.POST.METHOD, body);

export {getData, sendData};
