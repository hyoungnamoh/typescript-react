let str: string = 'hello';
let arr: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];
let arr3: [boolean, number, string] = [true, 1, 'hello'];
let arr4: [1, 2, 3] = [1, 2, 3];
let arr5: readonly [string] = ['hello'];
let arr6 = [1, 2, 3] as const;

const obj = {};
// obj = 'hello' 불가
// obj.a = 'hello' 가능
const obj2 = {} as const;
// obj2 = 'hello' 불가
// obj2.a = 'hello' 불가능
//프로퍼티까지 못바꾸게 할 수 있음

const obj3: { a: number, b: string } = { a: 1, b: '2' };
const obj4: { a: number, b?: string } = { a: 2 }; //? 있을 수도 있고 없을 수도 있고

enum Color { Red, Green, Blue }
Color['Red'] === 0;
Color[0] === 'Red';
Color['Green'] === 1;
Color[1] === 'Green';
Color['Blue'] === 2;
Color[2] === 'Blue';


const add = (a: number, b: number): number => {
  return a + b;
}

//하이오더펑션
const add2 = (a: number, b: number): (c: number) => number => {
  return (c: number) => {
    return 3;
  }
}

// 타입 캐스팅
let hello: number = 222;

// 타입 강제 형변환
// 형변환 하기 전 타입과 할 타입이 겹치는 경우 unknown 안써도 됨(ex 부모자식 관계)
(hello as unknown as string).substr(1, 2);
(<string><unknown>hello).substr(1, 2);

const div = document.createElement('div');
const div2 = div as HTMLDivElement;

// 함수 오버로딩
const a = (b?: string) => {
  console.log('hi');
}
a();
a('b');

// 위 처럼 매개변수가 비슷하거나 옵셔널이 아닌 완전 다른 애들이 들어오는 경우엔 interface를 사용해 오버로딩 할 수 있다.
interface aa {
  bb(a: string, b: string): void;
  bb(a: number[], b: number): void;
}

// interface
// 객체의 타입을 인터페이스를 둠
// 주로 객체에 많이 사용
// 같은 이름 여러개로 분리할 수 있음 컴파일 시 모두 합쳐짐
interface RSP {
  readonly ROCK: '0',
  readonly SCISSORS: '-142px',
  readonly PAPER: '-284px',
}

interface Example { //뭐가 들어올지 모를 때 이렇게 널널하게 줄 수 있음
  a: 3,
  b: 7,
  [key: string]: number,
}
const ex: Example = {
  a: 3,
  b: 7,
}
const ex2: Example = {
  a: 3,
  b: 7,
  dasdd: 12514124123,
}

// type alias
// interface 보다 좀 더 넓은 범위
// 커스텀 타입같은 느낌?
// | 많이 씀
// 객체는 웬만하면 interface로, 타입 여러개 만들면 복잡해짐
type Hello = string | number;
type Hello2 = string | {
  ROCK: string
  SCISSORS: string
  PAPER: string
}
const hi: Hello2 = {
  ROCK: '0',
  SCISSORS: '-142px',
  PAPER: 'ze',
}
const hi2: Hello2 = 'hello2';

// keyof interface명 === interface 키값들을 가져옴
// interface명[keyof interface명] === interface 값들을 가져올 수 있음

// 이벤트 함수에서 이벤트를 거는 대상 자체를 넘기려면 일반함수에선 this를 넣어주고 타입을 명시해줌. 이 this가 이벤트 대상이 됨 이렇게 해야 this의 타입추론이 명확하게 됨
document.querySelector('#btn')?.addEventListener('click', function (this: HTMLButtonElement) {
  // this === document.querySelector('#btn')
});

// 리턴값이 string | null 이런애들의 경우 null이 올 수도 있다고 에러잡히는 경우가 있는데 이럴 경우
if (document.querySelector('#btn')) { // 이런식으로 잡아줄 수 있음
  let btn = document.querySelector('#btn');
} // 이렇게 해도 안되는 경우가 있는데 이럴 땐
let btn = document.querySelector('#btn'); // 이런식으로 변수에 담아서 사용하면 잡힌다,, 이럴빠엔 느낌표 사용하는것도 고려해보자..
if (btn) {
  let btn2 = btn;
}

// 실행 시
// tsc 파일명.ts -w 이런식으로 파일을 명시하면 tsconfig가 적용되지 않음
// => npx tsc -w 이렇게 전체를 그냥 tsc하게 함

// 제네릭
// 들어오는 타입의 위치를 정해주고 싶을 때 사용, 짝 맞추기
type T = string | number;

interface obj<T> {
  add: (a: T, b: T) => T;
}

const g1: obj<number> = {
  add: (a, b) => a + b,
}
const g2: obj<string> = {
  add: (a, b) => a + b,
}

g1.add(1, 2);
g2.add('a', 'b');
g1.add(1, 'a');
g2.add('1', 2);

// 제네릭에 넣는 타입에 제약을 둘 때 extends를 쓸 수 있음
interface extObj<T extends string> { //string과 string을 extends한 타입만 들어오게
  add: (a: T, b: T) => T;
}

const extObj1: extObj<number> = {
  add: (a, b) => a + b,
}
const extObj2: extObj<string> = {
  add: (a, b) => a + b,
};

[1, 'a', 2, null, undefined].forEach(element => {

});

// 구조분해할당 했을 경우엔 타입을 객체 뒤에 써줘야 함 +추가로 인자에 각 벨류를 하나씩 넣는거보다 저렇게 객체 형태로 넣는게 이 값이 어떤값인지 힌트를 줄 수 있고 가독성이 한결 좋아짐
const createDeck = ({ mine, count }: { mine: boolean, count: number }) => {

}

// 타입가드
// 타입가드를 사용해 as를 사용하는 거 보다 더 자연스럽게 타입을 좁혀줄 수 있음
const isSub = (data: Card): data is Sub => {
  if (data.cost) {
    return true;
  }
  return false;
}

// if (isSub(data as Sub) && data.mine && !data.field) {
if (isSub(data) && data.mine && !data.field) {
  ...
}

// script와 module 차이
// module === 다른 파일에서도 사용할 수 있음
<script src = '' > </script> / / script

const hello2 = 'isModule'; //node에서 module 지정, 
module.exports = hello2;
const module = requeire('./isModule');

//commonjs 문법(node 표준)
// exports.a 할 때 exports와 module.exports는 완전히 똑같은 객체임
// 띠리서 한 js 페이지 안에서 하나만 사용하도록 함
// 마지막에 module.exports = {} 해버리면 그 전에 객체로 넣었던게 덮혀질 수도 있음
// 이걸 극복하고자 es2015에 default가 추가로 생김

// module.exports
module.exports = {
  a: 'a',
  b: 'b',
}

// 객체 exports (es2015 이전)
exports.a = 'b'; //exports 객체에 a, b 추가하고 다른 곳에서 불러쓰기
exports.b = false;
const { a, b } = requeire('./module');

// 객체 exports (es2015 이후)
const a = 'b';
const b = false;
export { a, b };
import { a, b } from './module';
export default const fn = () => { // 최신문법으로 앞에 export 안 덮고 export 가능해짐, export !== export default

};
import fn from './module';

// typescript에서 commonjs 방식의 module은
// import hi from './module' 이 아닌
// import * as hi from './module' 이렇게 가져와서 사용하는 게 맞음
// exModuleInterop 을 true로 설정 해 * as 쓰지않고 사용할 수 있지만 그닥 좋은 선택은 아님.


//es6 module import, export

// dts 유형
// 1. typescript로 만들어진 패키지
// 2. js로 만들었지만 index.d.ts 파일을 제공하는 패키지
// 3. definitlyTyped에서 d.ts파일을 제공하는 패키지 npm install @types/패키지명
// 4. definitlyTyped에 없는 패키지
// 5. type을 틀리게 지정해놓은 패키지

// 4번의 경우 직접 만들어 줄 수 있음. 내가 필요한 부분만 type을 만들어쓰면 됨
// type만들어주기
// 1. types 폴더에 d.ts 파일 생성
// 2. declare module '패키지명' { const canUseDom: Boolean; export default canUseDom}
// 3. ts.config.json 파일 typeRoots 옵션에 types 폴더 경로 추가
// 4. includes 없애던가 추가해줌

// 전역객체에 값을 할당하고싶은 경우
// 1. types폴더에 전역객체에 타입 정해줄 d.ts 파일 생성
// 2. declare global { interface: Window { hello3: string; } } 쓰고싶은 거 타입 정해줌
// 3. global 객체를 확장하려면 external 모듈이거나 ambiant 모듈이어야 함
// 4. 이걸 가장 쉽게 처리하는 방법은 파일 최상단에 export { } 를 넣어 줘 얘가 external모듈인척 하게 함
//   (external module === import, export / internal module === namaspace / embiant module 남의 패키지를 내가 d.ts 로 타입 정해주는 거(declare module 'ddd' {}))

// intersection &
// |(파이프)같은 연산자? 둘 다 충족해야 함
// interface-interface, interface-typealias, typealias-typealias 사용 가능
interface A {
  hello: true,
}

interface B {
  bye: true,
}

const a: A = {
  hello: true,
}

const b: B = {
  bye: true,
}
//intersection
const c: A & B {
  hello: true,
  bye: true,
}

// Utility
// Partial
interface AA {
  a: '1',
  b: 2,
  c: true,
}
// Partial을 사용하면 모든 조건을 충족하지 않고 일부만 사용하거나 바꿀 수 있음
const aa: Partial<AA> = {
  a: '1',
  b: 2
}
// Readonly 전체 값을 readonly
const bb: Readonly<AA> = {
  a: '1',
  b: 2,
  c: true,
}

// optional chaning
// 확신을 못가질 때 사용 !. 연산자와 상반
const oc1 = document.querySelector('#wrapper')?.innerHTML; // document.querySelector('#wrapper')가 있으면 innerHTML을 할당
const oc2 = { b: () => { } };
document.querySelector('#wrapper')?.innerHTML = ''; // X -> ?. 연산자는 식의 왼쪽항에 넣을 수 없음
oc2.b?.() // 함수사용 시 주의사항 ?.가 하나의 연산자이므로 뒤에 . 꼭 붙이기

// 2차원 배열
1. let a:string[][] = [['1']];
2. type abc = string[];
  let b:abc[] = [['d'],['d']];
3. type dfg = Array<string>;
  let c:abc[] = [['d'],['d']]; 

//객체 배열
interface it = {
  a: number,
  b: string,
}
let data:it[];

