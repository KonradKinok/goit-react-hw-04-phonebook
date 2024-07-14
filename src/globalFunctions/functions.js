'use strict';
/**
 *
 * @param {string} tagDivAndIdExampleTheory
 * @param {string} tagDivAndIdExamplePractice
 */
export function htmlTagViewExample(
  tagDivAndIdExampleTheory,
  tagDivAndIdExamplePractice,
  className = 'example-theory-pre'
) {
  const example_theory = document.querySelector(tagDivAndIdExampleTheory);
  const example_practice = document.querySelector(tagDivAndIdExamplePractice);

  const phrase = document.createElement('pre');
  phrase.classList.add(className);
  const examplePracticeInnerHtml = example_practice.innerHTML
    .split('  ')
    .join('');

  phrase.textContent = `HTML: ${examplePracticeInnerHtml}`;
  example_theory.prepend(phrase);
}

/**
 *LocalStorage save
 * @param {string} key
 * @param {object} value
 */
export const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

/**
 *localStorage load
 * @param {*} key
 * @returns
 */
export const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

/**getRandomElement
 *
 * @param {Array} array
 * @returns
 */
export function getRandomElement(array) {
  // Generuj losowy indeks od 0 do array.length - 1
  const randomIndex = Math.floor(Math.random() * array.length);
  // Zwróć wybrany element
  return array[randomIndex];
}

export function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

export function getRandomColorRgba() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = 0.2 + Math.random() * 0.3;
  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
}

export const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};