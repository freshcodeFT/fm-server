/*const  p1 = Promise.resolve(1)
console.log(p1)
const p2 = fetch('https://api.twitter.com');
console.log(p2)*/

console.log('Begin')

async function initialApp () {
  console.log('work hard')

  const users = await loadUsers()
  console.log(users)
}

class Test {
  static async load () {}
}

console.log('end')

async function loadUsers () {
  console.log('Before load')
  try {
    const response = await fetch('https://randomuser.me/api/')
    const data = await response.json()
    console.log('After load')
    return data
  } catch (e) {
    console.error(e)
  }
}

async function getPrimitivesAsync () {
  return [1, '1', true, null, undefined, BigInt(5), Symbol()]
}

async function logPrimitives () {
  const primitives = await getPrimitivesAsync()
  console.log(primitives)
  return primitives
}

async function delay () {
  const p1 = new Promise(resolve => {
    setTimeout(() => resolve('test'), 2000)
  })

  const data = await p1
  console.log(data)
  return data
}

/* 
  1. Написать асинхронную функцию которая
      вернёт массив всех js примитивов.
      Получить значение промиса из функции выше
      НЕ используя метод then
----------------------------------------------------------------
  2. Создать промис, который разрезолвится через 2с
      С помощью async/await подождать его исполнения 
      и получить его результат (не использовать then!)
*/
