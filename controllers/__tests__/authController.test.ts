import request from "supertest";
import { app } from "../../app";
import { User } from "../../models/user";
import mongoose from "mongoose";

describe("Signup", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("Should create a new user", async () => {
    const res = await request(app).post("/signup").send({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      password: "password",
      rights: "admin",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe(
      "Confirm from your email to signup successfully"
    );
    expect(res.body.userId).toBeDefined();
  });

  it("Should return error if validation fails", async () => {
    const res = await request(app).post("/signup").send({
      firstName: "John",
      lastName: "Doe",
      email: "invalidemail",
      password: "password",
      rights: "admin",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body.message).toBe("Invalid email");
  });

  it("Should return error if failed to encrypt password", async () => {
    const res = await request(app).post("/signup").send({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      password: "password",
      rights: "admin",
    });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Failed to encrypt password");
  });

  it("Should return error if failed to create user", async () => {
    const res = await request(app).post("/signup").send({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      password: "password",
      rights: "admin",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Failed to create user");
  });

  it("Should return error if failed to save user", async () => {
    const res = await request(app).post("/signup").send({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      password: "password",
      rights: "admin",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Failed to save user");
  });
});
