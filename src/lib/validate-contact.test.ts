import { describe, expect, it } from "vitest";
import { validateContact, type ContactInput } from "./validate-contact";

const valid: ContactInput = {
  firstName: "Ali",
  lastName: "Hassan",
  company: "Acme",
  email: "ali@acme.com",
  phone: "+964 771 055 3120",
  message: "Hello",
};

describe("validateContact", () => {
  it("accepts a valid submission", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("flags empty required fields", () => {
    const errors = validateContact({
      ...valid,
      firstName: "  ",
      email: "",
      message: "",
    });
    expect(errors).toEqual({
      firstName: "required",
      email: "required",
      message: "required",
    });
  });

  it("flags an invalid email", () => {
    expect(validateContact({ ...valid, email: "a@b" }).email).toBe(
      "invalidEmail",
    );
  });

  it("flags an invalid phone but allows it to be empty", () => {
    expect(validateContact({ ...valid, phone: "abc" }).phone).toBe(
      "invalidPhone",
    );
    expect(validateContact({ ...valid, phone: "" })).toEqual({});
  });

  it("accepts local Iraqi phone formats", () => {
    expect(validateContact({ ...valid, phone: "07710553120" })).toEqual({});
  });
});
