---
title: "MongoDB Best Practices for Modern Web Applications"
date: "2025-08-05"
tags: ["MongoDB", "Database", "NoSQL", "Performance"]
excerpt: "Learn essential MongoDB best practices for designing efficient schemas, optimizing queries, and ensuring data consistency in your applications."
image: '/images/blog/mongodb-best-practices.png'
featured: false
---

# MongoDB Best Practices for Modern Web Applications

MongoDB is a powerful NoSQL database that offers flexibility and scalability for modern applications. However, to get the most out of MongoDB, you need to follow best practices for schema design, indexing, and query optimization.

## Schema Design Principles

### 1. Embed vs Reference

**Embed when:**
- Data is accessed together
- Data has a 1:1 or 1:few relationship
- Data doesn't grow unbounded

```javascript
// Good: Embedding user profile
{
  _id: ObjectId("..."),
  name: "John Doe",
  email: "john@example.com",
  profile: {
    bio: "Software developer",
    location: "San Francisco",
    website: "https://johndoe.com"
  }
}
```

**Reference when:**
- Data is large and not always needed
- Data has a 1:many or many:many relationship
- Data grows unbounded

```javascript
// Good: Referencing posts
{
  _id: ObjectId("..."),
  title: "My Blog Post",
  content: "...",
  author: ObjectId("user_id"), // Reference to user
  tags: [ObjectId("tag1"), ObjectId("tag2")] // References to tags
}
```

### 2. Design for Your Queries

Structure your data based on how you'll query it:

```javascript
// If you frequently query posts by author and date
{
  _id: ObjectId("..."),
  author_id: ObjectId("..."),
  published_date: ISODate("2024-01-15"),
  title: "Post Title",
  content: "...",
  // Denormalize frequently accessed data
  author_name: "John Doe",
  author_avatar: "avatar.jpg"
}
```

## Indexing Strategies

### 1. Create Indexes for Common Queries

```javascript
// Single field index
db.users.createIndex({ email: 1 });

// Compound index
db.posts.createIndex({ author_id: 1, published_date: -1 });

// Text index for search
db.posts.createIndex({ 
  title: "text", 
  content: "text" 
});

// Partial index (only index documents that match condition)
db.users.createIndex(
  { email: 1 },
  { partialFilterExpression: { email: { $exists: true } } }
);
```

### 2. Index Design Guidelines

- Put the most selective fields first in compound indexes
- Use covered queries when possible
- Monitor index usage with `db.collection.getIndexes()`
- Remove unused indexes to improve write performance

## Query Optimization

### 1. Use Projection to Limit Fields

```javascript
// Only return needed fields
db.users.find(
  { age: { $gte: 18 } },
  { name: 1, email: 1, _id: 0 }
);
```

### 2. Efficient Pagination

Use cursor-based pagination for large datasets:

```javascript
// Instead of skip/limit for large offsets
const lastId = ObjectId("...");
db.posts.find({ _id: { $gt: lastId } })
        .sort({ _id: 1 })
        .limit(20);
```

### 3. Aggregation Pipeline Optimization

```javascript
// Order stages for efficiency
db.orders.aggregate([
  // 1. Match first to reduce documents
  { $match: { status: "completed" } },
  
  // 2. Project early to reduce data size
  { $project: { customer_id: 1, total: 1, date: 1 } },
  
  // 3. Group after filtering and projecting
  { $group: {
    _id: "$customer_id",
    total_spent: { $sum: "$total" },
    order_count: { $sum: 1 }
  }},
  
  // 4. Sort at the end
  { $sort: { total_spent: -1 } }
]);
```

## Data Modeling Patterns

### 1. Polymorphic Pattern

Store different types of data in the same collection:

```javascript
// Products collection with different product types
{
  _id: ObjectId("..."),
  name: "Laptop",
  type: "electronics",
  price: 999,
  specs: {
    cpu: "Intel i7",
    ram: "16GB",
    storage: "512GB SSD"
  }
}

{
  _id: ObjectId("..."),
  name: "T-Shirt",
  type: "clothing",
  price: 29,
  specs: {
    size: "L",
    color: "Blue",
    material: "Cotton"
  }
}
```

### 2. Subset Pattern

Store frequently accessed data separately:

```javascript
// Main product document
{
  _id: ObjectId("..."),
  name: "Product Name",
  description: "Long description...",
  full_specs: { /* detailed specs */ }
}

// Subset for listings (frequently accessed)
{
  _id: ObjectId("..."),
  product_id: ObjectId("..."),
  name: "Product Name",
  price: 99,
  thumbnail: "thumb.jpg",
  rating: 4.5
}
```

## Performance Monitoring

### 1. Use MongoDB Profiler

```javascript
// Enable profiling for slow operations
db.setProfilingLevel(2, { slowms: 100 });

// View profile data
db.system.profile.find().sort({ ts: -1 }).limit(5);
```

### 2. Monitor with explain()

```javascript
// Analyze query performance
db.users.find({ age: { $gte: 25 } }).explain("executionStats");
```

## Security Best Practices

### 1. Authentication and Authorization

```javascript
// Create user with specific roles
use admin
db.createUser({
  user: "appUser",
  pwd: "securePassword",
  roles: [
    { role: "readWrite", db: "myapp" }
  ]
});
```

### 2. Input Validation and Sanitization

```javascript
// Use Mongoose for schema validation
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Invalid email format'
    }
  },
  age: {
    type: Number,
    min: 0,
    max: 120
  }
});
```

## Backup and Recovery

### 1. Regular Backups

```bash
# Create backup
mongodump --db myapp --out /backup/$(date +%Y-%m-%d)

# Restore backup
mongorestore --db myapp /backup/2024-01-15/myapp
```

### 2. Replica Sets for High Availability

```javascript
// Initialize replica set
rs.initiate({
  _id: "myReplicaSet",
  members: [
    { _id: 0, host: "mongodb1.example.com:27017" },
    { _id: 1, host: "mongodb2.example.com:27017" },
    { _id: 2, host: "mongodb3.example.com:27017" }
  ]
});
```

## Conclusion

Following these MongoDB best practices will help you build scalable, performant applications:

1. Design schemas based on your access patterns
2. Create appropriate indexes for your queries
3. Use aggregation pipelines efficiently
4. Monitor performance regularly
5. Implement proper security measures
6. Plan for backup and recovery

Remember that MongoDB is flexible, but with great power comes great responsibility. Always test your designs with realistic data volumes and query patterns.