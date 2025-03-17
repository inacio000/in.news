<div  align="center">
    <img src="./public/images/favicon.png" alt="favicon" width="40px" height="40px"/>
    <h1 style="font-size: 46px"><strong>in.news</strong></h1>
</div>

<h1 align="center">Летняя Практика</h1>
<img src="./public/images/Home.png" alt="preview image"/>

# About
InNews — платформа, главная задача которой — донести до подписчиков самые свежие и интересные новости из мира IT.
Использование концепций Jamstack: современная архитектура веб-разработки, основанная на клиентском JavaScript, многоразовых API и предварительно созданной разметке.

# 🚀 Techs
- [🔗 React JS](https://reactjs.org/)
- [🔗 Next.js](https://nextjs.org/)
- [🔗 NextAuth.js](https://next-auth.js.org/)
- [🔗 TypeScript](https://www.typescriptlang.org/)
- [🔗 FaunaDB](https://fauna.com/)
- [🔗 Stripe](https://stripe.com/)
- [🔗 Prismic](https://prismic.io/)
- [🔗 SASS](https://sass-scss.ru/)
- [🔗 Figma](https://www.figma.com/)

# 🔧 Run Project
* Clone the repository
```bash
    https://github.com/inacio000/in.news.git
```
* Go to the project directory
```bash
    cd innews
```
> Создайте еще один файл `.env.local` и поместите переменные среды на основе файла [env.example](./env.exeple), что требует определенных знаний для их создания и настройки в каждом соответствующем приложении, Stripe, GitHub, FaunaDB и Prismic.

* Install dependencies
```bash
    npm install
```
> Для запуска системы надписей необходимо загрузить последнюю версию stripe-cli с https://stripe.com/docs/stripe-cli, а в папке, содержащей файл, открыть cmd и выполнить следующую команду для прослушивания событий, разработанных в /src/pages/api/webhooks
```bash
    stripe listen --forward-to localhost:3000/api/webhooks
```

* Testing a payment
>  Чтобы проверить действительную кредитную карту для обработки покупки, Stripe принимает следующий номер `4242 4242 4242 4242`, а остальные с другой информацией.

# Project Layout
Посмотреть дизайн проекта можно по [🔗этой ссылке](https://www.figma.com/file/Y0FbacUPeYHjd1yPgqzH7g/in.news-%E2%80%A2-Project-React%2FNext.js?type=design&node-id=1-2&mode=design&t=A0X2gCUwmmLvQSvT-0)

<br></br>

## От ***Раймунду Инасиу*** 🙂