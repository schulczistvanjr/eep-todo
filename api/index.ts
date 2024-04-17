import express, { Request, Response } from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient, Db, ObjectId } from "mongodb";
import { Todo } from "./api.types";

/**
 * The Express application.
 */
const app = express();

let db: Db;
app.use(express.json());

// Start the in-memory MongoDB server
const mongoServer = new MongoMemoryServer();
mongoServer.start().then(() => {
  // Connect to the in-memory MongoDB server
  const mongoUri = mongoServer.getUri();

  /**
   * Connects to the in-memory MongoDB server.
   *
   * @param client - The MongoDB client.
   */
  MongoClient.connect(mongoUri).then((client) => {
    db = client.db();
    console.log("Connected to in-memory MongoDB");
  });
});

app.get("/", (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.get("/todos", (req: Request, res: Response) => {
  /**
   * Retrieves all todos.
   *
   * @returns A promise that resolves to an array of todos.
   */
  db.collection<Todo>("todos")
    .find()
    .toArray()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(500).send("Error retrieving todos: " + error);
    });
});

app.get("/todos/:id", (req: Request, res: Response) => {
  /**
   * Retrieves a todo by ID.
   *
   * @param id - The ID of the todo.
   * @returns A promise that resolves to the todo object.
   */
  const { id } = req.params;

  db.collection<Todo>("todos")
    .findOne({ _id: new ObjectId(id) })
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("Todo not found");
      }
    })
    .catch((error) => {
      res.status(500).send("Error retrieving todo: " + error);
    });
});

app.post("/todos", (req: Request, res: Response) => {
  /**
   * Adds a new todo.
   *
   * @param title - The title of the todo.
   * @param description - The description of the todo.
   * @returns A promise that resolves to the added todo object.
   */
  const { title, description } = req.body;

  const todo: Todo = {
    _id: new ObjectId(),
    title,
    description,
    completed: false,
  };

  db.collection<Todo>("todos")
    .insertOne(todo)
    .then(() => {
      res.status(200).send({ message: "Todo added successfully", todo });
    })
    .catch((error) => {
      res.status(500).send("Error adding todo: " + error);
    });
});

app.put("/todos/:id", (req: Request, res: Response) => {
  /**
   * Updates a todo by ID.
   *
   * @param id - The ID of the todo.
   * @param title - The updated title of the todo.
   * @param description - The updated description of the todo.
   * @param completed - The updated completion status of the todo.
   * @returns A promise that resolves to the updated todo ID.
   */
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const updateFields: Partial<Todo> = {};
  if (title) {
    updateFields.title = title;
  }
  if (description) {
    updateFields.description = description;
  }
  if (completed !== undefined) {
    updateFields.completed = completed;
  }

  db.collection<Todo>("todos")
    .updateOne(
      { _id: new ObjectId(id) },
      {
        $set: updateFields,
      }
    )
    .then(() => {
      res.status(200).send({ message: "Todo updated successfully", id });
    })
    .catch((error) => {
      res.status(500).send("Error updating todo: " + error);
    });
});

app.delete("/todos/:id", (req: Request, res: Response) => {
  /**
   * Deletes a todo by ID.
   *
   * @param id - The ID of the todo.
   * @returns A promise that resolves to the deleted todo ID.
   */
  const { id } = req.params;

  db.collection<Todo>("todos")
    .deleteOne({ _id: new ObjectId(id) })
    .then(() => {
      res.status(200).send({ message: "Todo deleted successfully", id });
    })
    .catch((error) => {
      res.status(500).send("Error deleting todo: " + error);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app };
