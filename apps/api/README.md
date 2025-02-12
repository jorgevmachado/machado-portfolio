# With-NestJs | API

## Getting Started

First, run the development server:

```bash
pnpm run dev
```

By default, your server will run at [http://localhost:3001](http://localhost:3001). You can use your favorite API platform like [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/) to test your APIs

### ⚠️ Note about build

If you plan to only build this app. Please make sure you've built the packages first.

## Learn More

To learn more about NestJs, take a look at the following resources:

- [Official Documentation](https://docs.nestjs.com) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [Official NestJS Courses](https://courses.nestjs.com) - Learn everything you need to master NestJS and tackle modern backend applications at any scale.
- [GitHub Repo](https://github.com/nestjs/nest)


npm run test -- --findRelatedTests src/auth/users/users.service.spec.ts
npm run test -- --findRelatedTests src/auth/auth.service.spec.ts
npm run test -- --findRelatedTests src/auth/auth.controller.spec.ts

npm run test -- --findRelatedTests src/pokemons/pokemon.service.spec.ts
npm run test -- --findRelatedTests src/pokemons/move/move.service.spec.ts
npm run test -- --findRelatedTests src/pokemons/type/type.service.spec.ts
npm run test -- --findRelatedTests src/pokemons/ability/ability.service.spec.ts

npm run test -- --findRelatedTests src/finance/supplier/supplier-type/supplier-type.service.spec.ts
npm run test -- --findRelatedTests src/finance/supplier/supplier-type/supplier-type.controller.spec.ts

npm run test -- --findRelatedTests src/finance/supplier/supplier.service.spec.ts
npm run test -- --findRelatedTests src/finance/supplier/supplier.controller.spec.ts


npm run test -- --findRelatedTests src/finance/expense/expense-category/expense-category-type/expense-category-type.service.spec.ts
npm run test -- --findRelatedTests src/finance/expense/expense-category/expense-category-type/expense-category-type.controller.spec.ts

npm run test -- --findRelatedTests src/finance/expense/expense-category/expense-category.service.spec.ts
npm run test -- --findRelatedTests src/finance/expense/expense-category/expense-category.controller.spec.ts

