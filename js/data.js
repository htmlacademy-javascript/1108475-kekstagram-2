import { getRandomInteger, getRandomArrElem } from './util';

const DATA_ARRAY_LENGTH = 25;
const STEP = 100;

const NAMES = ['Артём', 'Андрей', 'Александр', 'Егор', 'Владимир', 'Кекс', 'Дарья', 'Полина', 'Татьяна', 'Наталья', 'Ирина', 'Ксения'];

const PHOTO_DESCRIPTIONS = Array.from({ length: DATA_ARRAY_LENGTH }, (_, i) => `Описание фото №${i + 1}`);

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const generateComments = function (commentsIdsStep, commentsLength) {
  const commentsArray = [];
  for (let n = 0; n <= commentsLength - 1; n++) {
    commentsArray.push({
      id: n + commentsIdsStep,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrElem(MESSAGES),
      name: getRandomArrElem(NAMES),
    });
  }
  return commentsArray;
};

const generatePhotoData = function (index, step) {
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: PHOTO_DESCRIPTIONS[index],
    likes: getRandomInteger(15, 200),
    comments: generateComments(step, getRandomInteger(0, 30))
  };
};

const generateMockData = () => Array.from({ length: DATA_ARRAY_LENGTH }, (_, i) => generatePhotoData(i, i * STEP));

const photos = generateMockData();

export {photos};
