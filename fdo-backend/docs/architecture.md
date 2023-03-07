# DesignDoc

## Introduction

This design document outlines the architecture and implementation details for a new application. The purpose of this document is to provide a clear understanding of the proposed system design and how it will meet the project requirements. The application is being designed following the principles of Command Query Responsibility Segregation (CQRS) and Domain-Driven Design (DDD), to ensure a scalable and maintainable system.

The document provides an overview of the system's architecture, including the main components and their interactions. It also outlines the technology stack that will be used, along with the development process and testing strategy. In addition, the document details the various design decisions that have been made, including the reasoning behind them.

This design document is intended for the development team, project stakeholders, and anyone else who is interested in the technical details of the application. It is assumed that the reader has a basic understanding of software development concepts and terminology.

## Architecture

Our application follows the principles of CQRS (Command Query Responsibility Segregation) and DDD (Domain-Driven Design) to provide a scalable and maintainable solution.

### CQRS

CQRS allows us to separate the write and read operations, by using commands and events for updates and queries for reads. This approach enables us to optimize each operation independently, by using different models and technologies, such as MongoDB for writes and Elasticsearch for reads.

We are using NestJS as our framework, which provides built-in support for CQRS through the nestjs/cqrs package. This package allows us to define commands, events, and queries as classes, which can be handled by dedicated handlers. These handlers are responsible for executing the logic and updating the state of our application.

### DDD

DDD helps us to align our application with the business domain, by using a rich and expressive model that represents the concepts, rules, and behaviors of our system. This approach enables us to evolve our application over time, by adding new features or changing the existing ones, while preserving the integrity of the model and the business logic.

We are using GraphQL as our API layer, which provides a declarative and flexible way to define our schema and types. This approach enables us to expose the relevant parts of our model to the clients, by using queries and mutations that map to our commands and queries.

### NestJS

NestJS is a modern and opinionated framework that provides a consistent and intuitive way to develop server-side applications with Node.js. It leverages the power of TypeScript, decorators, and modules to provide a modular and testable architecture.

We are using NestJS to define our modules, controllers, services, and providers, which encapsulate the responsibilities of our application. We are also using NestJS to integrate with other technologies, such as MongoDB, GraphQL, and CQRS, by using dedicated packages and plugins.

### MongoDB

MongoDB is a NoSQL document-oriented database that provides a flexible and scalable solution for storing and querying data. It allows us to define schemas on the application side, which can evolve over time, and provides powerful query capabilities, such as indexing and aggregation.

We are using MongoDB to store our domain objects, such as customers, products, orders, invoices, and refunds. We are also using MongoDB to persist our events, which represent the changes that occurred in our system, and can be used for auditing, reporting, and replaying.

### GraphQL

GraphQL is a query language for APIs that provides a declarative and efficient way to request and retrieve data. It allows us to define a schema that describes the types, queries, and mutations of our application, and provides a runtime that resolves these queries and mutations.

We are using GraphQL to expose our domain objects and operations to the clients, by using a schema that maps to our commands and queries. We are also using GraphQL to optimize the performance of our queries, by using batching, caching, and pagination.

## Models

### User

User: This is the root model, representing the user who owns all other models.

### SettingCatalog

This model contains the settings related to a user and a feature(customer or product or order...)

### Setting

This model is used to generate the feature code
readonly key: SettingKeyEnum;
readonly properties: Map<PropertyKeyEnum, string | number>;

### ProductCatalog

ProductCatalog: This model represents the catalog of products available to the user, containing basic information such as id, code, name, and description.

### CustomerCatalog

CustomerCatalog: This model represents the catalog of customers available to the user, containing basic information such as id, code, name, email, and phone. It also contains a list of addresses and references to the default billing and shipping addresses.

### Order

Order: This model represents an order placed by the user, containing details such as the order code (which includes the prefix, counter, suffix, and year), customer information, product information, and any other relevant details.

### Invoice

Invoice: This model represents an invoice generated for an order, containing details such as the invoice code (which is based on the order code), customer information, product information, and any other relevant details.

### PurchaseOrder

PurchaseOrder: This model represents a purchase order created by the user, containing details such as the purchase order code (which includes the prefix, counter, suffix, and year), supplier information, product information, and any other relevant details.

### Refund

Refund: This model represents a refund issued for an order, containing details such as the refund code (which is based on the order code), customer information, product information, and any other relevant details.



// notification.service.ts

import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async createNotification(message: string): Promise<Notification> {
    const id = uuidv4();
    const notification = { id, message };
    await this.cacheManager.set(id, notification);
    return notification;
  }

  async getNotificationById(id: string): Promise<Notification> {
    return this.cacheManager.get(id);
  }
}
