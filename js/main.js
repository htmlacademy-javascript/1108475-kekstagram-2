const DATA_ARRAY_LENGTH = 25;
const STEP = 100;

const photoDescriptions = [
  'Фото-1',
  'Фото-2',
  'Фото-3',
  'Фото-4',
  'Фото-5',
  'Фото-6',
  'Фото-7',
  'Фото-8',
  'Фото-9',
  'Фото-10',
  'Фото-11',
  'Фото-12',
  'Фото-13',
  'Фото-14',
  'Фото-15',
  'Фото-16',
  'Фото-17',
  'Фото-18',
  'Фото-19',
  'Фото-20',
  'Фото-21',
  'Фото-22',
  'Фото-23',
  'Фото-24',
  'Фото-25'
];

const names = ['Артём', 'Андрей', 'Александр', 'Егор', 'Владимир', 'Кекс', 'Дарья', 'Полина', 'Татьяна', 'Наталья', 'Ирина', 'Ксения'];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getRandomInteger = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));

const getRandomArrElem = (array) => array[Math.floor(Math.random() * array.length)];

const generateComments = function(commentsIdsStep) {
  const commentsIdArray = Array.from({ length: getRandomInteger(0, 30), }, (_, i) => i + commentsIdsStep);
  const commentsArray = [];
  for (let n = 0; n <= commentsIdArray.length - 1; n++) {
    commentsArray.push({
      id: commentsIdArray[n],
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrElem(messages),
      name: getRandomArrElem(names),
    });
  }
  return commentsArray;
};

const generatePhotoData = function(index, step) {
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: photoDescriptions[index],
    likes: getRandomInteger(15, 200),
    comments: generateComments(step)
  };
};

const generateMockData = () => Array.from({ length: DATA_ARRAY_LENGTH }, (_, i) => generatePhotoData(i, i * STEP));

generateMockData();
