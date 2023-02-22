```sh
src/
├── product/
│ ├── application/
│ │ ├── commands/
│ │ │ ├── create-product.command.ts
│ │ │ ├── update-product.command.ts
│ │ │ ├── remove-product.command.ts
│ │ ├── command-handlers/
│ │ │ ├── create-product.handler.ts
│ │ │ ├── update-product.handler.ts
│ │ │ ├── remove-product.handler.ts
│ │ ├── events/
│ │ │ ├── product-created.event.ts
│ │ │ ├── product-updated.event.ts
│ │ │ ├── product-removed.event.ts
│ │ ├── event-handlers/
│ │ │ ├── product-created.handler.ts
│ │ │ ├── product-updated.handler.ts
│ │ │ ├── product-removed.handler.ts
│ │ ├── queries/
│ │ │ ├── get-product.query.ts
│ │ │ ├── get-products.query.ts
│ │ ├── ProductApplicationModule.ts
│ ├── domain/
│ │ ├── models/
│ │ │ ├── product.ts
│ │ ├── repositories/
│ │ │ ├── product.repository.ts
│ │ ├── services/
│ │ │ ├── product.service.ts
│ ├── infrastructure/
│ │ ├── dtos/
│ │ │ ├── product.dto.ts
│ │ ├── mongodb/
│ │ │ ├── product.schema.ts
│ ├── presentation/
│ │ ├── graphql/
│ │ │ ├── product.resolver.ts
│ ├── ProductModule.ts
```
